import Exceptions from '../Exceptions'
import MasterTrim from 'App/Models/MasterTrim'
import { FAILURE } from "../Data/language";

export default class MasterTrimRepo {
    static async create(data: any, language: string) {
        const result = await MasterTrim.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.MASTER_TRIMS_CREATE[language])
        return result
    }

    static async update(id: number, data: any, language: string) {
        try {
            const brand = await MasterTrim.findOrFail(id)
            brand.merge(data)
            await brand.save()

            return brand
        } catch (error) {
            throw Exceptions.conflict(FAILURE.MASTER_TRIMS_CONFLICT[language])
        }
    }

    static async get(brandId, type) {
        const result = await MasterTrim.query()
            .if(brandId, (query) =>
                query.where('id', brandId))
            .if(type, (query) =>
                query.where('type', type))
            .where('active', 1)
        return result
    }

    static async delete(data: any, Brand, language: string) {
        Brand.active = data.active
        await Brand.save()
        if (!Brand.$isPersisted)
            throw Exceptions.notFound(FAILURE.MASTER_TRIMS_DELETE_CONFLICT[language])
        return Brand
    }

    static async isEntryExist(id: number, language: string) {
        const result = await MasterTrim.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.MASTER_TRIMS_CONFLICT[language])
        return result
    }

    static async adminGet(brand, type) {
        const result = await MasterTrim.query()
            .if(brand, (query) =>
                query.where('active', brand))
            .if(type, (query) =>
                query.where('type', type))
        return result
    }

}