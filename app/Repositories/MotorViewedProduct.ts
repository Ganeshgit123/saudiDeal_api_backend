import Exceptions from '../Exceptions'
import MotorViewedProduct from 'App/Models/MotorViewedProduct'
import { FAILURE } from "../Data/language";
import Motorpost from 'App/Models/Motorpost'

export default class MotorViewedProductsRepo {
    static async create(data: any, language: string) {
        const result = await MotorViewedProduct.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.MTPRODUCT_CREATE[language])
        return result
    }

    static async get(userId) {
        // const result = await MotorViewedProduct.query()
        //     .innerJoin('motor_posts', 'motor_posts.id', 'motor_viewed_products.product_id')
        //     .where('motor_viewed_products.user_id', userId)
        const result = await Motorpost.query()
            .select('motor_posts.*')
            .select('users.user_name as userName', 'users.mobile_number as userMobileNumber')
            .select('motors.name as mainMotorCategoryName')
            .select('provinces.name as provinceName')
            .select('cities.city as cityName')
            .select('motor_categories.motor_categories_name as motorCategoryName')
            .select('motor_sub_categories.motor_sub_categories_name as motorSubCategoryName')
            .innerJoin('motors', 'motor_posts.main_motor_category_id', 'motors.id')
            .innerJoin('motor_categories', 'motor_posts.motor_category_id', 'motor_categories.id')
            .innerJoin('motor_sub_categories', 'motor_posts.motor_sub_category_id', 'motor_sub_categories.id')
            .innerJoin('provinces', 'motor_posts.province_id', 'provinces.id')
            .innerJoin('cities', 'motor_posts.city_id', 'cities.id')
            .innerJoin('users', 'motor_posts.user_id', 'users.id')
            .innerJoin('motor_viewed_products', 'motor_posts.id', 'motor_viewed_products.product_id')
            .where('motor_posts.update_status_level', 3)
            .orderBy('motor_posts.id', "desc")
            .if(userId, (query) =>
                query.where('motor_posts.user_id', userId))
        return result
    }

    static async isEntryExist(id: number, language: string) {
        const result = await MotorViewedProduct.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.MTPRODUCT_CONFLICT[language])
        return result
    }

}
