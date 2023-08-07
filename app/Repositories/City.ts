import Exceptions from '../Exceptions'
import City from 'App/Models/City'
import { FAILURE } from "../Data/language";

export default class CityRepo {
    static async create(data: any, language: string) {
        const result = await City.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.CITY_CREATE[language])
        return result
    }

    static async update(id: number, data: any, language: string) {
        try {
            const city = await City.findOrFail(id)
            city.merge(data)
            await city.save()

            return city
        } catch (error) {
            throw Exceptions.conflict(FAILURE.CITY_CONFLICT[language])
        }
    }

    static async get(provinceId) {
        const result = await City.query()
            .select('cities.*')
            .select('provinces.name as provinceName', 'provinces.en_name as enProvinceName', 'provinces.ar_name as arProvinceName')
            .innerJoin('provinces', 'cities.province_id', 'provinces.id')
            .where('cities.active', 1)
            .if(provinceId, (query) =>
                query.where('cities.province_id', provinceId))
        return result
    }

    static async delete(data: any, City, language: string) {
        City.active = data.active
        await City.save()
        if (!City.$isPersisted)
            throw Exceptions.notFound(FAILURE.CITY_DELETE_CONFLICT[language])
        return City
    }

    static async isEntryExist(id: number, language: string) {
        const result = await City.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.CITY_CONFLICT[language])
        return result
    }

    static async adminGet(active) {
        const result = await City.query()
            .select('cities.*')
            .select('provinces.name as provinceName', 'provinces.en_name as enProvinceName', 'provinces.ar_name as arProvinceName')
            .innerJoin('provinces', 'cities.province_id', 'provinces.id')
            .if(active, (query) =>
                query.where('active', active))
        return result
    }

}