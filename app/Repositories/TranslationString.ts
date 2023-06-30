import Exceptions from '../Exceptions'
import TranslationString from 'App/Models/TranslationString'
import { FAILURE } from "../Data/language";

export default class TranslationStringRepo {
    
	static async get() {
        const result = await TranslationString.query().where('active', 1)
        return result
    }

    static async create(data: any, language: string) {
        const result = await TranslationString.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.TRANSLATIONSTRING_CREATE[language])
        return result
    }

    static async update(id: number, data: any, language: string) {
        try {
            const translationString = await TranslationString.findOrFail(id)
            translationString.merge(data)
            await translationString.save()

            return translationString
        } catch (error) {
            throw Exceptions.conflict(FAILURE.TRANSALATIONSTRING_CONFLICT[language])
        }
    }

    static async delete(data: any, TranslationString, language: string) {
        TranslationString.active = data.active
        await TranslationString.save()
        if (!TranslationString.$isPersisted)
            throw Exceptions.notFound(FAILURE.TRANSALATIONSTRING_DELETE_CONFLICT[language])
        return TranslationString
    }

    static async isEntryExist(id: number, language) {
        const result = await TranslationString.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.TRANSALATIONSTRING_DELETE_CONFLICT[language])
        return result
    }

    static async adminGet(active, translationStringId) {
        const result = await TranslationString.query()
            .select('translation_strings.*')
            .orderBy('translation_strings.id', "desc")
            .if(active, (query) =>
                query.where('translation_strings.active', active))
            .if(translationStringId, (query) =>
                query.where('translation_strings.id', translationStringId))
        return result
    }

}
