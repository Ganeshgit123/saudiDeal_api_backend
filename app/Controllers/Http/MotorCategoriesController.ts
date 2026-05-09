import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MotorCategoryDomain } from "../../Domain";
import { MotorCategoriesRepo } from "../../Repositories";
import Validators from "../../Validators"
import { SUCCESS } from "../../Data/language";

export default class MotorCategoriesController {

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(Validators.MotorCategoryValidator);

        const language = request.header('language') || 'en'
        const brandDetails = await MotorCategoriesRepo.create(payload, language);

        return {
            success: true,
            result: MotorCategoryDomain.createFromObject(brandDetails),
            massage: SUCCESS.MOTOR_CATEGORY_CREATE[language]
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdatePost = request.all()

        const language = request.header('language') || 'en'
        await MotorCategoriesRepo.isEntryExist(params.id, language);

        const updateResult = MotorCategoryDomain.createFromObject(
            await MotorCategoriesRepo.update(params.id, UpdatePost, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.MOTOR_CATEGORY_UPDATE[language]
        };
    }

    public async get({ params }: HttpContextContract) {

        return {
            success: true,
            data: MotorCategoryDomain.createFromArrOfObject(
                await MotorCategoriesRepo.get(params.id)
            ),
        };
    }

    public async adminGet({ request }: HttpContextContract) {
        const payload = request.all()

        return {
            success: true,
            data: MotorCategoryDomain.createFromArrOfObject(
                await MotorCategoriesRepo.adminGet(payload.active)
            ),
        };
    }
}




