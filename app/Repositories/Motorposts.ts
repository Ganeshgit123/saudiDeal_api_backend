import Exceptions from '../Exceptions'
import Motorpost from 'App/Models/Motorpost'
import { FAILURE } from "../Data/language";
import Database from '@ioc:Adonis/Lucid/Database';
// import { format } from 'date-fns'

export default class MotorpostRepo {
    static async create(data: any, language: string) {
        const result = await Motorpost.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.MOTOR_POST_CREATE[language])
        return result
    }

    static async update(id: number, data: any, language: string) {
        try {
            if (data.newPost) {
                await delete data.newPost
            }
            const motorpost = await Motorpost.findOrFail(id)
            motorpost.merge(data)
            await motorpost.save()

            return motorpost
        } catch (error) {
            throw Exceptions.conflict(FAILURE.MOTOR_POST_CONFLICT[language])
        }
    }

    static async getMotorPostCount(subscriptionIds) {
        // var datetime: any = new Date();
        // var startTime: any = format(datetime, 'yyyy-MM-dd')
        const result = await Database.rawQuery(`
        SELECT SUM(main_motor_category_id = 1) as usedCarCount,
                SUM(main_motor_category_id = 2) as motorCycleCount, 
                SUM(main_motor_category_id = 3) as heavyEquipmentCount, 
                SUM(main_motor_category_id = 4) as boatCount FROM motor_posts 
                where is_approve =1 and active =1 and update_status_level =3 
                and subscription_id IN (${subscriptionIds})`)
        return result[0]
    }

    static async getMotorCount(subscriptionIds, mainMotorCategoryId) {
        // var datetime: any = new Date();
        // var startTime: any = format(datetime, 'yyyy-MM-dd')
        if (mainMotorCategoryId) {
            const result = await Database.rawQuery(`
        SELECT SUM(main_motor_category_id = ${mainMotorCategoryId}) as Count FROM motor_posts 
                where is_approve =1 and active =1 and update_status_level =3 
                and subscription_id IN (${subscriptionIds})`)
            return result[0]
        } else {
            const result = await Database.rawQuery(`
        SELECT Count(id) as Count FROM motor_posts 
                where is_approve =1 and active =1 and update_status_level =3 
                and subscription_id IN (${subscriptionIds})`)
            return result[0]
        }

    }

    static async get(userId, motorPostId, isApprove, active, offset, limit, subscriptionIds) {
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
            // .where('motor_posts.is_approve', 1)
            // .where('motor_posts.active', 1)
            // .where('motor_posts.update_status_level', 3)
            .if(isApprove, (query) =>
                query.where('motor_posts.is_approve', isApprove))
            .if(active, (query) =>
                query.where('motor_posts.active', active))
            .if(userId, (query) =>
                query.where('motor_posts.user_id', userId))
            .if(motorPostId, (query) =>
                query.where('motor_posts.id', motorPostId))
            .if(subscriptionIds, (query) =>
                query.whereIn('motor_posts.subscription_id', subscriptionIds))
            .if(offset && limit, (query) => {
                query.forPage(offset, limit)
            })
        return result
    }

    static async getAllPost(userId, orderbyColumn, orderbyValue, payload, offset, limit, subscriptionIds) {
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
            .where('motor_posts.is_approve', 1)
            .where('motor_posts.active', 1)
            .where('motor_posts.update_status_level', 3)
            .orderBy(orderbyColumn, orderbyValue)
            .orderBy('motor_posts.id', 'desc')
            .if(payload.motorCategoryId, (query) =>
                query.where('motor_posts.motor_category_id', payload.motorCategoryId))
            .if(payload.mainMotorCategoryId, (query) =>
                query.where('motor_posts.main_motor_category_id', payload.mainMotorCategoryId))
            .if(payload.motorSubCategoryId, (query) =>
                query.where('motor_posts.motor_sub_category_id', payload.motorSubCategoryId))
            .if(payload.make, (query) =>
                query.where('motor_posts.make', payload.make))
            .if(payload.model, (query) =>
                query.where('motor_posts.model', payload.model))
            .if(payload.age, (query) =>
                query.where('motor_posts.age', payload.age))
            .if(payload.provinceId, (query) =>
                query.where('motor_posts.province_id', payload.provinceId))
            .if(payload.cityId, (query) =>
                query.where('motor_posts.city_id', payload.cityId))
            .if(payload.trim, (query) =>
                query.where('motor_posts.trim', payload.trim))
            .if(payload.regionalSpecs, (query) =>
                query.where('motor_posts.regional_specs', payload.regionalSpecs))
            .if(payload.bodyType, (query) =>
                query.where('motor_posts.body_type', payload.bodyType))
            .if(payload.transmissionType, (query) =>
                query.where('motor_posts.transmission_type', payload.transmissionType))
            .if(payload.interiorColor, (query) =>
                query.where('motor_posts.interior_color', payload.interiorColor))
            .if(payload.exteriorColor, (query) =>
                query.where('motor_posts.exterior_color', payload.exteriorColor))
            .if(payload.horsePower, (query) =>
                query.where('motor_posts.horse_power', payload.horsePower))
            .if(payload.cylinders, (query) =>
                query.where('motor_posts.cylinders', payload.cylinders))
            .if(payload.wheels, (query) =>
                query.where('motor_posts.wheels', payload.wheels))
            .if(payload.engineSize, (query) =>
                query.where('motor_posts.engine_size', payload.engineSize))
            .if(payload.length, (query) =>
                query.where('motor_posts.length', payload.length))
            .if(payload.warranty, (query) =>
                query.where('motor_posts.warranty', payload.warranty))
            .if(payload.finalDriveSystem, (query) =>
                query.where('motor_posts.final_drive_system', payload.finalDriveSystem))
            .if(payload.startingPrice && payload.endingPrice, (query) =>
                query.whereBetween('motor_posts.price', [payload.startingPrice, payload.endingPrice]))
            .if(payload.startingKilometer && payload.endingKilometer, (query) =>
                query.whereBetween('motor_posts.kilometer', [payload.startingKilometer, payload.endingKilometer]))
            .if(payload.startingYear && payload.endingYear, (query) =>
                query.whereBetween('motor_posts.year', [payload.startingYear, payload.endingYear]))
            .if(userId, (query) =>
                query.where('motor_posts.user_id', userId))
            .if(subscriptionIds, (query) =>
                query.whereIn('motor_posts.subscription_id', subscriptionIds))
            // Apply pagination only if offset and limit are both defined
            .if(typeof offset === 'number' && typeof limit === 'number', (query) => {
                query.forPage(offset, limit)
            })
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

    static async adminGet(active, motorPostId, limit, offset) {
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
            .if(offset && limit, (query) => {
                query.forPage(offset, limit)
            })
        return result
    }

    static async adminGetExpiryPost(active, motorPostId, limit, offset, userIds) {
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
            .if(userIds, (query) =>
                query.whereIn('motor_posts.subscription_id', userIds))
            .if(active, (query) =>
                query.where('motor_posts.active', active))
            .if(motorPostId, (query) =>
                query.where('motor_posts.id', motorPostId))
            .if(offset && limit, (query) => {
                query.forPage(offset, limit)
            })
        return result
    }

}
