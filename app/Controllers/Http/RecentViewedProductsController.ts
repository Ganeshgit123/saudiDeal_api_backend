import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { RecentViewedProductDomain } from "../../Domain";
import { RecentViewedProductsRepo } from "../../Repositories";
import { FAILURE } from "../../Data/language";

export default class RecentViewedProductsController {

    public async get({ request }: HttpContextContract) {
        const payload = request.all()
        return {
            success: true,
            data: RecentViewedProductDomain.createFromArrOfObject(
                await RecentViewedProductsRepo.get(payload.userId, payload.deviceId)
            ),
        };
    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(Validators.RecentViewedProductValidator);

        const language = request.header('language') || 'en'
        const rvProductDetails = await RecentViewedProductsRepo.create(payload, language);

        return {
            success: true,
            result: RecentViewedProductDomain.createFromObject(rvProductDetails),
            massage: FAILURE.RVPRODUCT_CREATE[language]
        };
    }
}
