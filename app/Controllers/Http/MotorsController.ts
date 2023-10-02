import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MotorDomain } from "../../Domain";
import { MotorRepo } from "../../Repositories";
import Validators from "../../Validators";
import { SUCCESS } from "../../Data/language";

export default class MotorsController {

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(Validators.MotorValidator);

        const language = request.header('language') || 'en'
        const brandDetails = await MotorRepo.create(payload, language);

        return {
            success: true,
            result: MotorDomain.createFromObject(brandDetails),
            massage: SUCCESS.MOTOR_CREATE[language]
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdatePost = request.all()

        const language = request.header('language') || 'en'
        await MotorRepo.isEntryExist(params.id, language);

        const updateResult = MotorDomain.createFromObject(
            await MotorRepo.update(params.id, UpdatePost, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.MOTOR_UPDATE[language]
        };
    }

    public async get() {

        return {
            success: true,
            data: MotorDomain.createFromArrOfObject(
                await MotorRepo.get()
            ),
        };
    }

    public async adminGet({ request }: HttpContextContract) {
        const payload = request.all()

        return {
            success: true,
            data: MotorDomain.createFromArrOfObject(
                await MotorRepo.adminGet(payload.active)
            ),
        };
    }
}



