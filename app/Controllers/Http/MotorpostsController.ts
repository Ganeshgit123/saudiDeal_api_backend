import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Validators from "../../Validators";
import { MotorPostDomain, SubscriptionListsDomain } from "../../Domain";
import { MotorpostRepo, MotorFavouritesRepo, SubscriptionListRepo } from "../../Repositories";
import { SUCCESS } from "../../Data/language";

export default class MotorpostsController {

    public mergeArray = async (post: any, favorites: any) => {
        let postsLen = post.length
        let favoritesLen = favorites.length

        for (let i = 0; i < favoritesLen; i++) {
            let item = favorites[i]

            for (let j = 0; j < postsLen; j++) {
                if (item.productId === post[j].id) {
                    post[j].isFavorites = 1
                } else {
                    post[j].isFavorites = 0
                }
            }
        }
        return post
    }

    public getRentFavourites = async (loginUserId, productDetails: any) => {
        let favorites: any = await MotorFavouritesRepo.getFavorites(loginUserId)

        if (favorites.length !== 0 && productDetails.length !== 0) {

            return productDetails = await this.mergeArray(productDetails, favorites)

        } else {
            return productDetails
        }
    }

    public async getMotorPostCount() {
        let motorPostCount = await MotorpostRepo.getMotorPostCount()
        return {
            success: true,
            data: motorPostCount,
        };
    }

    public async get({ request }: HttpContextContract) {
        const payload = request.all()

        const motorPostId = payload.motorPostId
        const userId = request.header('userId') || ''

        let motorPost = MotorPostDomain.createFromArrOfObject(
            await MotorpostRepo.get(userId, motorPostId)
        )
        motorPost = await this.getRentFavourites(userId, motorPost)

        return {
            success: true,
            data: motorPost,
        };
    }

    public async getAllPost({ request }: HttpContextContract) {
        const payload = request.all()

        const userId = request.header('userId') || ''
        let orderbyColumn: string = payload.orderbyColumn ? String(payload.orderbyColumn) : 'id'
        let orderbyValue: string = payload.orderbyValue ? String(payload.orderbyValue) : 'DESC'

        let motorPost = MotorPostDomain.createFromArrOfObject(
            await MotorpostRepo.getAllPost(userId, orderbyColumn, orderbyValue)
        )
        motorPost = await this.getRentFavourites(userId, motorPost)

        return {
            success: true,
            data: motorPost,
        };
    }

    public async create({ request }: HttpContextContract) {
        let payload = request.all()
        const userId = request.header('userId') || ''

        payload.userId = userId
        const language = request.header('language') || 'en'
        const motorPostDetails = await MotorpostRepo.create(payload, language);
        let SubscriptionLists = SubscriptionListsDomain.createFromArrOfObject(
            await SubscriptionListRepo.get(userId, 0)
        )
        if (SubscriptionLists.length == 0) {
            return {
                success: true,
                massage: "you don't have Subscription plan"
            }

        } else {
            let remainingPost = SubscriptionLists[0].remainingPost
            remainingPost = remainingPost - 1
            const UpdatePost = {
                remainingPost
            }

            SubscriptionListsDomain.createFromObject(
                await SubscriptionListRepo.update(SubscriptionLists[0].id, UpdatePost, language)
            );
        }

        return {
            success: true,
            result: MotorPostDomain.createFromObject(motorPostDetails),
            massage: SUCCESS.MOTOR_POST_CREATE[language]
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdatePost = request.all()

        const language = request.header('language') || 'en'
        await MotorpostRepo.isEntryExist(params.id, language);

        const updateResult = MotorPostDomain.createFromObject(
            await MotorpostRepo.update(params.id, UpdatePost, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.MOTOR_POST_UPDATE[language]
        };
    }

    public async delete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'
        const result = await MotorpostRepo.isEntryExist(params.id, language);

        await MotorpostRepo.delete({ active: 0 }, result, language);
        return {
            success: true,
            massage: SUCCESS.MOTOR_POST_DELETE[language]
        };

    }

    public async adminGet({ request }: HttpContextContract) {
        const payload = request.all()
        return {
            success: true,
            data: MotorPostDomain.createFromArrOfObject(
                await MotorpostRepo.adminGet(payload.active, payload.motorPostId)
            ),
        };
    }
}

