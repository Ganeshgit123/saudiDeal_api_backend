import Exceptions from '../Exceptions'
import RentViewedProduct from 'App/Models/RentViewedProduct'
import Rent from 'App/Models/Rent'
import { FAILURE } from "../Data/language";

export default class RentViewedProductsRepo {
    static async create(data: any, language: string) {
        const result = await RentViewedProduct.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.REPRODUCT_CREATE[language])
        return result
    }

    static async get(userId, subscriptionIds) {
        // const result = await RentViewedProduct.query()
        //     .innerJoin('rents', 'rents.id', 'rent_viewed_products.product_id')
        //     .where('rent_viewed_products.user_id', userId)

        const result = await Rent.query().where('rents.active', 1)
            .select('rents.*')
            .select('cities.city as cityName')
            .select('provinces.name as provincesName')
            .leftJoin('cities', 'rents.city_id', 'cities.id')
            .leftJoin('provinces', 'rents.province_id', 'provinces.id')
            .innerJoin('rent_viewed_products', 'rent_viewed_products.product_id', 'rents.id')
            .where('rent_viewed_products.user_id', userId)
            .where('rents.is_approve', 1)
            .if(subscriptionIds, (query) =>
                query.whereIn('rents.subscription_id', subscriptionIds))
        // .if(userId, (query) =>
        //     query.where('rents.user_id', userId))
        return result
    }

    static async rentViewedProductsGet(userId) {
        // const result = await RentViewedProduct.query()
        //     .innerJoin('rents', 'rents.id', 'rent_viewed_products.product_id')
        //     .where('rent_viewed_products.user_id', userId)

        const result = await Rent.query().where('rents.active', 1)
            .select('rents.*')
            .select('cities.city as cityName')
            .select('users.user_name as userName', 'users.mobile_number as userMobileNumber', 'users.id as favUserId')
            .select('provinces.name as provincesName')
            .leftJoin('cities', 'rents.city_id', 'cities.id')
            .leftJoin('provinces', 'rents.province_id', 'provinces.id')
            .innerJoin('rent_viewed_products', 'rent_viewed_products.product_id', 'rents.id')
            .innerJoin('users', 'rent_viewed_products.user_id', 'users.id')
            .where('rent_viewed_products.user_id', userId)
            .where('rents.is_approve', 1)
        // .if(userId, (query) =>
        //     query.where('rents.user_id', userId))
        return result
    }

    static async isEntryExist(id: number, language: string) {
        const result = await RentViewedProduct.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.REPRODUCT_CONFLICT[language])
        return result
    }

}
