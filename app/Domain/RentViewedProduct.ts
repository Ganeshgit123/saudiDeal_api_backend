
export default class RentDomain {
    public readonly id: number
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
    public readonly userId: number
    public readonly location: string
    public readonly images: string
    public readonly description: string
    public readonly propetyType: string
    public readonly furnished: boolean
    public readonly kitchen: boolean
    public readonly garage: boolean
    public readonly elevator: boolean
    public readonly waterSupply: boolean
    public readonly electricitySupply: boolean
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly active: boolean
    public readonly productId: number
    public readonly cityName: string
    public readonly provincesName: string
    public readonly isFavorites: number
    public readonly updateStatusLevel: number
    public readonly provinceName: string
    public readonly userName: string
    public readonly userMobileNumber: string
    public readonly arCategoryName: string
    public readonly enCategoryName: string
    public readonly favUserId: number


    private constructor(id: number, price: string, areaInSqmt: string, widthInMtr: string, lengthInMtr: string, title: string, phoneNumber: string, ownerType: string, rentalTerm: string, streetLength: string, noBedrooms: string, noBathrooms: string, noFloors: string, provinceId: number, cityId: number, userId: number, location: string, images: string, description: string, propetyType: string, furnished: boolean, kitchen: boolean, garage: boolean, elevator: boolean, waterSupply: boolean, electricitySupply: boolean, createdAt: string, updatedAt: string, active: boolean,
        productId: number, cityName: string, provincesName: string, isFavorites: number, updateStatusLevel: number,
        provinceName: string, userName: string, userMobileNumber: string, arCategoryName: string, enCategoryName: string,
        favUserId) {

        this.id = id
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
        this.userId = userId
        this.location = location
        this.images = images
        this.description = description
        this.propetyType = propetyType
        this.furnished = furnished
        this.kitchen = kitchen
        this.garage = garage
        this.elevator = elevator
        this.waterSupply = waterSupply
        this.electricitySupply = electricitySupply
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.active = active
        this.productId = productId
        this.cityName = cityName
        this.provincesName = provincesName
        this.isFavorites = isFavorites
        this.updateStatusLevel = updateStatusLevel
        this.provinceName = provinceName
        this.userName = userName
        this.userMobileNumber = userMobileNumber
        this.arCategoryName = arCategoryName
        this.enCategoryName = enCategoryName
        this.favUserId = favUserId
    }

    public static createFromObject(data: any) {
        return new RentDomain(data.id, data.price, data.areaInSqmt, data.widthInMtr, data.lengthInMtr, data.title, data.phoneNumber, data.ownerType, data.rentalTerm, data.streetLength, data.noBedrooms, data.noBathrooms, data.noFloors, data.provinceId, data.cityId, data.userId, data.location, data.images, data.description, data.propetyType, data.furnished, data.kitchen, data.garage, data.elevator, data.waterSupply, data.electricitySupply, data.createdAt, data.updatedAt, data.active,
            data.id, data.$extras.cityName, data.$extras.provincesName, 0, data.$extras.update_status_level,
            data.$extras ? data.$extras.provinceName : '',
            data.$extras ? data.$extras.userName : '', data.$extras ? data.$extras.userMobileNumber : '',
            data.$extras.arCategoryName, data.$extras.enCategoryName, data.$extras.favUserId)
    }

    public static createFromArrOfObject(data: any) {
        return data.map((el) => {
            return new RentDomain(el.id, el.price, el.areaInSqmt, el.widthInMtr, el.lengthInMtr, el.title, el.phoneNumber, el.ownerType, el.rentalTerm, el.streetLength, el.noBedrooms, el.noBathrooms, el.noFloors, el.provinceId, el.cityId, el.userId, el.location, el.image, el.description, el.propetyType, el.furnished, el.kitchen, el.garage, el.elevator, el.waterSupply, el.electricitySupply, el.createdAt, el.updatedAt, el.active,
                el.id, el.$extras.cityName, el.$extras.provincesName, 0, el.$extras.update_status_level,
                el.$extras ? el.$extras.provinceName : '',
                el.$extras ? el.$extras.userName : '', el.$extras ? el.$extras.userMobileNumber : '',
                el.$extras.arCategoryName, el.$extras.enCategoryName, el.$extras.favUserId)
        })
    }
} 