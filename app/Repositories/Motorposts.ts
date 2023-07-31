import Exceptions from '../Exceptions'
import Motorpost from 'App/Models/Motorpost'
import { FAILURE } from "../Data/language";

export default class MotorpostRepo {
    static async create(data: any, language: string) {
        const result = await Motorpost.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.MOTOR_POST_CREATE[language])
        return result
    }

    static async update(id: number, data: any, language: string) {
        try {
            const motorpost = await Motorpost.findOrFail(id)
            motorpost.merge(data)
            await motorpost.save()

            return motorpost
        } catch (error) {            
            throw Exceptions.conflict(FAILURE.MOTOR_POST_CONFLICT[language])
        }
    }

    static async get(userId, motorPostId) {
        const result = await Motorpost.query()
            .select('motor_posts.*')
            .select('motors.name as mainMotorCategoryName')
            .select('provinces.name as provinceName')
            .select('cities.city as cityName')
            .select('motor_categories.motor_categories_name as motorCategoryName')
            .select('motor_sub_categories.motor_sub_categories_name as motorSubCategoryName')
            .leftJoin('motors', 'motor_posts.main_motor_category_id', 'motors.id')
            .leftJoin('motor_categories', 'motor_posts.motor_category_id', 'motor_categories.id')
            .leftJoin('motor_sub_categories', 'motor_posts.motor_sub_category_id', 'motor_sub_categories.id')
            .leftJoin('provinces', 'motor_posts.province_id', 'provinces.id')
            .leftJoin('cities', 'motor_posts.city_id', 'cities.id')
            .where('motor_posts.active', 1)
            .if(userId, (query) =>
                query.where('motor_posts.user_id', userId))
            .if(motorPostId, (query) =>
                query.where('motor_posts.id', motorPostId))
        return result
    }

    static async getAllPost(userId) {
        const result = await Motorpost.query()
            .select('motor_posts.*')
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
            .where('motor_posts.is_approve', 1)
            .where('motor_posts.active', 1)
            .orderBy('motor_posts.id', 'desc')
            .if(userId, (query) =>
                query.where('motor_posts.user_id', userId))
        return result
    }

    static async delete(data: any, MotorPost, language: string) {
        MotorPost.active = data.active
        await MotorPost.save()
        if (!MotorPost.$isPersisted)
            throw Exceptions.notFound(FAILURE.MOTOR_POST_DELETE_CONFLICT[language])
        return MotorPost
    }

    static async isEntryExist(id: number, language: string) {
        const result = await Motorpost.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.MOTOR_POST_CONFLICT[language])
        return result
    }

    static async adminGet(active, motorPostId) {
        const result = await Motorpost.query()
            .select('motor_posts.*')
            .select('users.user_name as userName', 'users.mobile_number as userMobileNumber')
            .select('motors.name as mainMotorCategoryName')
            .select('provinces.name as provinceName')
            .select('cities.city as cityName')
            .select('motor_categories.motor_categories_name as motorCategoryName')
            .select('motor_sub_categories.motor_sub_categories_name as motorSubCategoryName')
            .leftJoin('motors', 'motor_posts.main_motor_category_id', 'motors.id')
            .leftJoin('motor_categories', 'motor_posts.motor_category_id', 'motor_categories.id')
            .leftJoin('motor_sub_categories', 'motor_posts.motor_sub_category_id', 'motor_sub_categories.id')
            .innerJoin('provinces', 'motor_posts.province_id', 'provinces.id')
            .innerJoin('cities', 'motor_posts.city_id', 'cities.id')
            .innerJoin('users', 'motor_posts.user_id', 'users.id')
            .where('motor_posts.update_status_level', 3)
            .orderBy('motor_posts.id', "desc")
            .if(active, (query) =>
                query.where('motor_posts.active', active))
            .if(motorPostId, (query) =>
                query.where('motor_posts.id', motorPostId))
        return result
    }

}
