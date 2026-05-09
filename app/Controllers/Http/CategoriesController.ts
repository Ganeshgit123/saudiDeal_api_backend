import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { CategoryDomain } from "../../Domain";
import { CategoryRepo } from "../../Repositories";
import { SUCCESS } from "../../Data/language";
import Category from 'App/Models/Category'

export default class CategoriesController {

    public async get({ request }: HttpContextContract) {

        const language = request.header('language') || 'en'

        let categoryList = CategoryDomain.createFromArrOfObject(
            await CategoryRepo.get('')
        )
        if (categoryList.length != 0) {
            categoryList.map((el) => {
                el.name = language == 'en' ? el.enName : el.arName
            })
        }
        return {
            success: true,
            data: categoryList,
        };
    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(Validators.CategoryValidator);

        const language = request.header('language') || 'en'
        const CategoryDetails = await CategoryRepo.create(payload, language);

        return {
            success: true,
            result: CategoryDomain.createFromObject(CategoryDetails),
            massage: SUCCESS.CATEGORY_CREATE[language]
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdatePost = request.all()

        const language = request.header('language') || 'en'
        await CategoryRepo.isEntryExist(params.id, language);

        const updateResult = CategoryDomain.createFromObject(
            await CategoryRepo.update(params.id, UpdatePost, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.CATEGORY_UPDATE[language]
        };
    }

    public async delete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'
        const result = await CategoryRepo.isEntryExist(params.id, language);

        await CategoryRepo.delete({ active: 0 }, result, language);
        return {
            success: true,
            massage: SUCCESS.CATEGORY_DELETE[language]
        };

    }

    public async adminGet({ request }: HttpContextContract) {
        const payload = request.all()

        return {
            success: true,
            data: CategoryDomain.createFromArrOfObject(
                await CategoryRepo.adminGet(payload.active)
            ),
        };
    }

    public async categoriesDelete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'

        const category = await Category.findOrFail(params.id)
        await category.delete()

        return {
            success: true,
            massage: SUCCESS.CATEGORY_DELETE[language]
        };

    }
}


