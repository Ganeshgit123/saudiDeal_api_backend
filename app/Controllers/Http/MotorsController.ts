import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MotorDomain } from "../../Domain";
import { MotorRepo } from "../../Repositories";

export default class MotorsController {

    public async get() {

        return {
            success: true,
            data: MotorDomain.createFromArrOfObject(
                await MotorRepo.get()
            ),
        };
    }

    public async adminGet({ request }: HttpContextContract) {
        const payload = request.all()

        return {
            success: true,
            data: MotorDomain.createFromArrOfObject(
                await MotorRepo.adminGet(payload.active)
            ),
        };
    }
}



