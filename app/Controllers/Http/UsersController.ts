import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserDomain } from "../../Domain";
import { UserRepo } from "../../Repositories";
import Validators from "../../Validators";
import { SUCCESS } from "../../Data/language";

export default class UsersController {

    // User API
    public async get({ request }: HttpContextContract) {

        const language = request.header('language') || 'en'
        const userId: any = request.header('userId') || 0

        let result = UserDomain.createFromArrOfObject(
            await UserRepo.get(userId, language)
        )
        await result.map((data) => {
            data.firstName = data.firstName
            data.lastName = data.lastName,
                data.address = data.address,
                data.description = data.description
        })
        return {
            success: true,
            data: result,
        };
    }

    public async getUserById({ request }: HttpContextContract) {

        // const language = request.header('language') || 'en'
        const userId: any = request.header('userId') || 0
        return {
            success: true,
            userDetails: UserDomain.createFromArrOfObject(
                await UserRepo.getUserById([userId])
            ),
        };
    }

    public async create({ request }: HttpContextContract) {
        const userId: any = request.header('userId') || 0
        let payload = await request.validate(Validators.UserValidator);

        const language = request.header('language') || 'en'
        await UserRepo.isEntryExist(userId, language);

        payload.isNewUser = false
        const updateResult = UserDomain.createFromObject(
            await UserRepo.update(userId, payload, language)
        );

        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.USER_CREATE[language]
        };
    }

    public async update({ request }: HttpContextContract) {
        // const updateProposal = await request.validate(Validators.UpdatePost);
        const userDetails = request.all()
        const userId: any = request.header('userId') || ''
        const language = request.header('language') || 'en'

        if (!userId) {
            return {
                success: false,
                massage: SUCCESS.USER_Id_NOTEXIST[language]
            };
        }

        if (userDetails.email) {
            let result = await UserRepo.getEmail(userDetails.email, userId);
            if (result != null && result.email == userDetails.email) {
                return {
                    success: false,
                    massage: SUCCESS.EMAIL_ALREADY_EXITS[language]
                };
            }
        }

        await UserRepo.isEntryExist(userId, language);

        const updateResult = UserDomain.createFromObject(
            await UserRepo.update(userId, userDetails, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.USER_UPDATE[language]
        };
    }

    // Admin API

    public async getAllUser({ request }: HttpContextContract) {

        const payload = request.all()
        const offset = payload.offset ? Number(payload.offset) : '';
        const limit = payload.offset ? Number(payload.limit) : '';

        const startDate = payload.startDate ? payload.startDate : '';
        const endDate = payload.endDate ? payload.endDate : '';

        let orderBy = payload.orderBy || 'id'
        const active = payload.active || ''

        orderBy = `users.${orderBy}`;

        const orderByValue = payload.orderByValue ? payload.orderByValue.toLowerCase() : "asc";

        return {
            success: true,
            data: UserDomain.createFromArrOfObject(
                await UserRepo.getAll(offset, limit, startDate, endDate, orderBy, orderByValue, active)
            ),
        };
    }

    public async userDetails({ params, request }: HttpContextContract) {

        const language = request.header('language') || 'en'
        return {
            success: true,
            userDetails: UserDomain.createFromArrOfObject(
                await UserRepo.get(params.id, language)
            ),
        };
    }

    public async adminUpdate({ request, params }: HttpContextContract) {
        // const updateProposal = await request.validate(Validators.UpdatePost);
        const userDetails = request.all()
        // const userId: any = request.header('userId') || ''
        const userId = params.id
        const language = request.header('language') || 'en'
        console.log(userId, 'userId');

        if (!userId) {
            console.log('in');

            return {
                success: false,
                massage: SUCCESS.USER_Id_NOTEXIST[language]
            };
        }

        await UserRepo.isEntryExist(userId, language);

        const updateResult = UserDomain.createFromObject(
            await UserRepo.update(userId, userDetails, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.USER_UPDATE[language]
        };
    }
}
