import Exceptions from '../Exceptions'
import Brand from 'App/Models/Brand'
import { FAILURE } from "../Data/language";

export default class BrandRepo {
    static async create(data: any, language: string) {
        const result = await Brand.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.BRAND_CREATE[language])
        return result
    }

    static async update(id: number, data: any, language: string) {
        try {
            const brand = await Brand.findOrFail(id)
            brand.merge(data)
            await brand.save()

            return brand
        } catch (error) {
            throw Exceptions.conflict(FAILURE.BRAND_CONFLICT[language])
        }
    }

    static async get(brandId, type) {
        const result = await Brand.query()
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
            throw Exceptions.notFound(FAILURE.BRAND_DELETE_CONFLICT[language])
        return Brand
    }

    static async isEntryExist(id: number, language: string) {
        const result = await Brand.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.BRAND_CONFLICT[language])
        return result
    }

    static async adminGet(brand, type) {
        const result = await Brand.query()
            .if(brand, (query) =>
                query.where('active', brand))
            .if(type, (query) =>
                query.where('type', type))
        return result
    }

}
