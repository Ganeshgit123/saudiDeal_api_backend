import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { MasterTrimsDomain } from "../../Domain";
import { MasterTrimRepo } from "../../Repositories";
import { SUCCESS } from "../../Data/language";
import MasterTrim from 'App/Models/MasterTrim'

export default class MasterTrimsController {

    public async get({ request }: HttpContextContract) {
        const payload = request.all()
        let type = payload.type || ''

        return {
            success: true,
            data: MasterTrimsDomain.createFromArrOfObject(
                await MasterTrimRepo.get('', type)
            ),
        };
    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(Validators.MasterTrimValidator);

        const language = request.header('language') || 'en'
        const brandDetails = await MasterTrimRepo.create(payload, language);

        return {
            success: true,
            result: MasterTrimsDomain.createFromObject(brandDetails),
            massage: SUCCESS.MASTER_TRIMS_CREATE[language]
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdatePost = request.all()

        const language = request.header('language') || 'en'
        await MasterTrimRepo.isEntryExist(params.id, language);

        const updateResult = MasterTrimsDomain.createFromObject(
            await MasterTrimRepo.update(params.id, UpdatePost, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.MASTER_TRIMS_UPDATE[language]
        };
    }

    public async delete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'
        const result = await MasterTrimRepo.isEntryExist(params.id, language);

        await MasterTrimRepo.delete({ active: 0 }, result, language);
        return {
            success: true,
            massage: SUCCESS.MASTER_TRIMS_DELETE[language]
        };

    }

    public async adminGet({ request }: HttpContextContract) {
        const payload = request.all()        
        let type = payload.type || ''

        return {
            success: true,
            data: MasterTrimsDomain.createFromArrOfObject(
                await MasterTrimRepo.adminGet(payload.active, type)
            ),
        };
    }

    public async brandDelete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'

        const address = await MasterTrim.findOrFail(params.id)
        await address.delete()

        return {
            success: true,
            massage: SUCCESS.MASTER_TRIMS_DELETE[language]
        };

    }
}