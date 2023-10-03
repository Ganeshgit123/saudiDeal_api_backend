// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RentCategoryDomain } from "../../Domain";
import { RentCategoriesRepo } from "../../Repositories";
import Validators from "../../Validators";
import { SUCCESS } from "../../Data/language";
import RentCategory from 'App/Models/RentCategory'

export default class RentCategoriesController {

    public async get({ request }: HttpContextContract) {
        let payload = request.all();
        const language = request.header('language') || 'en'
        let type = payload.type || ''
        let rentCategory = RentCategoryDomain.createFromArrOfObject(
            await RentCategoriesRepo.get(type)
        )

        if (rentCategory.length != 0) {
            rentCategory.map((el) => {                
                el.name = language == 'en' ? el.en_name : el.ar_name
            })
        }
        return {
            success: true,
            data: rentCategory,
        };
    }

    public async create({ request }: HttpContextContract) {

        const payload = await request.validate(Validators.RentCategoryValidator);
        // let payload = request.all();


        const language = request.header('language') || 'en';
        const RentCategoryDetails = await RentCategoriesRepo.create(payload, language);

        return {
            success: true,
            result: RentCategoryDomain.createFromObject(RentCategoryDetails),
            massage: SUCCESS.RENT_CATEGORY_CREATE[language]
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdatePost = request.all()

        const language = request.header('language') || 'en'
        await RentCategoriesRepo.isEntryExist(params.id, language);
        
        const updateResult = RentCategoryDomain.createFromObject(
            await RentCategoriesRepo.update(params.id, UpdatePost, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.RENT_CATEGORY_UPDATE[language]
        };
    }

    public async delete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'
        const result = await RentCategoriesRepo.isEntryExist(params.id, language);

        await RentCategoriesRepo.delete({ active: 0 }, result, language);
        return {
            success: true,
            massage: SUCCESS.RENT_CATEGORY_DELETE[language]
        };

    }

    public async rentCategoryDelete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'

        const address = await RentCategory.findOrFail(params.id)
        await address.delete()

        return {
            success: true,
            massage: SUCCESS.DELETE_RENT_CATEGORY[language]
        };

    }
}
