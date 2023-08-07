import Exceptions from '../Exceptions'
import Model from 'App/Models/Model'
import { FAILURE } from "../Data/language";

export default class ModelRepo {
    static async create(data: any, language: string) {
        const result = await Model.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.MODEL_CREATE[language])
        return result
    }

    static async update(id: number, data: any, language: string) {
        try {
            const model = await Model.findOrFail(id)
            model.merge(data)
            await model.save()

            return model
        } catch (error) {
            throw Exceptions.conflict(FAILURE.MODEL_CONFLICT[language])
        }
    }

    static async get(brandId) {
        const result = await Model.query()
            .select('models.*')
            .select('brands.name as brandName', 'brands.en_name as enBrandName', 'brands.ar_name as arBrandName')
            .innerJoin('brands', 'models.brand_id', 'brands.id')
            .where('models.active', 1)
            .if(brandId, (query) =>
                query.where('models.brand_id', brandId))
        return result
    }

    static async delete(data: any, Model, language: string) {
        Model.active = data.active
        await Model.save()
        if (!Model.$isPersisted)
            throw Exceptions.notFound(FAILURE.MODEL_DELETE_CONFLICT[language])
        return Model
    }

    static async isEntryExist(id: number, language: string) {
        const result = await Model.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.MODEL_CONFLICT[language])
        return result
    }

    static async adminGet(model) {
        const result = await Model.query()
            .select('models.*')
            .select('brands.name as brandName', 'brands.en_name as enBrandName', 'brands.ar_name as arBrandName')
            .innerJoin('brands', 'models.brand_id', 'brands.id')
            .if(model, (query) =>
                query.where('active', model))
        return result
    }

}