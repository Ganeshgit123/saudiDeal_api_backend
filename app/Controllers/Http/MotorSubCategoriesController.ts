import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MotorSubCategory } from "../../Domain";
import { MotorSubCategoriesRepo } from "../../Repositories";
import Validators from "../../Validators"
import { SUCCESS } from "../../Data/language";

export default class MotorSubCategoriesController {

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(Validators.MotorSubCategoryValidator);

        const language = request.header('language') || 'en'
        const brandDetails = await MotorSubCategoriesRepo.create(payload, language);

        return {
            success: true,
            result: MotorSubCategory.createFromObject(brandDetails),
            massage: SUCCESS.MOTOR_SUB_CATEGORY_CREATE[language]
        };
    }

    public async get({ params }: HttpContextContract) {

        return {
            success: true,
            data: MotorSubCategory.createFromArrOfObject(
                await MotorSubCategoriesRepo.get(params.id)
            ),
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdatePost = request.all()

        const language = request.header('language') || 'en'
        await MotorSubCategoriesRepo.isEntryExist(params.id, language);

        const updateResult = MotorSubCategory.createFromObject(
            await MotorSubCategoriesRepo.update(params.id, UpdatePost, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.MOTOR_SUB_CATEGORY_UPDATE[language]
        };
    }

    public async adminGet({ request }: HttpContextContract) {
        const payload = request.all()

        return {
            success: true,
            data: MotorSubCategory.createFromArrOfObject(
                await MotorSubCategoriesRepo.adminGet(payload.active)
            ),
        };
    }
}





