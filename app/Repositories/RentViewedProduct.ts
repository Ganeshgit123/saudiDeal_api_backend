import Exceptions from '../Exceptions'
import RentViewedProduct from 'App/Models/RentViewedProduct'
import { FAILURE } from "../Data/language";

export default class RentViewedProductsRepo {
    static async create(data: any, language: string) {
        const result = await RentViewedProduct.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.REPRODUCT_CREATE[language])
        return result
    }

    static async get(userId, deviceId) {
        const result = await RentViewedProduct.query()
            .innerJoin('rents', 'rents.id', 'rent_viewed_products.product_id')
            .if(userId, (query) => query.where('rent_viewed_products.user_id', userId))
            .if(deviceId, (query) => query.where('rent_viewed_products.device_id', deviceId))
        return result
    }

    static async isEntryExist(id: number, language: string) {
        const result = await RentViewedProduct.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.REPRODUCT_CONFLICT[language])
        return result
    }

}
