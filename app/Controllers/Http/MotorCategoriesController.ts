import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MotorCategoryDomain } from "../../Domain";
import { MotorCategoriesRepo } from "../../Repositories";

export default class MotorCategoriesController {

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




