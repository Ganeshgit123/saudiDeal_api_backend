import MotorCategory from 'App/Models/MotorCategory'

export default class MotorCategoriesRepo {

    static async get(moterId) {
        const result = await MotorCategory.query().where('active', 1)
            .if(moterId, (query) =>
                query.where('motor_id', moterId))
        return result
    }

    static async adminGet(active) {
        const result = await MotorCategory.query()
            .if(active, (query) =>
                query.where('active', active))
        return result
    }

}
