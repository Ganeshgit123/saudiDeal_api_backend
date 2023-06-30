import MotorSubCategory from 'App/Models/MotorSubCategory'

export default class MotorSubCategoriesRepo {

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
