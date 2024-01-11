import MotorCategory from 'App/Models/MotorCategory'
import Exceptions from '../Exceptions'
import { FAILURE } from "../Data/language";

export default class MotorCategoriesRepo {

    static async create(data: any, language: string) {
        const result = await MotorCategory.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.MOTOR_CATEGORY_CREATE[language])
        return result
    }

    static async update(id: number, data: any, language: string) {
        try {
            const result = await MotorCategory.findOrFail(id)
            result.merge(data)
            await result.save()

            return result
        } catch (error) {
            throw Exceptions.conflict(FAILURE.MOTOR_CATEGORY_CONFLICT[language])
        }
    }

    static async isEntryExist(id: number, language: string) {
        const result = await MotorCategory.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.MOTOR_CATEGORY_CONFLICT[language])
        return result
    }

    static async get(motorId) {
        const result = await MotorCategory.query().where('active', 1)
            .if(motorId, (query) =>
                query.where('motor_id', motorId))
        return result
    }

    static async adminGet(active) {
        const result = await MotorCategory.query()
            .if(active, (query) =>
                query.where('active', active))
        return result
    }

}
