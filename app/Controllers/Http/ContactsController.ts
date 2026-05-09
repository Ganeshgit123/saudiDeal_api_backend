import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { ContactDomain } from "../../Domain";
import { ContactRepo } from "../../Repositories";
import { SUCCESS } from "../../Data/language";

export default class ContactsController {

    public async get({ request }: HttpContextContract) {
        const payload = request.all()
        let type = payload.type || ''

        return {
            success: true,
            data: ContactDomain.createFromArrOfObject(
                await ContactRepo.get('', type)
            ),
        };
    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(Validators.HttpContextContract);

        const language = request.header('language') || 'en'
        const brandDetails = await ContactRepo.create(payload, language);

        return {
            success: true,
            result: ContactDomain.createFromObject(brandDetails),
            massage: SUCCESS.CONTACT_CREATE[language]
        };
    }

    public async adminGet({ request }: HttpContextContract) {
        const payload = request.all()

        const offset = payload.offset ? Number(payload.offset) : 1;
        const limit = payload.offset ? Number(payload.limit) : 25;
        return {
            success: true,
            data: ContactDomain.createFromArrOfObject(
                await ContactRepo.adminGet(offset, limit)
            ),
        };
    }
}