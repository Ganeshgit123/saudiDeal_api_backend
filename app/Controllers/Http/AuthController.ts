import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { AuthRepo, UserRepo } from "../../Repositories";
import JWT from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
const JWT_SECRET_KEY = Env.get('JWT_SECRET_KEY')
import { SUCCESS } from "../../Data/language";

export default class AuthController {

    public async sendOtp({ request }: HttpContextContract) {
        const { mobileNumber, countryCode } = await request.validate(Validators.SendOtpValidator);

        const language = request.header('language') || 'en'

        // var otp = Math.floor(1000 + Math.random() * 9000);
        const otp = 1234

        // const data = {
        //     mobileNumber: mobileNumber,
        //     countryCode: countryCode,
        //     // otp: mobileNumber == 1234567890 ? 1234 : otp
        //     otp: mobileNumber == 1234
        // }

        const maybeUser = await AuthRepo.isEntryExist(mobileNumber);

        if (!maybeUser) {
            return {
                success: false,
                isNewUser: 0,
                massage: SUCCESS.NEW_USER[language]
            };
            // await AuthRepo.create(data, language);
        } else {
            const userId = maybeUser.id
            if (maybeUser.active == false) {
                return {
                    success: false,
                    massage: SUCCESS.USER_DEACTIVED[language]
                };
            }

            const userDetails = {
                // otp: mobileNumber == 1234567890 ? 1234 : otp,
                otp: 1234,
                countryCode: countryCode
            }

            await UserRepo.update(userId, userDetails, language)
        }
        return {
            success: true,
            otp: otp,
            massage: SUCCESS.SENT_OTP[language]
        };
    }

    public async verifyOtp({ request }: HttpContextContract) {
        const { mobileNumber, otp } = await request.validate(Validators.VerifyOtpValidator);

        const language = request.header('language') || 'en'
        let userData = await AuthRepo.checkOtp(mobileNumber, otp, language)

        let token
        if (userData) {

            let data = {
                id: userData.id,
                firstName: userData.firstName,
                lastName: userData.lastName
            }
            token = JWT.sign(data, JWT_SECRET_KEY);
        }

        let result = {}
        
        if (userData) {
            result = {
                id: userData.id,
                email: userData.email,
                mobileNumber: userData.mobileNumber,
                firstName: userData.firstName,
                lastName: userData.lastName,
                token: token,
                isNewUser: userData.isNewUser,
                userName: userData.userName,
                userType: userData.userType
                // image: userData.image,
            }
            // const userId = userData.id
            // const userDetails = {
            //     otp: 0
            // }
            // await UserRepo.update(userId, userDetails, language)
        }

        return {
            success: true,
            token: token,
            massage: SUCCESS.VERIFY_OTP[language],
            data: result
        };
    }

    public async create({ request }: HttpContextContract) {
        const { mobileNumber, countryCode, userName, email, userType } = await request.validate(Validators.SendOtpValidator);

        const language = request.header('language') || 'en'

        // var otp = Math.floor(1000 + Math.random() * 9000);
        const otp = 1234

        const data = {
            mobileNumber: mobileNumber,
            countryCode: countryCode,
            userName: userName,
            email: email,
            isNewUser: 0,
            userType: userType,
            // otp: mobileNumber == 1234567890 ? 1234 : otp
            otp: 1234
        }

        const maybeUser = await AuthRepo.isEntryExist(mobileNumber);

        if (!maybeUser) {
            await AuthRepo.create(data, language);
        } else {
            // const userId = maybeUser.id
            if (maybeUser.active == false) {
                return {
                    success: false,
                    massage: SUCCESS.USER_DEACTIVED[language]
                };
            }
            return {
                success: false,
                massage: SUCCESS.NEW_ALREADY[language]
            };
            // const userDetails = {
            //     // otp: mobileNumber == 1234567890 ? 1234 : otp,
            //     otp: 1234,
            //     countryCode: countryCode
            // }

            // await UserRepo.update(userId, userDetails, language)
        }
        return {
            success: true,
            isNewUser: 1,
            otp: otp,
            massage: SUCCESS.SENT_OTP[language]
        };
    }

    public async logout({ request, response }: HttpContextContract) {
        let token = request.headers().authorization || ''

        const language = request.header('language') || 'en'

        if (token && token.startsWith("Bearer ")) token = token.slice(7, token.length);

        if (token) {
            const decoded = await JWT.verify(token, JWT_SECRET_KEY, async (err, decodedData) => {
                if (err) return false
                return decodedData
            })

            if (!decoded) return response.status(422).send({
                msg: `JWT Expired`
            })

            const userId = decoded.id

            const userDetails = {
                deviceToken: ''
            }

            await AuthRepo.updateAdmin(userId, userDetails, language)
        }

        return {
            success: true,
            massage: SUCCESS.LOGOUT[language],
        };
    }
}