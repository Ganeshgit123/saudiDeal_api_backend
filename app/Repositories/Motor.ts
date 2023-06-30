import Motor from 'App/Models/Motor'

export default class MotorRepo {

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
