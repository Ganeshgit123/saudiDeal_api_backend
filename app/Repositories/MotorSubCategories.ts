import MotorSubCategory from 'App/Models/MotorSubCategory'
import Exceptions from '../Exceptions'
import { FAILURE } from "../Data/language";

export default class MotorSubCategoriesRepo {

    static async create(data: any, language: string) {
        const result = await MotorSubCategory.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.MOTOR_SUB_CATEGORY_CREATE[language])
        return result
    }

    static async update(id: number, data: any, language: string) {
        try {
            const result = await MotorSubCategory.findOrFail(id)
            result.merge(data)
            await result.save()

            return result
        } catch (error) {
            throw Exceptions.conflict(FAILURE.MOTOR_SUB_CATEGORY_CONFLICT[language])
        }
    }

    static async isEntryExist(id: number, language: string) {
        const result = await MotorSubCategory.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.MOTOR_SUB_CATEGORY_CONFLICT[language])
        return result
    }

    static async get(motorCategoriesId) {
        const result = await MotorSubCategory.query().where('active', 1)
            .if(motorCategoriesId, (query) =>
                query.where('motor_categories_id', motorCategoriesId))
        return result
    }

    static async adminGet(active) {
        const result = await MotorSubCategory.query()
            .if(active, (query) =>
                query.where('active', active))
        return result
    }

}
