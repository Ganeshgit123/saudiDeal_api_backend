import Exceptions from '../Exceptions'
import MotorViewedProduct from 'App/Models/MotorViewedProduct'
import { FAILURE } from "../Data/language";

export default class MotorViewedProductsRepo {
    static async create(data: any, language: string) {
        const result = await MotorViewedProduct.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.MTPRODUCT_CREATE[language])
        return result
    }

    static async get(userId, deviceId) {
        const result = await MotorViewedProduct.query()
            .innerJoin('motor_posts', 'motor_posts.id', 'motor_viewed_products.product_id')
            .if(userId, (query) => query.where('motor_viewed_products.user_id', userId))
            .if(deviceId, (query) => query.where('motor_viewed_products.device_id', deviceId))
        return result
    }

    static async isEntryExist(id: number, language: string) {
        const result = await MotorViewedProduct.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.MTPRODUCT_CONFLICT[language])
        return result
    }

}
