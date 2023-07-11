import Exceptions from '../Exceptions'
import Rent from 'App/Models/Rent'
import { FAILURE } from "../Data/language";

export default class RentRepo {

    static async get(userId, rentPostId) {
        const result = await Rent.query().where('active', 1)
            .if(userId, (query) =>
                query.where('rents.user_id', userId))
            .if(rentPostId, (query) =>
                query.where('rents.id', rentPostId))
        return result
    }

    static async getAllPost(userId) {
        const result = await Rent.query().where('rents.active', 1)
            .select('rents.*')
            .select('cities.city as cityName')
            .select('provinces.name as provincesName')
            .leftJoin('cities', 'rents.city_id', 'cities.id')
            .leftJoin('provinces', 'rents.province_id', 'provinces.id')
            .if(userId, (query) =>
                query.where('rents.user_id', userId))
        // .if(rentPostId, (query) =>
        //     query.where('rents.id', rentPostId))
        
        return result
    }

    static async create(data: any, language: string) {
        const result = await Rent.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.RENT_CREATE[language])
        return result
    }

    static async update(id: number, data: any, language: string) {
        console.log(data);
        try {
            const rent = await Rent.findOrFail(id)
            rent.merge(data)
            await rent.save()

            return rent
        } catch (error) {
            throw Exceptions.conflict(FAILURE.RENT_CONFLICT[language])
        }
    }

    static async delete(data: any, Rent, language: string) {
        Rent.active = data.active
        await Rent.save()
        if (!Rent.$isPersisted)
            throw Exceptions.notFound(FAILURE.RENT_DELETE_CONFLICT[language])
        return Rent
    }

    static async isEntryExist(id: number, language) {
        const result = await Rent.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.RENT_DELETE_CONFLICT[language])
        return result
    }

    static async adminGet(active, rentId) {
        const result = await Rent.query()
            .select('rents.*')
            .orderBy('rents.id', "desc")
            .if(active, (query) =>
                query.where('rents.active', active))
            .if(rentId, (query) =>
                query.where('rents.id', rentId))
        return result
    }

}
