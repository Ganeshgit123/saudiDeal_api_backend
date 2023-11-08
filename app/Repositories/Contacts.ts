import Exceptions from '../Exceptions'
import Contact from 'App/Models/Contact'
import { FAILURE } from "../Data/language";

export default class ContactRepo {
    static async create(data: any, language: string) {
        const result = await Contact.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.BRAND_CREATE[language])
        return result
    }

    static async get(brandId, type) {
        const result = await Contact.query()
            .if(brandId, (query) =>
                query.where('id', brandId))
            .if(type, (query) =>
                query.where('type', type))
            .where('active', 1)
        return result
    }

    static async adminGet(offset, limit) {
        const result = await Contact.query()
            .if(offset && limit, (query) => {
                query.forPage(offset, limit)
            })
        return result
    }

}