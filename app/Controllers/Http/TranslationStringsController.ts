import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { TranslationStringDomain } from "../../Domain";
import { TranslationStringRepo } from "../../Repositories";
import { SUCCESS } from "../../Data/language";
import TranslationString from 'App/Models/TranslationString'

export default class TranslationStringsController {

	public async get() {

        return {
            success: true,
            data: TranslationStringDomain.createFromArrOfObject(
                await TranslationStringRepo.get()
            ),
        };
    }

    public async create({ request }: HttpContextContract) {

        const payload = await request.validate(Validators.TranslationValidator);

        const language = request.header('language') || 'en'
        const TranslationDetails = await TranslationStringRepo.create(payload, language);

        return {
            success: true,
            result: TranslationStringDomain.createFromObject(TranslationDetails),
            massage: SUCCESS.TRANSLATIONSTRING_CREATE[language]
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdatePost = request.all()

        const language = request.header('language') || 'en'
        await TranslationStringRepo.isEntryExist(params.id, language);

        const updateResult = TranslationStringDomain.createFromObject(
            await TranslationStringRepo.update(params.id, UpdatePost, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.TRANSLATIONSTRING_UPDATE[language]
        };
    }

    public async delete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'
        const result = await TranslationStringRepo.isEntryExist(params.id, language);

        await TranslationStringRepo.delete({ active: 0 },result, language);
        return {
            success: true,
            massage: SUCCESS.TRANSLATIONSTRING_DELETE[language]
        };

    }

    public async translationStringDelete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'

        const address = await TranslationString.findOrFail(params.id)
        await address.delete()

        return {
            success: true,
            massage: SUCCESS.DELETE_TRANSLATIONSTRING[language]
        };

    }

    public async adminGet({ request }: HttpContextContract) {
        const payload = request.all()
        return {
            success: true,
            data: TranslationStringDomain.createFromArrOfObject(
                await TranslationStringRepo.adminGet(payload.active, payload.translationStringId)
            ),
        };
    }
}
