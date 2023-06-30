import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { CityDomain } from "../../Domain";
import { CityRepo } from "../../Repositories";
import { SUCCESS } from "../../Data/language";
import City from 'App/Models/City'

export default class CitiesController {

    public async get({ params }: HttpContextContract) {
        return {
            success: true,
            data: CityDomain.createFromArrOfObject(
                await CityRepo.get(params.id)
            ),
        };
    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(Validators.CityValidator);

        const language = request.header('language') || 'en'
        const brandDetails = await CityRepo.create(payload, language);

        return {
            success: true,
            result: CityDomain.createFromObject(brandDetails),
            massage: SUCCESS.CITY_CREATE[language]
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdatePost = request.all()

        const language = request.header('language') || 'en'
        await CityRepo.isEntryExist(params.id, language);

        const updateResult = CityDomain.createFromObject(
            await CityRepo.update(params.id, UpdatePost, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.CITY_UPDATE[language]
        };
    }

    public async delete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'
        const result = await CityRepo.isEntryExist(params.id, language);

        await CityRepo.delete({ active: 0 }, result, language);
        return {
            success: true,
            massage: SUCCESS.CITY_DELETE[language]
        };

    }

    public async adminGet({ request }: HttpContextContract) {
        const payload = request.all()
        return {
            success: true,
            data: CityDomain.createFromArrOfObject(
                await CityRepo.adminGet(payload.active)
            ),
        };
    }

    public async cityDelete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'

        const address = await City.findOrFail(params.id)
        await address.delete()

        return {
            success: true,
            massage: SUCCESS.CITY_DELETE[language]
        };

    }
}

