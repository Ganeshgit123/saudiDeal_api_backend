import Exceptions from '../Exceptions'
import Trim from 'App/Models/Trim'
import { FAILURE } from "../Data/language";

export default class TrimRepo {

    static async get(makeId, modelId) {
        const result = await Trim.query().where('trims.active', 1)
            .select('trims.*')
            .select('brands.name as brandName', 'brands.en_name as enBrandName', 'brands.ar_name as arBrandName')
            .select('models.model_name as modelName', 'models.en_model_name as enModelName', 'models.ar_Model_name as arModelName')
            .innerJoin('brands', 'trims.make_id', 'brands.id')
            .innerJoin('models', 'trims.model_id', 'models.id')
            .if(makeId, (query) =>
                query.where('make_id', makeId))
            .if(modelId, (query) =>
                query.where('model_id', modelId))
        return result
    }

    static async create(data: any, language: string) {
        const result = await Trim.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.TRIM_CREATE[language])
        return result
    }

    static async update(id: number, data: any, language: string) {
        try {
            const trim = await Trim.findOrFail(id)
            trim.merge(data)
            await trim.save()

            return trim
        } catch (error) {
            throw Exceptions.conflict(FAILURE.TRIM_CONFLICT[language])
        }
    }

    static async delete(data: any, Trim, language: string) {
        Trim.active = data.active
        await Trim.save()
        if (!Trim.$isPersisted)
            throw Exceptions.notFound(FAILURE.TRIM_DELETE_CONFLICT[language])
        return Trim
    }

    static async isEntryExist(id: number, language) {
        const result = await Trim.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.TRIM_DELETE_CONFLICT[language])
        return result
    }

    static async adminGet(active, trimId, makeId, modelId) {
        const result = await Trim.query()
            .select('trims.*')
            .select('brands.name as brandName', 'brands.en_name as enBrandName', 'brands.ar_name as arBrandName')
            .select('models.model_name as modelName', 'models.en_model_name as enModelName', 'models.ar_Model_name as arModelName')
            .innerJoin('brands', 'trims.make_id', 'brands.id')
            .innerJoin('models', 'trims.model_id', 'models.id')
            .orderBy('trims.id', "desc")
            .if(makeId, (query) =>
                query.where('make_id', makeId))
            .if(modelId, (query) =>
                query.where('model_id', modelId))
            .if(active, (query) =>
                query.where('trims.active', active))
            .if(trimId, (query) =>
                query.where('trims.id', trimId))
        return result
    }

}
