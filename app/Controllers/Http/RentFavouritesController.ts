import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { RentFavouritesDomain, SubscriptionListsDomain } from "../../Domain";
import { RentFavouritesRepo, SubscriptionListRepo } from "../../Repositories";
import { SUCCESS } from "../../Data/language";

export default class RentFavouritesController {

    public async favourites({ request }: HttpContextContract) {
        const payload = await request.validate(Validators.RentFavouriteValidator);
        const language = request.header('language') || 'en'
        const userId: any = request.header('userId') || 0
        const guestUserId: any = request.header('guestUserId') || ''

        payload["userId"] = userId
        payload["guestUserId"] = guestUserId

        const isEntryExist = await RentFavouritesRepo.isEntryExist(userId, payload.productId, language)

        if (isEntryExist.length == 0) {

            if (payload.isFavourites == true) {

                const FavoritesDetails = await RentFavouritesRepo.create(payload, language);

                return {
                    success: true,
                    result: RentFavouritesDomain.createFromObject(FavoritesDetails),
                    massage: SUCCESS.RENTFAVORITES[language]
                };

            } else {
                return {
                    success: false,
                    massage: SUCCESS.RENTFAVORITES_NOT_EXITS[language]
                };
            }
        } else {

            if (payload.isFavourites == false) {

                await RentFavouritesRepo.delete(payload.productId, userId, language)
                return {
                    success: true,
                    massage: SUCCESS.RENTUNFAVORITES[language]
                };
            } else {
                return {
                    success: false,
                    massage: SUCCESS.RENTALREADY_FAVORITES[language]
                };
            }
        }
    }

    public async get({ request }: HttpContextContract) {
        const payload = request.all()

        const userId: any = request.header('userId') || ''
        // const guestUserId: any = request.header('guestUserId') || ''
        // let userId: any = loginUserId ?  loginUserId: guestUserId
        const offset = payload.offset ? Number(payload.offset) : 1;
        const limit = payload.offset ? Number(payload.limit) : 25;
        // let SubscriptionList = SubscriptionListsDomain.createFromArrOfObject(
        //     await SubscriptionListRepo.checkSubscriptionList(userId, 'PROPERTY')
        // )
        // let userList: any = []
        // if (SubscriptionList.length != 0) {
        //     SubscriptionList.map(async (el) => {
        //         userList.push(el.userId)
        //     })
        // }

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

        let result = RentFavouritesDomain.createFromArrOfObject(
            await RentFavouritesRepo.get(userId, offset, limit, subscriptionIds)
        )

        // if (result.length != 0) {
        //     result.map(async (el) => {
        //         el.isFavorites = 1
        //         let data = SubscriptionListsDomain.createFromArrOfObject(
        //             await SubscriptionListRepo.checkSubscriptionList(el.userId, 'PROPERTY')
        //         )
        //         if (data.length == 0) {
        //             el.expiry = 1
        //         } else {
        //             el.expiry = 0
        //         }
        //     })
        // }

        // await result.map((el) => {
        //     el.isFavorites = 1
        // })

        return {
            success: true,
            data: result,
        };
    }
}
