import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { TrimDomain } from "../../Domain";
import { SUCCESS } from "../../Data/language";
import { TrimRepo } from "../../Repositories";
import Trim from 'App/Models/Trim'

export default class TrimsController {

    public async get({ request }: HttpContextContract) {
        const payload = request.all()
        let makeId = payload.makeId || ''
        let modelId = payload.modelId || ''
        const language = request.header('language') || 'en'

        let trim = TrimDomain.createFromArrOfObject(
            await TrimRepo.get(makeId, modelId)
        )
        if (trim.length != 0) {
            trim.map((el) => {
                el.name = language == 'en' ? el.enName : el.arName
            })
        }

        return {
            success: true,
            data: trim,
        };
    }

    public async create({ request }: HttpContextContract) {

        const payload = await request.validate(Validators.TrimValidator);

        // let payload = request.all();

        const language = request.header('language') || 'en'
        const TrimDetails = await TrimRepo.create(payload, language);

        return {
            success: true,
            result: TrimDomain.createFromObject(TrimDetails),
            massage: SUCCESS.TRIM_CREATE[language]
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdatePost = request.all()

        const language = request.header('language') || 'en'
        await TrimRepo.isEntryExist(params.id, language);

        const updateResult = TrimDomain.createFromObject(
            await TrimRepo.update(params.id, UpdatePost, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.TRIM_UPDATE[language]
        };
    }

    public async delete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'
        const result = await TrimRepo.isEntryExist(params.id, language);

        await TrimRepo.delete({ active: 0 }, result, language);
        return {
            success: true,
            massage: SUCCESS.TRIM_DELETE[language]
        };

    }

    public async trimDelete({ request, params }: HttpContextContract) {

        const language = request.header('language') || 'en'

        const address = await Trim.findOrFail(params.id)
        await address.delete()

        return {
            success: true,
            massage: SUCCESS.DELETE_TRIM[language]
        };

    }

    public async adminGet({ request }: HttpContextContract) {
        const payload = request.all()
        const language = request.header('language') || 'en'
        let makeId = payload.makeId || ''
        let modelId = payload.modelId || ''
        let trim = TrimDomain.createFromArrOfObject(
            await TrimRepo.adminGet(payload.active, payload.trimId, makeId, modelId)
        )
        if (trim.length != 0) {
            trim.map((el) => {
                el.name = language == 'en' ? el.enName : el.arName
            })
        }

        return {
            success: true,
            data: trim,
        };
    }
}
