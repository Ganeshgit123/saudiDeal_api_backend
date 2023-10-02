import Motor from 'App/Models/Motor'
import Exceptions from '../Exceptions'
import { FAILURE } from "../Data/language";

export default class MotorRepo {

    static async create(data: any, language: string) {
        const result = await Motor.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.MOTOR_CREATE[language])
        return result
    }

    static async update(id: number, data: any, language: string) {
        try {
            const result = await Motor.findOrFail(id)
            result.merge(data)
            await result.save()

            return result
        } catch (error) {
            throw Exceptions.conflict(FAILURE.MOTOR_CONFLICT[language])
        }
    }

    static async isEntryExist(id: number, language: string) {
        const result = await Motor.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.MOTOR_CONFLICT[language])
        return result
    }

    static async get() {
        const result = await Motor.query().where('active', 1)
        return result
    }

    static async adminGet(active) {
        const result = await Motor.query()
            .if(active, (query) =>
                query.where('active', active))
        return result
    }

}
