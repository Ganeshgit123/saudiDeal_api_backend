import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { AuthRepo, UserRepo } from "../../Repositories";
import JWT from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
const JWT_SECRET_KEY = Env.get('JWT_SECRET_KEY')
import { SUCCESS, FAILURE } from "../../Data/language";
import axios, { AxiosRequestConfig } from 'axios'

export default class AuthController {

    public async sendOtp({ request }: HttpContextContract) {
        const { mobileNumber, countryCode } = await request.validate(Validators.SendOtpValidator);

        const language = request.header('language') || 'en'

        var otp = Math.floor(1000 + Math.random() * 9000);

        // const otp = 1234

        // const data = {
        //     mobileNumber: mobileNumber,
        //     countryCode: countryCode,
        //     otp: mobileNumber == 1234567890 ? 1234 : otp
        //     // otp: mobileNumber == 1234
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
                otp: mobileNumber == 1234567890 ? 1234 : otp,
                // otp: 1234,
                countryCode: countryCode
            }

            await UserRepo.update(userId, userDetails, language)
        }

        let messageText
        if (language == 'en') {
            messageText = `SaudiDeal: Your code is ${otp}`
        } else {
            messageText = `SaudiDeal: Your code is ${otp}`
        }

        const config: AxiosRequestConfig = {
            method: 'post',
            url: `https://api.taqnyat.sa/v1/messages`,
            headers: {
                'Authorization': 'Bearer 33f57fccf15c0501e5bea82fe074c21c'
            },
            data: {
                "recipients": [
                    mobileNumber
                ],
                "body": messageText,
                "sender": "SaudiDeal"
            }
        }

        let otpResult = await axios(config).then(async function (response) {
            console.log(response)
            if (response.status == 201) {
                return true
            } else {
                return false
            }
        })
            .catch(console.log)

        if (otpResult) {
            return {
                success: true,
                otp: otp,
                massage: SUCCESS.SENT_OTP[language]
            };
        } else {
            return {
                success: true,
                massage: SUCCESS.OTP_NOT_SEND[language]
            };
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
        // if (userData) {

        //     let data = {
        //         id: userData.id,
        //         firstName: userData.firstName,
        //         lastName: userData.lastName
        //     }
        //     token = JWT.sign(data, JWT_SECRET_KEY);
        // }

        let result = {}

        if (userData) {

            let data = {
                id: userData.id,
                firstName: userData.firstName,
                lastName: userData.lastName
            }

            token = await JWT.sign(data, JWT_SECRET_KEY);

            result = {
                id: userData.id,
                email: userData.email,
                mobileNumber: userData.mobileNumber,
                firstName: userData.firstName,
                lastName: userData.lastName,
                token: token,
                isNewUser: userData.isNewUser,
                userName: userData.userName,
                userType: userData.userType,
                isOtpVerify: 1
                // image: userData.image,
            }
            // const userId = userData.id
            // const userDetails = {
            //     otp: 0
            // }
            // await UserRepo.update(userId, userDetails, language)
            const userDetails = {
                isOtpVerify: 1,
                otp: 0
            }
            
            await UserRepo.update(userData.id, userDetails, language)
            return {
                success: false,
                token: token,
                massage: SUCCESS.VERIFY_OTP[language],
                data: result
            };
        } else {
            return {
                success: true,
                massage: FAILURE.OTP_NOT_MATCH[language],
            };
        }
    }

    public async create({ request }: HttpContextContract) {
        const { mobileNumber, countryCode, userName, email, userType } = await request.validate(Validators.SendOtpValidator);

        const language = request.header('language') || 'en'

        var otp = Math.floor(1000 + Math.random() * 9000);

        const data = {
            mobileNumber: mobileNumber,
            countryCode: countryCode,
            userName: userName,
            email: email,
            isNewUser: 0,
            userType: userType,
            otp: mobileNumber == 1234567890 ? 1234 : otp
        }

        const maybeUser = await AuthRepo.isUserExist(mobileNumber, email);

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

            if (maybeUser.email == email) {
                return {
                    success: false,
                    isOtpVerify: maybeUser.isOtpVerify,
                    massage: SUCCESS.EMAIL_ALREADY[language]
                };
            } else {
                return {
                    success: false,
                    isOtpVerify: maybeUser.isOtpVerify,
                    massage: SUCCESS.MOBILE_ALREADY[language]
                };
            }
        }

        let messageText
        if (language == 'en') {
            messageText = `SaudiDeal: Your code is ${otp} FA+9qCX9VSu`
        } else {
            messageText = `SaudiDeal: Your code is ${otp} FA+9qCX9VSu`
        }

        const config: AxiosRequestConfig = {
            method: 'post',
            url: `https://api.taqnyat.sa/v1/messages`,
            headers: {
                'Authorization': 'Bearer 33f57fccf15c0501e5bea82fe074c21c'
            },
            data: {
                "recipients": [
                    mobileNumber
                ],
                "body": messageText,
                "sender": "SaudiDeal"
            }
        }

        let otpResult = await axios(config)
            .then(async function (response) {
                if (response.status == 201) {
                    return true
                } else {
                    return false
                }
            })
            .catch(console.log)

        if (otpResult) {
            return {
                success: true,
                otp: otp,
                massage: SUCCESS.SENT_OTP[language]
            };
        } else {
            return {
                success: true,
                massage: SUCCESS.OTP_NOT_SEND[language]
            };
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