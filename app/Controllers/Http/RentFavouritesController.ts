import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { RentFavouritesDomain } from "../../Domain";
import { RentFavouritesRepo } from "../../Repositories";
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

        const userId: any = request.header('userId') || ''
        // const guestUserId: any = request.header('guestUserId') || ''
        // let userId: any = loginUserId ?  loginUserId: guestUserId

        let result = RentFavouritesDomain.createFromArrOfObject(
            await RentFavouritesRepo.get(userId)
        )
        await result.map((el) => {
            el.isFavorites = 1
        })

        return {
            success: true,
            data: result,
        };
    }
}
