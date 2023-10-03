import Exceptions from '../Exceptions'
import RentCategory from 'App/Models/RentCategory'
import { FAILURE } from "../Data/language";

export default class RentCategoriesRepo {

    static async get(type) {
        const result = await RentCategory.query().where('active', 1)
            .if(type, (query) =>
                query.where('type', type))
        return result
    }

    static async create(data: any, language: string) {
        const result = await RentCategory.create(data)

        if (!result) throw Exceptions.notFound(FAILURE.RENT_CATEGORY_CREATE[language])
        return result
    }

    static async update(id: number, data: any, language: string) {
        try {
            const rent = await RentCategory.findOrFail(id)
            rent.merge(data)
            await rent.save()

            return rent
        } catch (error) {            
            throw Exceptions.conflict(FAILURE.RENT_CATEGORY_CONFLICT[language])
        }
    }

    static async delete(data: any, RentCategory, language: string) {
        RentCategory.active = data.active
        await RentCategory.save()
        if (!RentCategory.$isPersisted)
            throw Exceptions.notFound(FAILURE.RENT_CATEGORY_DELETE_CONFLICT[language])
        return RentCategory
    }

    static async isEntryExist(id: number, language) {
        const result = await RentCategory.query().where('id', id).first()        
        if (!result) throw Exceptions.notFound(FAILURE.RENT_CATEGORY_DELETE_CONFLICT[language])
        return result
    }

}
