import Exceptions from '../Exceptions'
import Favourite from 'App/Models/Favourite'
import { FAILURE } from "../Data/language";

export default class FavouritesRepo {

    static async create(data: any, language) {
        await delete data.isFavourites

        const result = await Favourite.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.FAQ_CREATE[language])
        return result
    }

    static async delete(productId: number, userId: number, language) {
        try {
            const result = await Favourite.query().where('product_id', productId).where('userId', userId).delete()

            return result
        } catch (error) {
            throw Exceptions.conflict(FAILURE.FAVORITE_CONFLICT[language])
        }
    }

    static async get(userId, guestUserId) {
        const result = await Favourite.query()
            .select('favourites.id as favouritesId')
            .select('products.*')
            .select('brands.name as brandName')
            .select('categories.name as categoryName')
            .select('sub_categories.sub_category_name as subCategoryName')
            .innerJoin('products', 'products.id', 'favourites.product_id')
            .innerJoin('brands', 'products.brand_id', 'brands.id')
            .innerJoin('categories', 'products.category_id', 'categories.id')
            .innerJoin('sub_categories', 'products.sub_category_id', 'sub_categories.id')
            .if(userId, (query) =>
                query.where('favourites.user_id', userId))
            .if(guestUserId, (query) =>
                query.where('favourites.guest_user_id', guestUserId))
        // .where('favourites.user_id', userId)
        return result
    }

    static async getFavorites(userId) {
        const result = await Favourite.query()
            .where('user_id', userId)
        return result
    }

    static async isEntryExist(userId: number, productId, language) {

        const result = await Favourite.query()
            .where('user_id', userId)
            .where('product_id', productId)

        if (!result) throw Exceptions.notFound(FAILURE.FAVORITE_CONFLICT[language])
        return result
    }
}
