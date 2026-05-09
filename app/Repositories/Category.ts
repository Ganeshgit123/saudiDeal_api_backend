import Exceptions from '../Exceptions'
import Category from 'App/Models/Category'
import { FAILURE } from "../Data/language";

export default class CategoryRepo {
    static async create(data: any, language: string) {
        const result = await Category.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.CATEGORY_CREATE[language])
        return result
    }

    static async update(id: number, data: any, language: string) {
        try {
            const category = await Category.findOrFail(id)
            category.merge(data)
            await category.save()

            return Category
        } catch (error) {
            throw Exceptions.conflict(FAILURE.CATEGORY_CONFLICT[language])
        }
    }

    static async get(categoryId) {
        const result = await Category.query().where('active', 1)
            .if(categoryId, (query) =>
                query.where('id', categoryId))
        return result
    }

    static async delete(data: any, Category, language: string) {
        Category.active = data.active
        await Category.save()
        if (!Category.$isPersisted)
            throw Exceptions.notFound(FAILURE.CATEGORY_DELETE_CONFLICT[language])
        return Category
    }

    static async isEntryExist(id: number, language: string) {
        const result = await Category.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.CATEGORY_CONFLICT[language])
        return result
    }

    static async adminGet(active) {
        const result = await Category.query()
            .if(active, (query) =>
                query.where('active', active))
        return result
    }

}
