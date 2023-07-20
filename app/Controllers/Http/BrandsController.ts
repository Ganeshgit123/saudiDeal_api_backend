import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { BrandDomain } from "../../Domain";
import { BrandRepo } from "../../Repositories";
import { SUCCESS } from "../../Data/language";
import Brand from 'App/Models/Brand'

export default class BrandsController {

    public async get({ request }: HttpContextContract) {
        const payload = request.all()
        let type = payload.type || ''

        return {
            success: true,
            data: BrandDomain.createFromArrOfObject(
                await BrandRepo.get('', type)
            ),
        };
    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(Validators.BrandValidator);

        const language = request.header('language') || 'en'
        const brandDetails = await BrandRepo.create(payload, language);

        return {
            success: true,
            result: BrandDomain.createFromObject(brandDetails),
            massage: SUCCESS.BRAND_CREATE[language]
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdatePost = request.all()

        const language = request.header('language') || 'en'
        await BrandRepo.isEntryExist(params.id, language);

        const updateResult = BrandDomain.createFromObject(
            await BrandRepo.update(params.id, UpdatePost, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.BRAND_UPDATE[language]
        };
    }

    public async delete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'
        const result = await BrandRepo.isEntryExist(params.id, language);

        await BrandRepo.delete({ active: 0 }, result, language);
        return {
            success: true,
            massage: SUCCESS.BRAND_DELETE[language]
        };

    }

    public async adminGet({ request }: HttpContextContract) {
        const payload = request.all()        
        let type = payload.type || ''

        return {
            success: true,
            data: BrandDomain.createFromArrOfObject(
                await BrandRepo.adminGet(payload.active, type)
            ),
        };
    }

    public async brandDelete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'

        const address = await Brand.findOrFail(params.id)
        await address.delete()

        return {
            success: true,
            massage: SUCCESS.BRAND_DELETE[language]
        };

    }
}

