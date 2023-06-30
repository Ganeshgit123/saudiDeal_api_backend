import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { ProvinceDomain } from "../../Domain";
import { ProvinceRepo } from "../../Repositories";
import { SUCCESS } from "../../Data/language";
import Province from 'App/Models/Province'

export default class ProvincesController {

    public async get() {
        return {
            success: true,
            data: ProvinceDomain.createFromArrOfObject(
                await ProvinceRepo.get('')
            ),
        };
    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(Validators.ProvinceValidator);

        const language = request.header('language') || 'en'
        const provinceDetails = await ProvinceRepo.create(payload, language);

        return {
            success: true,
            result: ProvinceDomain.createFromObject(provinceDetails),
            massage: SUCCESS.PROVINCES_CREATE[language]
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdatePost = request.all()

        const language = request.header('language') || 'en'
        await ProvinceRepo.isEntryExist(params.id, language);

        const updateResult = ProvinceDomain.createFromObject(
            await ProvinceRepo.update(params.id, UpdatePost, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.PROVINCES_UPDATE[language]
        };
    }

    public async delete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'
        const result = await ProvinceRepo.isEntryExist(params.id, language);

        await ProvinceRepo.delete({ active: 0 }, result, language);
        return {
            success: true,
            massage: SUCCESS.PROVINCES_DELETE[language]
        };

    }

    public async adminGet({ request }: HttpContextContract) {
        const payload = request.all()
        return {
            success: true,
            data: ProvinceDomain.createFromArrOfObject(
                await ProvinceRepo.adminGet(payload.active)
            ),
        };
    }


    public async provinceDelete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'
        const address = await Province.findOrFail(params.id)
        await address.delete()
        return {
            success: true,
            massage: SUCCESS.PROVINCES_DELETE[language]
        };
    }
}

