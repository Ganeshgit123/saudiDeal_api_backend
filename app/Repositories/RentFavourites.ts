import Exceptions from '../Exceptions'
import RentFavourite from 'App/Models/RentFavourite'
import { FAILURE } from "../Data/language";

export default class RentFavouritesRepo {

    static async create(data: any, language) {
        await delete data.isFavourites

        const result = await RentFavourite.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.FAQ_CREATE[language])
        return result
    }

    static async delete(productId: number, userId: number, language) {
        try {
            const result = await RentFavourite.query().where('product_id', productId).where('userId', userId).delete()

            return result
        } catch (error) {
            throw Exceptions.conflict(FAILURE.FAVORITE_CONFLICT[language])
        }
    }

    static async get(userId, offset, limit, subscriptionIds) {
        const result = await RentFavourite.query()
            .select('rent_favourites.id as favouritesId')
            .select('rents.*')
            .innerJoin('rents', 'rents.id', 'rent_favourites.product_id')
            // .whereIn('rents.user_id', userList)
            .if(userId, (query) =>
                query.where('rent_favourites.user_id', userId))
            .if(subscriptionIds, (query) =>
                query.whereIn('rents.subscription_id', subscriptionIds))
            .if(offset && limit, (query) => {
                query.forPage(offset, limit)
            })
        // .if(guestUserId, (query) =>
        //     query.where('rent_favourites.guest_user_id', guestUserId))
        // .where('rent_favourites.user_id', userId)
        return result
    }

    static async getFavorites(userId) {
        const result = await RentFavourite.query()
            .where('user_id', userId)
        return result
    }

    static async isEntryExist(userId: number, productId, language) {

        const result = await RentFavourite.query()
            .where('user_id', userId)
            .where('product_id', productId)

        if (!result) throw Exceptions.notFound(FAILURE.FAVORITE_CONFLICT[language])
        return result
    }
}
