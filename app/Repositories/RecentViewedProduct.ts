import Exceptions from '../Exceptions'
import RecentViewedProduct from 'App/Models/RecentViewedProduct'
import { FAILURE } from "../Data/language";

export default class RecentViewedProductsRepo {
    static async create(data: any, language: string) {
        const result = await RecentViewedProduct.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.RVPRODUCT_CREATE[language])
        return result
    }

    static async get(userId, deviceId) {
        const result = await RecentViewedProduct.query()
            .innerJoin('products', 'products.id', 'recent_viewed_products.product_id')
            .if(userId, (query) => query.where('recent_viewed_products.user_id', userId))
            .if(deviceId, (query) => query.where('recent_viewed_products.device_id', deviceId))
        return result
    }

    static async isEntryExist(id: number, language: string) {
        const result = await RecentViewedProduct.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.RVPRODUCT_CONFLICT[language])
        return result
    }

}
