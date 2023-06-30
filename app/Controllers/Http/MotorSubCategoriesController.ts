import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MotorSubCategory } from "../../Domain";
import { MotorSubCategoriesRepo } from "../../Repositories";

export default class MotorSubCategoriesController {

    public async get({ params }: HttpContextContract) {

        return {
            success: true,
            data: MotorSubCategory.createFromArrOfObject(
                await MotorSubCategoriesRepo.get(params.id)
            ),
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





