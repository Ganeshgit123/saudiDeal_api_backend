import Exceptions from '../Exceptions'
import Rent from 'App/Models/Rent'
import { FAILURE } from "../Data/language";
import Database from '@ioc:Adonis/Lucid/Database';

export default class RentRepo {

    static async getRentPostCount(type) {

        if (type == "RENT") {
            const result = await Database.rawQuery(`SELECT SUM(category_id = 7) as apartmentCount,
            SUM(category_id = 8) as villaCount, 
            SUM(category_id = 9) as commercialCount,
            SUM(category_id = 10) as villaCompoundCount,
            SUM(category_id = 11) as penthouseCount,
            SUM(category_id = 12) as residentialBuildingCount,
            SUM(category_id = 13) as landCount,
            SUM(category_id = 14) as roomsForRentCount,
            SUM(category_id = 15) as warehouseCount FROM rents where is_approve =1`)
            return result[0]
        } else {
            const result = await Database.rawQuery(`SELECT SUM(category_id = 16) as apartmentCount,
            SUM(category_id = 17) as villaCount, 
            SUM(category_id = 18) as commercialCount,
            SUM(category_id = 19) as villaCompoundCount,
            SUM(category_id = 20) as penthouseCount,
            SUM(category_id = 21) as residentialBuildingCount,
            SUM(category_id = 22) as landCount,
            SUM(category_id = 24) as warehouseCount FROM rents where is_approve =1`)
            return result[0]
        }
    }

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

    static async myRentGet(userId, rentPostId) {
        const result = await Rent.query().where('rents.active', 1)
            .select('rents.*')
            .select('cities.city as cityName')
            .select('provinces.name as provincesName')
            .select('rent_categories.en_name as arCategoryName', 'rent_categories.ar_name as enCategoryName')
            .leftJoin('cities', 'rents.city_id', 'cities.id')
            .leftJoin('provinces', 'rents.province_id', 'provinces.id')
            .leftJoin('rent_categories', 'rents.category_id', 'rent_categories.id')
            // .where('rents.update_status_level', 4)
            .if(userId, (query) =>
                query.where('rents.user_id', userId))
            .if(rentPostId, (query) =>
                query.where('rents.id', rentPostId))

        return result
    }

    static async getAllPost(userId, orderbyColumn, orderbyValue, payload) {        
        const result = await Rent.query().where('rents.active', 1)
            .select('rents.*')
            .select('cities.city as cityName')
            .select('provinces.name as provincesName')
            .select('rent_categories.en_name as arCategoryName', 'rent_categories.ar_name as enCategoryName')
            .leftJoin('cities', 'rents.city_id', 'cities.id')
            .leftJoin('provinces', 'rents.province_id', 'provinces.id')
            .leftJoin('rent_categories', 'rents.category_id', 'rent_categories.id')
            .where('rents.is_approve', 1)
            .where('rents.update_status_level', 4)
            // .orderBy('rents.id', 'desc')
            .orderBy(`rents.${orderbyColumn}`, orderbyValue)
            .if(payload.type, (query) =>
                query.where('rents.type', payload.type))
            .if(payload.categoryId, (query) =>
                query.where('rents.category_id', payload.categoryId))
            .if(payload.propertyAge, (query) =>
                query.where('rents.property_age', payload.propertyAge))
            .if(payload.noBedrooms, (query) =>
                query.where('rents.no_bedrooms', payload.noBedrooms))
            .if(payload.noBathrooms, (query) =>
                query.where('rents.no_bathrooms', payload.noBathrooms))
            .if(payload.provinceId, (query) =>
                query.where('rents.province_id', payload.provinceId))
            .if(payload.cityId, (query) =>
                query.where('rents.city_id', payload.cityId))
            .if(payload.rentalTerm, (query) =>
                query.where('rents.rental_term', payload.rentalTerm))
            // .if(payload.areaInSqmt, (query) =>
            //     query.where('rents.endAreaInSqmt', payload.areaInSqmt))
            .if(payload.startingPrice && payload.endingPrice, (query) =>
                query.whereBetween('rents.price', [payload.startingPrice, payload.endingPrice]))
            .if(payload.startingAreaInSqmt && payload.endAreaInSqmt, (query) =>
                query.whereBetween('rents.area_in_sqmt', [payload.startingAreaInSqmt, payload.endAreaInSqmt]))
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
