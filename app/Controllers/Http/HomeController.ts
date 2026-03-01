import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Validators from "../../Validators";
import {
    MotorViewedProductDomain, RentViewedProductDomain, MotorPostDomain, RentDomain,
    SubscriptionListsDomain
} from "../../Domain";
import {
    MotorViewedProductsRepo, RentViewedProductsRepo, MotorpostRepo, RentRepo, RentFavouritesRepo,
    MotorFavouritesRepo, SubscriptionListRepo
} from "../../Repositories";
// import { SUCCESS } from "../../Data/language";
// import Env from '@ioc:Adonis/Core/Env'

export default class HomeController {

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

    public setExpiry = async (post: any, type) => {
        if (post.length != 0) {
            post.map(async (el) => {
                let data = SubscriptionListsDomain.createFromArrOfObject(
                    await SubscriptionListRepo.checkSubscriptionList(el.userId, type)
                )
                if (data.length == 0) {
                    el.expiry = 1
                } else {
                    el.expiry = 0
                }
            })
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
    public getMotorFavouritesRepo = async (loginUserId, productDetails: any) => {
        let favorites: any = await MotorFavouritesRepo.getFavorites(loginUserId)

        if (favorites.length !== 0 && productDetails.length !== 0) {

            return productDetails = await this.mergeArray(productDetails, favorites)

        } else {
            return productDetails
        }
    }

    public async get({ request }: HttpContextContract) {
        const payload = request.all()
        const userId = request.header('userId') || ''

        let motorViewedProducts: any = []
        let rentViewedProducts: any = []

        let motorViewedData = SubscriptionListsDomain.createFromArrOfObject(
            await SubscriptionListRepo.checkSubscriptionList('', 'MOTOR')
        )

        let motorViewedDataSubscriptionIds: any = []
        if (motorViewedData.length) {
            await motorViewedData.map(async (el) => {
                motorViewedDataSubscriptionIds.push(el.id)
            })
        }
        
        if (userId) {
            motorViewedProducts = MotorViewedProductDomain.createFromArrOfObject(
                await MotorViewedProductsRepo.get(userId, motorViewedDataSubscriptionIds)
            )
            // motorViewedProducts = await this.setExpiry(motorViewedProducts, 'MOTOR')

            let rentViewedData = SubscriptionListsDomain.createFromArrOfObject(
                await SubscriptionListRepo.checkSubscriptionList('', 'RENT')
            )
    
            let rentViewedDataSubscriptionIds: any = []
            if (rentViewedData.length) {
                await rentViewedData.map(async (el) => {
                    rentViewedDataSubscriptionIds.push(el.id)
                })
            }
            
            rentViewedProducts = RentViewedProductDomain.createFromArrOfObject(
                await RentViewedProductsRepo.get(userId, rentViewedDataSubscriptionIds)
            )
            // rentViewedProducts = await this.setExpiry(rentViewedProducts, 'PROPERTY')

        }

        let motorpostsData = SubscriptionListsDomain.createFromArrOfObject(
            await SubscriptionListRepo.checkSubscriptionList('', 'MOTOR')
        )

        let motorpostSubscriptionIds: any = []
        if (motorpostsData.length) {
            await motorpostsData.map(async (el) => {
                motorpostSubscriptionIds.push(el.id)
            })
        }

        let motorposts = MotorPostDomain.createFromArrOfObject(
            await MotorpostRepo.getAllPost('', "id", 'DESC', payload, '', '', motorpostSubscriptionIds)
        )
        // motorposts = await this.setExpiry(motorposts, 'MOTOR')

        let rentPostData = SubscriptionListsDomain.createFromArrOfObject(
            await SubscriptionListRepo.checkSubscriptionList('', 'RENT')
        )

        let rentPostSubscriptionIds: any = []
        if (rentPostData.length) {
            await rentPostData.map(async (el) => {
                rentPostSubscriptionIds.push(el.id)
            })
        }
        
        let rents = RentDomain.createFromArrOfObject(
            await RentRepo.getAllPost('', "id", 'DESC', payload, '', '', rentPostSubscriptionIds)
        )
        // rents = await this.setExpiry(rents, 'PROPERTY')

        rentViewedProducts = await this.getRentFavourites(userId, rentViewedProducts)
        motorViewedProducts = await this.getMotorFavouritesRepo(userId, motorViewedProducts)

        rents = await this.getRentFavourites(userId, rents)
        motorposts = await this.getMotorFavouritesRepo(userId, motorposts)

        const language = request.header('language') || 'en'

        let viewedProducts: any = []
        let popularProducts: any = []


        let motorViewedProductsList
        if (motorViewedProducts.length != 0) {
            motorViewedProductsList = {
                "type": "motorViewedProductsList",
                "title": language == 'en' ? "Motor Viewed Products" : "اعلى المبيعات",
                "data": motorViewedProducts
            }
            viewedProducts.push(motorViewedProductsList)

        }

        let rentViewedProductList
        if (rentViewedProducts.length != 0) {
            rentViewedProductList = {
                "type": "rentViewedProducts",
                "title": language == 'en' ? "Rent Viewed Products" : "افضل مبيعات",
                "data": rentViewedProducts
            }
            viewedProducts.push(rentViewedProductList)

        }

        let motorpostsList
        if (motorposts.length != 0) {
            motorpostsList = {
                "type": "PopularMotor",
                "title": language == 'en' ? "Popular in Motor post" : "تخفيض المنتج",
                "data": motorposts
            }
            popularProducts.push(motorpostsList)

        }

        let rentsList
        if (rents.length != 0) {
            // await rents.map((data) => {
            //     if (language == 'en') {
            //         data.name = data.enName
            //         data.specification = data.enSpecification
            //         data.productOverview = data.enProductOverview
            //         data.serviceNotes = data.enServiceNotes
            //     } else {
            //         data.name = data.arName
            //         data.specification = data.arSpecification
            //         data.productOverview = data.arProductOverview
            //         data.serviceNotes = data.arServiceNotes
            //     }
            // })
            rentsList = {
                "type": "PopularRents&sale",
                "title": language == 'en' ? "Popular in Used Cars for Sale" : "المشاهدات الأخيرة",
                "data": rents
            }
            popularProducts.push(rentsList)

        }


        return {
            success: true,
            error: false,
            message: "data loaded",
            viewedProducts,
            popularProducts
        }
    };
}
