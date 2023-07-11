import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { SubCategoryDomain } from "../../Domain";
import { SubCategoryRepo } from "../../Repositories";
import { SUCCESS } from "../../Data/language";
import SubCategory from 'App/Models/SubCategory'

export default class SubCategoriesController {

    public async get({ request }: HttpContextContract) {
        const payload = request.all()
        const categoryId = payload.categoryId || ''        
        const language = request.header('language') || 'en'

        let subCategoryList = SubCategoryDomain.createFromArrOfObject(
            await SubCategoryRepo.get(categoryId)
        )
        if (subCategoryList.length != 0) {
            subCategoryList.map((el) => {
                el.subCategoryName = language == 'en' ? el.enSubCategoryName : el.arSubCategoryName
            })
        }
        return {
            success: true,
            data: subCategoryList,
        };
    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(Validators.SubCategoryValidator);

        const language = request.header('language') || 'en'
        const CategoryDetails = await SubCategoryRepo.create(payload, language);

        return {
            success: true,
            result: SubCategoryDomain.createFromObject(CategoryDetails),
            massage: SUCCESS.SUBCATEGORY_CREATE[language]
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdatePost = request.all()

        const language = request.header('language') || 'en'
        await SubCategoryRepo.isEntryExist(params.id, language);

        const updateResult = SubCategoryDomain.createFromObject(
            await SubCategoryRepo.update(params.id, UpdatePost, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.SUBCATEGORY_UPDATE[language]
        };
    }

    public async delete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'
        const result = await SubCategoryRepo.isEntryExist(params.id, language);

        await SubCategoryRepo.delete({ active: 0 }, result, language);
        return {
            success: true,
            massage: SUCCESS.SUBCATEGORY_DELETE[language]
        };

    }

    public async adminGet({ request }: HttpContextContract) {
        const payload = request.all()

        return {
            success: true,
            data: SubCategoryDomain.createFromArrOfObject(
                await SubCategoryRepo.adminGet(payload.active)
            ),
        };
    }

    public async categoriesDelete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'

        const category = await SubCategory.findOrFail(params.id)
        await category.delete()

        return {
            success: true,
            massage: SUCCESS.SUBCATEGORY_DELETE[language]
        };

    }
}



