import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { FavouritesDomain } from "../../Domain";
import { FavouritesRepo } from "../../Repositories";
import { SUCCESS } from "../../Data/language";

export default class FavouritesController {

    public async favourites({ request }: HttpContextContract) {
        const payload = await request.validate(Validators.FavouriteValidator);
        const language = request.header('language') || 'en'
        const userId: any = request.header('userId') || 0
        const guestUserId: any = request.header('guestUserId') || ''

        payload["userId"] = userId
        payload["guestUserId"] = guestUserId

        const isEntryExist = await FavouritesRepo.isEntryExist(userId, payload.productId, language)

        if (isEntryExist.length == 0) {

            if (payload.isFavourites == true) {

                const FavoritesDetails = await FavouritesRepo.create(payload, language);

                return {
                    success: true,
                    result: FavouritesDomain.createFromObject(FavoritesDetails),
                    massage: SUCCESS.FAVORITES[language]
                };

            } else {
                return {
                    success: false,
                    massage: SUCCESS.FAVORITES_NOT_EXITS[language]
                };
            }
        } else {

            if (payload.isFavourites == false) {

                FavouritesDomain.createFromObject(
                    await FavouritesRepo.delete(payload.productId, userId, language)
                );
                return {
                    success: true,
                    massage: SUCCESS.UNFAVORITES[language]
                };
            } else {
                return {
                    success: false,
                    massage: SUCCESS.ALREADY_FAVORITES[language]
                };
            }
        }
    }

    public async get({ request }: HttpContextContract) {

        const userId: any = request.header('userId') || ''
        const guestUserId: any = request.header('guestUserId') || ''
        // let userId: any = loginUserId ?  loginUserId: guestUserId

        let result = FavouritesDomain.createFromArrOfObject(
            await FavouritesRepo.get(userId, guestUserId)
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
