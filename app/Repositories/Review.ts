import Exceptions from '../Exceptions'
import Review from 'App/Models/Review'
import { FAILURE } from "../Data/language";

export default class ReviewRepo {

    static async create(data: any, language: string) {
        await delete data.isFavorites
        await delete data.postUserId

        const result = await Review.create(data)

        if (!result) throw Exceptions.notFound(FAILURE.REVIEW_CREATE[language])
        return result
    }

    static async delete(postId: number, userId: number, language) {
        try {

            const result = await Review.query().where('postId', postId).where('userId', userId).delete()

            return result
        } catch (error) {
            throw Exceptions.conflict(FAILURE.REVIEW_DELETE_CONFLICT[language])
        }
    }

    static async get(postId) {

        const result = await Review.query()
            .select('reviews.id as id', 'reviews.review', 'reviews.rating', 'reviews.created_at', 'reviews.updated_at', 'reviews.product_id', 'reviews.user_id',
                'reviews.active', 'users.first_name', 'users.last_name', 'users.mobile_number')
            .innerJoin('users', 'reviews.user_id', 'users.id')
            .where('reviews.product_id', postId)

        return result
    }

    static async isEntryExist(id: number, language) {
        const result = await Review.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.REVIEW_DELETE_CONFLICT[language])
        return result
    }

    static async update(id: number, data: any, language) {
        try {
            const post = await Review.findOrFail(id)
            post.merge(data)
            await post.save()

            return post
        } catch (error) {
            throw Exceptions.conflict(FAILURE.REVIEW_DELETE_CONFLICT[language])
        }
    }

    static async getRatingAvg(productId) {
        const result = await Review.query()
            .where('product_id', productId)
            .avg('rating as avgRating')
        return result
    }
}
