import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RentDomain } from "../../Domain";
import { RentRepo } from "../../Repositories";
import Validators from "../../Validators";
import { SUCCESS } from "../../Data/language";
import Rent from 'App/Models/Rent'

export default class RentsController {

	// public async get() {

 //        return {
 //            success: true,
 //            data: RentDomain.createFromArrOfObject(
 //                await RentRepo.get()
 //            ),
 //        };
 //    }

 public async get({ request }: HttpContextContract) {
        const payload = request.all()

        const rentPostId = payload.rentPostId
        const userId = request.header('userId') || ''
        return {
            success: true,
            data: RentDomain.createFromArrOfObject(
                await RentRepo.get(userId, rentPostId)
            ),
        };
    }

    public async getAllPost({ request }: HttpContextContract) {
        const userId = request.header('userId') || ''
        return {
            success: true,
            data: RentDomain.createFromArrOfObject(
                await RentRepo.getAllPost(userId)
            ),
        };
    }

    public async create({ request }: HttpContextContract) {

        const payload = await request.validate(Validators.RentValidator);

        const userId = request.header('userId') || 0
        // const payload = await request.validate(Validators.BrandValidator);

        payload.userId = Number(userId)

        // let payload = request.all();

        const language = request.header('language') || 'es'
        const RentDetails = await RentRepo.create(payload, language);

        return {
            success: true,
            result: RentDomain.createFromObject(RentDetails),
            massage: SUCCESS.RENT_CREATE[language]
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdatePost = request.all()

        const language = request.header('language') || 'es'
        await RentRepo.isEntryExist(params.id, language);

        const updateResult = RentDomain.createFromObject(
            await RentRepo.update(params.id, UpdatePost, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.RENT_UPDATE[language]
        };
    }

    public async delete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'es'
        const result = await RentRepo.isEntryExist(params.id, language);

        await RentRepo.delete({ active: 0 },result, language);
        return {
            success: true,
            massage: SUCCESS.RENT_DELETE[language]
        };

    }

    public async rentDelete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'es'

        const address = await Rent.findOrFail(params.id)
        await address.delete()

        return {
            success: true,
            massage: SUCCESS.DELETE_RENT[language]
        };

    }

    public async adminGet({ request }: HttpContextContract) {
        const payload = request.all()
        return {
            success: true,
            data: RentDomain.createFromArrOfObject(
                await RentRepo.adminGet(payload.active, payload.rentId)
            ),
        };
    }
}
