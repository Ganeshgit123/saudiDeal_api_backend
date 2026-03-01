import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RentDomain, SubscriptionListsDomain } from "../../Domain";
import { RentRepo, RentFavouritesRepo, NotificationRepo, SubscriptionListRepo } from "../../Repositories";
import Validators from "../../Validators";
import { SUCCESS } from "../../Data/language";
import Rent from 'App/Models/Rent'

export default class RentsController {

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
        let favorites: any = await RentFavouritesRepo.getFavorites(loginUserId)

        if (favorites.length !== 0 && productDetails.length !== 0) {

            return productDetails = await this.mergeArray(productDetails, favorites)

        } else {
            return productDetails
        }
    }

    // public async get() {

    //        return {
    //            success: true,
    //            data: RentDomain.createFromArrOfObject(
    //                await RentRepo.get()
    //            ),
    //        };
    //    }

    public async getRentPostCount({ request }: HttpContextContract) {
        const payload = request.all()
        let type = payload.type || 'SELL'
        let data = SubscriptionListsDomain.createFromArrOfObject(
            await SubscriptionListRepo.checkSubscriptionList('', 'PROPERTY')
        )
        let subscriptionIds: any = []
        if (data.length == 0) {
            return {
                success: true,
                data: [],
            };
        } else {
            await data.map(async (el) => {
                subscriptionIds.push(el.id)
            })
        }
        let rentPostCount = await RentRepo.getRentPostCount(type, subscriptionIds)
        return {
            success: true,
            data: rentPostCount,
        };
    }

    public async get({ request }: HttpContextContract) {
        const payload = request.all()

        const rentPostId = payload.rentPostId
        const isApprove = payload.isApprove
        const active = payload.active
        const offset = payload.offset ? Number(payload.offset) : 1;
        const limit = payload.offset ? Number(payload.limit) : 100;

        // let data = SubscriptionListsDomain.createFromArrOfObject(
        //     await SubscriptionListRepo.checkSubscriptionList('', 'RENT')
        // )
        // let subscriptionIds: any = []
        // if (data.length == 0) {
        //     return {
        //         success: true,
        //         data: [],
        //     };
        // } else {
        //     await data.map(async (el) => {
        //         subscriptionIds.push(el.id)
        //     })
        // }

        const userId = request.header('userId') || ''
        let rentPost = RentDomain.createFromArrOfObject(
            await RentRepo.myRentGet(userId, rentPostId, isApprove, active, offset, limit, '')
        )

        if (rentPost.length != 0) {
            rentPost.map(async (el) => {
                if (el.subscriptionId != 0) {

                    let data = SubscriptionListsDomain.createFromArrOfObject(
                        await SubscriptionListRepo.checkSubscriptionListWithId(el.subscriptionId, 'PROPERTY')
                    )
                    if (data.length == 0) {
                        el.expiry = 1
                    } else {
                        el.expiry = 0
                    }

                } else {
                    el.expiry = 1
                }
            })
        }
        rentPost = await this.getRentFavourites(userId, rentPost)

        return {
            success: true,
            data: rentPost,
        };
    }

    public async getAllPost({ request }: HttpContextContract) {
        const payload = request.all()
        const userId = request.header('userId') || ''
        // const categoryId = payload.categoryId || ''

        let orderbyColumn: string = payload.orderbyColumn ? String(payload.orderbyColumn) : 'id'
        let orderbyValue: string = payload.orderbyValue ? String(payload.orderbyValue) : 'DESC'
        const offset = payload.offset ? Number(payload.offset) : 1;
        const limit = payload.offset ? Number(payload.limit) : 25;

        let data = SubscriptionListsDomain.createFromArrOfObject(
            await SubscriptionListRepo.checkSubscriptionList('', 'PROPERTY')
        )
        let subscriptionIds: any = []
        if (data.length == 0) {
            return {
                success: true,
                data: [],
            };
        } else {
            await data.map(async (el) => {
                subscriptionIds.push(el.id)
            })
        }

        let rentPost = RentDomain.createFromArrOfObject(
            await RentRepo.getAllPost(userId, orderbyColumn, orderbyValue, payload, offset, limit, subscriptionIds)
        )
        let rentPostWithoutPagination = RentDomain.createFromArrOfObject(
            await RentRepo.getAllPost(userId, orderbyColumn, orderbyValue, payload, undefined, undefined, subscriptionIds)
        )
        let rentPostCount = rentPostWithoutPagination.length

        // if (rentPost.length != 0) {
        //     rentPost.map(async (el) => {
        //         let data = SubscriptionListsDomain.createFromArrOfObject(
        //             await SubscriptionListRepo.checkSubscriptionList(el.userId, 'PROPERTY')
        //         )
        //         console.log(data,'data')
        //         if (data.length == 0) {
        //             el.expiry = 1
        //         } else {
        //             el.expiry = 0
        //         }
        //     })
        // }
        rentPost = await this.getRentFavourites(userId, rentPost)

        return {
            success: true,
            data: rentPost,
            rentPostCount
        };
    }

    public async create({ request }: HttpContextContract) {

        const payload = await request.validate(Validators.RentValidator);

        const userId = request.header('userId') || 0
        // const payload = await request.validate(Validators.BrandValidator);

        payload.userId = Number(userId)

        // let payload = request.all();

        const language = request.header('language') || 'en'
        const RentDetails = await RentRepo.create(payload, language);

        return {
            success: true,
            result: RentDomain.createFromObject(RentDetails),
            massage: SUCCESS.RENT_CREATE[language]
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdatePost = request.all()

        const rejectReason = UpdatePost.rejectReason || ''
        const language = request.header('language') || 'en'
        await RentRepo.isEntryExist(params.id, language);
        const userId = request.header('userId') || ''

        if (UpdatePost.updateStatusLevel == 4 && UpdatePost.newPost) {
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
        }

        const updateResult = RentDomain.createFromObject(
            await RentRepo.update(params.id, UpdatePost, language)
        );

        if (UpdatePost.isApprove == 1) {
            const notificationData = {
                "productId": updateResult.id,
                "userId": updateResult.userId,
                "type": updateResult.type,
                "message": `${updateResult.type} post approved.`
            }
            await NotificationRepo.create(notificationData, language)

            // let SubscriptionLists = SubscriptionListsDomain.createFromArrOfObject(
            //     await SubscriptionListRepo.get(updateResult.userId, 0)
            // )

            // let remainingPost = SubscriptionLists[0].remainingPost
            // remainingPost = remainingPost - 1
            // const UpdatePost = {
            //     remainingPost
            // }

            // SubscriptionListsDomain.createFromObject(
            //     await SubscriptionListRepo.update(SubscriptionLists[0].id, UpdatePost, language)
            // );

        }
        if (UpdatePost.isApprove == 2) {
            const notificationData = {
                "productId": updateResult.id,
                "userId": updateResult.userId,
                "type": updateResult.type,
                "message": `${updateResult.type} post rejected. Reason: ${rejectReason}`
            }
            await NotificationRepo.create(notificationData, language)
        }

        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.RENT_UPDATE[language]
        };
    }

    public async delete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'
        const result = await RentRepo.isEntryExist(params.id, language);

        await RentRepo.delete({ active: 0 }, result, language);
        return {
            success: true,
            massage: SUCCESS.RENT_DELETE[language]
        };

    }

    public async rentDelete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'

        const address = await Rent.findOrFail(params.id)
        await address.delete()

        return {
            success: true,
            massage: SUCCESS.DELETE_RENT[language]
        };

    }

    public async adminGet({ request }: HttpContextContract) {
        const payload = request.all()
        const offset = payload.offset ? Number(payload.offset) : 1;
        const limit = payload.offset ? Number(payload.limit) : 25;

        return {
            success: true,
            data: RentDomain.createFromArrOfObject(
                await RentRepo.adminGet(payload.active, payload.rentId, offset, limit)
            ),
        };
    }

    public async adminExpiryGet({ request }: HttpContextContract) {
        const payload = request.all()
        const offset = payload.offset ? Number(payload.offset) : 1;
        const limit = payload.offset ? Number(payload.limit) : 25;
        let userList = await SubscriptionListsDomain.createFromArrOfObject(
            await SubscriptionListRepo.checkSubscriptionList('', 'PROPERTY')
        )

        if (userList.length == 0) {
            // let motorPost = RentDomain.createFromArrOfObject(
            //     await RentRepo.checkSubscriptionExpriyList(payload.active, payload.rentId, offset, limit, '')
            // )
            return {
                success: true,
                data: [],

            };

        } else {
            let userIds: any = []
            await userList.map(async (el) => {
                userIds.push(el.Id)
            })
            let motorPost = RentDomain.createFromArrOfObject(
                await RentRepo.adminGetExpiryPost(payload.active, payload.rentId, offset, limit, userIds)
            )

            return {
                success: true,
                data: motorPost,

            };
        }
    }
}
