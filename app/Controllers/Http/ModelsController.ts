import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { ModelDomain } from "../../Domain";
import { ModelRepo } from "../../Repositories";
import { SUCCESS } from "../../Data/language";
import Model from 'App/Models/Model'

export default class ModelsController {

    public async get({ request, params }: HttpContextContract) {
        const payload = request.all()
        let type = payload.type || ''
        return {
            success: true,
            data: ModelDomain.createFromArrOfObject(
                await ModelRepo.get(params.id, type)
            ),
        };
    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(Validators.ModelValidator);

        const language = request.header('language') || 'en'
        const modelDetails = await ModelRepo.create(payload, language);

        return {
            success: true,
            result: ModelDomain.createFromObject(modelDetails),
            massage: SUCCESS.MODEL_CREATE[language]
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdatePost = request.all()

        const language = request.header('language') || 'en'
        await ModelRepo.isEntryExist(params.id, language);

        const updateResult = ModelDomain.createFromObject(
            await ModelRepo.update(params.id, UpdatePost, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.MODEL_UPDATE[language]
        };
    }

    public async delete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'
        const result = await ModelRepo.isEntryExist(params.id, language);

        await ModelRepo.delete({ active: 0 }, result, language);
        return {
            success: true,
            massage: SUCCESS.MODEL_DELETE[language]
        };

    }

    public async adminGet({ request }: HttpContextContract) {
        const payload = request.all()
        let type = payload.type || ''
        let brandId = payload.brandId || ''
        let active = payload.active || ''

        return {
            success: true,
            data: ModelDomain.createFromArrOfObject(
                await ModelRepo.adminGet(active, type, brandId)
            ),
        };
    }

    public async modelDelete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'

        const address = await Model.findOrFail(params.id)
        await address.delete()

        return {
            success: true,
            massage: SUCCESS.MODEL_DELETE[language]
        };

    }
}

