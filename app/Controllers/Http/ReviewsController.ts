import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { SUCCESS } from "../../Data/language";
import { ReviewsDomain } from "../../Domain";
import { ReviewRepo } from "../../Repositories";
import Review from 'App/Models/Review'

export default class ReviewsController {

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(Validators.ReviewValidator);
        const language = request.header('language') || 'en'

        await ReviewRepo.create(payload, language);
        // let rating = await ReviewRepo.getRatingAvg(payload.productId);
        
        // let productRating = Math.round(rating[0].$extras.avgRating * 100) / 100
        
        // await ProductRepo.update(payload.productId, { "rating": productRating }, language)

        return {
            success: true,
            massage: SUCCESS.ADD_REVIEW[language]
        };
    }

    public async get({ params }: HttpContextContract) {
        return {
            success: true,
            data: ReviewsDomain.createFromArrOfObject(
                await ReviewRepo.get(params.id)
            ),
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdateComment = request.all()

        const language = request.header('language') || 'en'
        await ReviewRepo.isEntryExist(params.id, language);

        const updateResult = ReviewsDomain.createFromObject(
            await ReviewRepo.update(params.id, UpdateComment, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.UPDATE_COMMENT[language]
        };
    }

    public async delete({ request, params }: HttpContextContract) {

        const language = request.header('language') || 'en'
        const result = await ReviewRepo.isEntryExist(params.id, language);

        await ReviewRepo.delete(result.productId, result.userId, language);
        return {
            success: true,
            massage: SUCCESS.DELETE_REVIEW[language]
        }

    }

    public async reviewDelete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'

        const address = await Review.findOrFail(params.id)
        await address.delete()

        return {
            success: true,
            massage: SUCCESS.DELETE_REVIEW[language]
        };

    }
}
