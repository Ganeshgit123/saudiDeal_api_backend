import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Validators from "../../Validators";
import { MotorPostDomain } from "../../Domain";
import { MotorpostRepo } from "../../Repositories";
import { SUCCESS } from "../../Data/language";

export default class MotorpostsController {

    public async get({ request }: HttpContextContract) {
        const payload = request.all()

        const motorPostId = payload.motorPostId
        const userId = request.header('userId') || ''
        return {
            success: true,
            data: MotorPostDomain.createFromArrOfObject(
                await MotorpostRepo.get(userId, motorPostId)
            ),
        };
    }

    public async getAllPost({ request }: HttpContextContract) {
        const userId = request.header('userId') || ''
        return {
            success: true,
            data: MotorPostDomain.createFromArrOfObject(
                await MotorpostRepo.getAllPost(userId)
            ),
        };
    }

    public async create({ request }: HttpContextContract) {
        let payload = request.all()
        const userId = request.header('userId') || ''
        // const payload = await request.validate(Validators.BrandValidator);

        payload.userId = userId
        const language = request.header('language') || 'en'
        const motorPostDetails = await MotorpostRepo.create(payload, language);

        return {
            success: true,
            result: MotorPostDomain.createFromObject(motorPostDetails),
            massage: SUCCESS.MOTOR_POST_CREATE[language]
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdatePost = request.all()

        const language = request.header('language') || 'en'
        await MotorpostRepo.isEntryExist(params.id, language);

        const updateResult = MotorPostDomain.createFromObject(
            await MotorpostRepo.update(params.id, UpdatePost, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.MOTOR_POST_UPDATE[language]
        };
    }

    public async delete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'
        const result = await MotorpostRepo.isEntryExist(params.id, language);

        await MotorpostRepo.delete({ active: 0 }, result, language);
        return {
            success: true,
            massage: SUCCESS.MOTOR_POST_DELETE[language]
        };

    }

    public async adminGet({ request }: HttpContextContract) {
        const payload = request.all()
        return {
            success: true,
            data: MotorPostDomain.createFromArrOfObject(
                await MotorpostRepo.adminGet(payload.active, payload.motorPostId)
            ),
        };
    }
}

