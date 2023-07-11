
export default class RentFavouritesDomain {
    public readonly id: number
    public readonly productId: number
    public readonly userId: number
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly favouritesId: number
    public readonly price: string
    public readonly areaInSqmt: string
    public readonly widthInMtr: string
    public readonly lengthInMtr: string
    public readonly title: string
    public readonly phoneNumber: string
    public readonly ownerType: string
    public readonly rentalTerm: string
    public readonly streetLength: string
    public readonly noBedrooms: string
    public readonly noBathrooms: string
    public readonly noFloors: string
    public readonly provinceId: number
    public readonly cityId: number
    public readonly location: string
    public readonly images1: string
    public readonly description: string
    public readonly propetyType: string
    public readonly furnished: boolean
    public readonly kitchen: boolean
    public readonly garage: boolean
    public readonly elevator: boolean
    public readonly waterSupply: boolean
    public readonly electricitySupply: boolean
    public readonly type: string
    public readonly isApprove: boolean
    public readonly rejectReason: string
    public readonly categoryId: number
    public readonly updateStatusLevel: number
    public readonly image: string
    public readonly features: string
    public readonly noLivingRooms: string
    public readonly propertyAge: string
    public readonly isFavorites: number

    private constructor(id: number, productId: number, userId: number, createdAt: string, updatedAt: string, favouritesId: number, price: string, areaInSqmt: string, widthInMtr: string, lengthInMtr: string, title: string, phoneNumber: string, ownerType: string, rentalTerm: string, streetLength: string, noBedrooms: string, noBathrooms: string, noFloors: string, provinceId: number, cityId: number, location: string, images1: string, description: string, propetyType: string, furnished: boolean, kitchen: boolean, garage: boolean, elevator: boolean, waterSupply: boolean, electricitySupply: boolean, type: string, isApprove: boolean, rejectReason: string, categoryId: number, updateStatusLevel: number, image: string, features: string, noLivingRooms: string, propertyAge: string,
        isFavorites: number) {

        this.id = id
        this.productId = productId
        this.userId = userId
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.favouritesId = favouritesId
        this.price = price
        this.areaInSqmt = areaInSqmt
        this.widthInMtr = widthInMtr
        this.lengthInMtr = lengthInMtr
        this.title = title
        this.phoneNumber = phoneNumber
        this.ownerType = ownerType
        this.rentalTerm = rentalTerm
        this.streetLength = streetLength
        this.noBedrooms = noBedrooms
        this.noBathrooms = noBathrooms
        this.noFloors = noFloors
        this.provinceId = provinceId
        this.cityId = cityId
        this.location = location
        this.images1 = images1
        this.description = description
        this.propetyType = propetyType
        this.furnished = furnished
        this.kitchen = kitchen
        this.garage = garage
        this.elevator = elevator
        this.waterSupply = waterSupply
        this.electricitySupply = electricitySupply
        this.type = type
        this.isApprove = isApprove
        this.rejectReason = rejectReason
        this.categoryId = categoryId
        this.updateStatusLevel = updateStatusLevel
        this.image = image
        this.features = features
        this.noLivingRooms = noLivingRooms
        this.propertyAge = propertyAge
        this.isFavorites = isFavorites
    }

    public static createFromObject(data: any) {
        return new RentFavouritesDomain(data.id, data.productId, data.userId, data.createdAt, data.updatedAt, data.$extras.favouritesId, data.$extras.price, data.$extras.areaInSqmt, data.$extras.widthInMtr, data.$extras.lengthInMtr, data.$extras.title, data.$extras.phoneNumber, data.$extras.ownerType, data.$extras.rentalTerm, data.$extras.streetLength, data.$extras.noBedrooms, data.$extras.noBathrooms, data.$extras.noFloors, data.$extras.provinceId, data.$extras.cityId, data.$extras.location, data.$extras.images1, data.$extras.description, data.$extras.propetyType, data.$extras.furnished, data.$extras.kitchen, data.$extras.garage, data.$extras.elevator, data.$extras.waterSupply, data.$extras.electricitySupply, data.$extras.type, data.$extras.isApprove, data.$extras.rejectReason, data.$extras.categoryId, data.$extras.updateStatusLevel, data.$extras.image, data.$extras.features, data.$extras.noLivingRooms, data.$extras.propertyAge,
            data.isFavorites)
    }

    public static createFromArrOfObject(data: any) {
        return data.map((el) => {
            return new RentFavouritesDomain(el.id, el.productId, el.userId, el.createdAt, el.updatedAt, el.$extras.favouritesId, el.$extras.price, el.$extras.areaInSqmt, el.$extras.widthInMtr, el.$extras.lengthInMtr, el.$extras.title, el.$extras.phoneNumber, el.$extras.ownerType, el.$extras.rentalTerm, el.$extras.streetLength, el.$extras.noBedrooms, el.$extras.noBathrooms, el.$extras.noFloors, el.$extras.provinceId, el.$extras.cityId, el.$extras.location, el.$extras.images1, el.$extras.description, el.$extras.propetyType, el.$extras.furnished, el.$extras.kitchen, el.$extras.garage, el.$extras.elevator, el.$extras.waterSupply, el.$extras.electricitySupply, el.$extras.type, el.$extras.isApprove, el.$extras.rejectReason, el.$extras.categoryId, el.$extras.updateStatusLevel, el.$extras.image, el.$extras.features, el.$extras.noLivingRooms, el.$extras.propertyAge,
                el.isFavorites)
        })
    }
} 