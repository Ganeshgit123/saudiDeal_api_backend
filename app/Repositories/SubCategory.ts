import Exceptions from '../Exceptions'
import SubCategory from 'App/Models/SubCategory'
import { FAILURE } from "../Data/language";

export default class SubCategoryRepo {
    static async create(data: any, language: string) {
        const result = await SubCategory.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.SUBCATEGORY_CREATE[language])
        return result
    }

    static async update(id: number, data: any, language: string) {
        try {
            const subCategory = await SubCategory.findOrFail(id)
            subCategory.merge(data)
            await subCategory.save()

            return subCategory
        } catch (error) {
            throw Exceptions.conflict(FAILURE.SUBCATEGORY_CONFLICT[language])
        }
    }

    static async get(subCategoryId) {
        const result = await SubCategory.query()
            .where('active', 1)
            .if(subCategoryId, (query) =>
                query.where('categoryId', subCategoryId))
        return result
    }

    static async delete(data: any, Category, language: string) {
        Category.active = data.active
        await Category.save()
        if (!Category.$isPersisted)
            throw Exceptions.notFound(FAILURE.SUBCATEGORY_DELETE_CONFLICT[language])
        return Category
    }

    static async isEntryExist(id: number, language: string) {
        const result = await SubCategory.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.SUBCATEGORY_CONFLICT[language])
        return result
    }

    static async adminGet(active) {
        const result = await SubCategory.query()
            .if(active, (query) =>
                query.where('active', active))
        return result
    }

}
