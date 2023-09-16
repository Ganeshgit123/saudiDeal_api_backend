import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { MotorViewedProductDomain } from "../../Domain";
import { MotorViewedProductsRepo } from "../../Repositories";
import { FAILURE } from "../../Data/language";

export default class MotorViewedProductsController {

    public async get({ request }: HttpContextContract) {
        // const payload = request.all()
        const userId = request.header('userId') || 0
                
        return {
            success: true,
            data: MotorViewedProductDomain.createFromArrOfObject(
                await MotorViewedProductsRepo.motorViewedProductGet(userId)
            ),
        };
    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(Validators.MotorViewedProductValidator);
        const userId = request.header('userId') || 0
        payload.userId = Number(userId)
        const language = request.header('language') || 'en'
        const rvProductDetails = await MotorViewedProductsRepo.create(payload, language);

        return {
            success: true,
            result: MotorViewedProductDomain.createFromObject(rvProductDetails),
            massage: FAILURE.MTPRODUCT_CREATE[language]
        };
    }
}
