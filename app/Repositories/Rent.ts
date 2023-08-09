import Exceptions from '../Exceptions'
import Rent from 'App/Models/Rent'
import { FAILURE } from "../Data/language";

export default class RentRepo {

    static async get(userId, rentPostId) {
        const result = await Rent.query().where('rents.active', 1)
            .select('rents.*')
            .select('cities.city as cityName')
            .select('provinces.name as provincesName')
            .select('rent_categories.en_name as arCategoryName', 'rent_categories.ar_name as enCategoryName')
            .leftJoin('cities', 'rents.city_id', 'cities.id')
            .leftJoin('provinces', 'rents.province_id', 'provinces.id')
            .leftJoin('rent_categories', 'rents.category_id', 'rent_categories.id')
            .where('rents.update_status_level', 4)
            .if(userId, (query) =>
                query.where('rents.user_id', userId))
            .if(rentPostId, (query) =>
                query.where('rents.id', rentPostId))

        return result
    }

    static async getAllPost(userId, orderbyColumn, orderbyValue) {        
        const result = await Rent.query().where('rents.active', 1)
            .select('rents.*')
            .select('cities.city as cityName')
            .select('provinces.name as provincesName')
            .select('rent_categories.en_name as arCategoryName', 'rent_categories.ar_name as enCategoryName')
            .leftJoin('cities', 'rents.city_id', 'cities.id')
            .leftJoin('provinces', 'rents.province_id', 'provinces.id')
            .leftJoin('rent_categories', 'rents.category_id', 'rent_categories.id')
            .where('rents.update_status_level', 4)
            .orderBy('rents.id', 'desc')
            .orderBy(orderbyColumn, orderbyValue)
            .if(userId, (query) =>
                query.where('rents.user_id', userId))
        // .if(rentPostId, (query) =>
        //     query.where('rents.id', rentPostId))

        return result
    }

    static async create(data: any, language: string) {
        const result = await Rent.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.RENT_CREATE[language])
        return result
    }

    static async update(id: number, data: any, language: string) {
        try {
            const rent = await Rent.findOrFail(id)
            rent.merge(data)
            await rent.save()

            return rent
        } catch (error) {
            throw Exceptions.conflict(FAILURE.RENT_CONFLICT[language])
        }
    }

    static async delete(data: any, Rent, language: string) {
        Rent.active = data.active
        await Rent.save()
        if (!Rent.$isPersisted)
            throw Exceptions.notFound(FAILURE.RENT_DELETE_CONFLICT[language])
        return Rent
    }

    static async isEntryExist(id: number, language) {
        const result = await Rent.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.RENT_DELETE_CONFLICT[language])
        return result
    }

    static async adminGet(active, rentId) {
        const result = await Rent.query()
            .select('rents.*')
            .select('users.user_name as userName', 'users.mobile_number as userMobileNumber')
            .select('cities.city as cityName')
            .select('provinces.name as provincesName')
            .select('rent_categories.en_name as arCategoryName', 'rent_categories.ar_name as enCategoryName')
            .leftJoin('cities', 'rents.city_id', 'cities.id')
            .leftJoin('provinces', 'rents.province_id', 'provinces.id')
            .innerJoin('users', 'rents.user_id', 'users.id')
            .leftJoin('rent_categories', 'rents.category_id', 'rent_categories.id')
            .where('rents.update_status_level', 4)
            .orderBy('rents.id', "desc")
            .if(active, (query) =>
                query.where('rents.active', active))
            .if(rentId, (query) =>
                query.where('rents.id', rentId))
        return result
    }

}
