import Exceptions from '../Exceptions'
import Province from 'App/Models/Province'
import { FAILURE } from "../Data/language";

export default class ProvinceRepo {
    static async create(data: any, language: string) {
        const result = await Province.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.PROVINCES_CREATE[language])
        return result
    }

    static async update(id: number, data: any, language: string) {
        try {
            const province = await Province.findOrFail(id)
            province.merge(data)
            await province.save()

            return province
        } catch (error) {
            throw Exceptions.conflict(FAILURE.PROVINCES_CONFLICT[language])
        }
    }

    static async get(provinceId) {
        const result = await Province.query().where('active', 1)
            .if(provinceId, (query) =>
                query.where('id', provinceId))
        return result
    }

    static async delete(data: any, Province, language: string) {
        Province.active = data.active
        await Province.save()
        if (!Province.$isPersisted)
            throw Exceptions.notFound(FAILURE.PROVINCES_DELETE_CONFLICT[language])
        return Province
    }

    static async isEntryExist(id: number, language: string) {
        const result = await Province.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.PROVINCES_CONFLICT[language])
        return result
    }

    static async adminGet(province) {
        const result = await Province.query()
            .if(province, (query) =>
                query.where('active', province))
        return result
    }

}
