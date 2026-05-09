import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { AddressDomain } from "../../Domain";
import { AddressRepo } from "../../Repositories";
import { SUCCESS } from "../../Data/language";
import Address from 'App/Models/Address'

export default class AddressesController {

    public async get({ request }: HttpContextContract) {
        const userId = request.header('userId') || ''

        return {
            success: true,
            data: AddressDomain.createFromArrOfObject(
                await AddressRepo.get(userId)
            ),
        };
    }

    public async create({ request }: HttpContextContract) {
        let payload = await request.validate(Validators.AddressValidator);
        const userId: any = request.header('userId') || 0

        payload["userId"] = userId
        const language = request.header('language') || 'en'
        const addressDetails = await AddressRepo.create(payload, language);

        return {
            success: true,
            result: AddressDomain.createFromObject(addressDetails),
            massage: SUCCESS.ADDRESS_CREATE[language]
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdatePost = request.all()

        const language = request.header('language') || 'en'
        await AddressRepo.isEntryExist(params.id, language);

        const updateResult = AddressDomain.createFromObject(
            await AddressRepo.update(params.id, UpdatePost, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.ADDRESS_UPDATE[language]
        };
    }

    public async delete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'
        const result = await AddressRepo.isEntryExist(params.id, language);

        await AddressRepo.delete({ active: 0 }, result, language);
        return {
            success: true,
            massage: SUCCESS.ADDRESS_DELETE[language]
        };

    }

    public async adminGet() {
        return {
            success: true,
            data: AddressDomain.createFromArrOfObject(
                await AddressRepo.adminGet()
            ),
        };
    }

    public async addressDelete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'

        const address = await Address.findOrFail(params.id)
        await address.delete()

        return {
            success: true,
            massage: SUCCESS.ADDRESS_DELETE[language]
        };

    }
}
