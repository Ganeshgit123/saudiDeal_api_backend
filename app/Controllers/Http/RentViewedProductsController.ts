import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { RentViewedProductDomain } from "../../Domain";
import { RentViewedProductsRepo } from "../../Repositories";
import { FAILURE } from "../../Data/language";

export default class RentViewedProductsController {

    public async get({ request }: HttpContextContract) {
        // const payload = request.all()
        const userId = request.header('userId') || 0

        return {
            success: true,
            data: RentViewedProductDomain.createFromArrOfObject(
                await RentViewedProductsRepo.rentViewedProductsGet(userId)
            ),
        };
    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(Validators.RentViewedProductValidator);
        const userId = request.header('userId') || 0
        payload.userId = Number(userId)
        const language = request.header('language') || 'en'
        const rvProductDetails = await RentViewedProductsRepo.create(payload, language);

        return {
            success: true,
            result: RentViewedProductDomain.createFromObject(rvProductDetails),
            massage: FAILURE.REPRODUCT_CREATE[language]
        };
    }
}
