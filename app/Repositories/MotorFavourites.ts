import Exceptions from '../Exceptions'
import MotorFavourite from 'App/Models/MotorFavourite'
import { FAILURE } from "../Data/language";

export default class MotorFavouritesRepo {

    static async create(data: any, language) {
        await delete data.isFavourites

        const result = await MotorFavourite.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.FAQ_CREATE[language])
        return result
    }

    static async delete(productId: number, userId: number, language) {
        try {
            const result = await MotorFavourite.query().where('product_id', productId).where('userId', userId).delete()

            return result
        } catch (error) {
            throw Exceptions.conflict(FAILURE.FAVORITE_CONFLICT[language])
        }
    }

    static async get(userId, offset, limit, subscriptionIds) {
        const result = await MotorFavourite.query()
            .select('motor_favourites.id as favouritesId', 'motor_favourites.product_id as productId', 'motor_favourites.user_id as userId')
            .select('motor_posts.*')
            .innerJoin('motor_posts', 'motor_posts.id', 'motor_favourites.product_id')
            .where('motor_favourites.user_id', userId)
            .if(subscriptionIds, (query) =>
                query.whereIn('motor_posts.subscription_id', subscriptionIds))
            // .whereIn('motor_posts.user_id', userList)
            .if(offset && limit, (query) => {
                query.forPage(offset, limit)
            })
        // .where('Motor_favourites.user_id', userId)        
        return result
    }

    static async getFavorites(userId) {
        const result = await MotorFavourite.query()
            .where('user_id', userId)
        return result
    }

    static async isEntryExist(userId: number, productId, language) {

        const result = await MotorFavourite.query()
            .where('user_id', userId)
            .where('product_id', productId)

        if (!result) throw Exceptions.notFound(FAILURE.FAVORITE_CONFLICT[language])
        return result
    }
}
