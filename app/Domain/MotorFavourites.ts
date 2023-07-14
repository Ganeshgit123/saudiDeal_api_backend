
export default class MotorFavouritesDomain {
    public readonly id: number
    public readonly productId: number
    public readonly userId: number
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly title: string
    public readonly favouritesId: number
    public readonly region: string
    public readonly makeAndModel: string
    public readonly trim: string
    public readonly regionalSpecs: string
    public readonly year: string
    public readonly kilometer: number
    public readonly price: number
    public readonly phoneNumber: string
    public readonly image: string
    public readonly location: string
    public readonly usage: string
    public readonly description: string
    public readonly transmissionType: string
    public readonly extra1: string
    public readonly specification: string
    public readonly updateStatusLevel: number
    public readonly make: string
    public readonly model: string
    public readonly age: string
    public readonly length: string
    public readonly mainMotorCategoryId: number
    public readonly motorSubCategoryId: number
    public readonly isApprove: number
    public readonly rejectReason: string
    public readonly provinceId: number
    public readonly cityId: number
    public readonly finalDriveSystem: string
    public readonly wheels: string
    public readonly engineSize: string
    public readonly bodyCondition: string
    public readonly mechanicalCondition: string
    public readonly cylinders: string
    public readonly horsePower: string
    public readonly capacity: string
    public readonly extra: string
    public readonly interiorColor: string
    public readonly exteriorColor: string
    public readonly leatherSeat: boolean
    public readonly parkingSensor: boolean
    public readonly rearViewCamera: boolean
    public readonly sunRoof: boolean
    public readonly accidentFree: boolean
    public readonly warranty: boolean
    public readonly fullyMaintained: boolean

    private constructor(id: number, productId: number, userId: number, createdAt: string, updatedAt: string, title: string, favouritesId: number, region: string, makeAndModel: string, trim: string, regionalSpecs: string, year: string, kilometer: number, price: number, phoneNumber: string, image: string, location: string, usage: string, description: string, transmissionType: string, extra1: string, specification: string, updateStatusLevel: number, make: string, model: string, age: string, length: string, mainMotorCategoryId: number, motorSubCategoryId: number, isApprove: number, rejectReason: string, provinceId: number, cityId: number, finalDriveSystem: string, wheels: string, engineSize: string, bodyCondition: string, mechanicalCondition: string, cylinders: string, horsePower: string, capacity: string, extra: string, interiorColor: string, exteriorColor: string, leatherSeat: boolean, parkingSensor: boolean, rearViewCamera: boolean, sunRoof: boolean, accidentFree: boolean, warranty: boolean, fullyMaintained: boolean) {

        this.id = id
        this.productId = productId
        this.userId = userId
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.title = title
        this.favouritesId = favouritesId
        this.region = region
        this.makeAndModel = makeAndModel
        this.trim = trim
        this.regionalSpecs = regionalSpecs
        this.year = year
        this.kilometer = kilometer
        this.price = price
        this.phoneNumber = phoneNumber
        this.image = image
        this.location = location
        this.usage = usage
        this.description = description
        this.transmissionType = transmissionType
        this.extra1 = extra1
        this.specification = specification
        this.updateStatusLevel = updateStatusLevel
        this.make = make
        this.model = model
        this.age = age
        this.length = length
        this.mainMotorCategoryId = mainMotorCategoryId
        this.motorSubCategoryId = motorSubCategoryId
        this.isApprove = isApprove
        this.rejectReason = rejectReason
        this.provinceId = provinceId
        this.cityId = cityId
        this.finalDriveSystem = finalDriveSystem
        this.wheels = wheels
        this.engineSize = engineSize
        this.bodyCondition = bodyCondition
        this.mechanicalCondition = mechanicalCondition
        this.cylinders = cylinders
        this.horsePower = horsePower
        this.capacity = capacity
        this.extra = extra
        this.interiorColor = interiorColor
        this.exteriorColor = exteriorColor
        this.leatherSeat = leatherSeat
        this.parkingSensor = parkingSensor
        this.rearViewCamera = rearViewCamera
        this.sunRoof = sunRoof
        this.accidentFree = accidentFree
        this.warranty = warranty
        this.fullyMaintained = fullyMaintained
    }

    public static createFromObject(data: any) {
        return new MotorFavouritesDomain(data.id, data.$extras.productId, data.$extras.userId, data.createdAt, data.updatedAt, 
            data.$extras.title, data.$extras.favouritesId, data.$extras.region, data.$extras.makeAndModel, data.$extras.trim,
            data.$extras.regionalSpecs, data.$extras.year, data.$extras.kilometer, data.$extras.price, data.$extras.phoneNumber, 
            data.$extras.image, data.$extras.location, data.$extras.usage, data.$extras.description, data.$extras.transmissionType,
            data.$extras.extra1, data.$extras.specification, data.$extras.updateStatusLevel, data.$extras.make,
            data.$extras.model, data.$extras.age, data.$extras.length, data.$extras.mainMotorCategoryId, data.$extras.motorSubCategoryId, 
            data.$extras.isApprove, data.$extras.rejectReason, data.$extras.provinceId, data.$extras.cityId, data.$extras.finalDriveSystem, 
            data.$extras.wheels, data.$extras.engineSize, data.$extras.bodyCondition, data.$extras.mechanicalCondition, data.$extras.cylinders, 
            data.$extras.horsePower, data.$extras.capacity, data.$extras.extra, data.$extras.interiorColor, data.$extras.exteriorColor, 
            data.$extras.leatherSeat, data.$extras.parkingSensor, data.$extras.rearViewCamera, data.$extras.sunRoof, data.$extras.accidentFree,
            data.$extras.warranty, data.$extras.fullyMaintained)
    }

    public static createFromArrOfObject(data: any) {
        return data.map((el) => {
            return new MotorFavouritesDomain(el.id, el.$extras.productId, el.$extras.userId, el.createdAt, el.updatedAt, el.$extras.title, el.$extras.favouritesId, 
                el.$extras.region, el.$extras.makeAndModel, el.$extras.trim, el.$extras.regionalSpecs, el.$extras.year, el.$extras.kilometer, el.$extras.price,
                el.$extras.phoneNumber, el.$extras.image, el.$extras.location, el.$extras.usage, el.$extras.description, el.$extras.transmissionType, el.$extras.extra1, 
                el.$extras.specification, el.$extras.updateStatusLevel, el.$extras.make, el.$extras.model, el.$extras.age, el.$extras.length, el.$extras.mainMotorCategoryId,
                el.$extras.motorSubCategoryId, el.$extras.isApprove, el.$extras.rejectReason, el.$extras.provinceId, el.$extras.cityId, el.$extras.finalDriveSystem, el.$extras.wheels,
                el.$extras.engineSize, el.$extras.bodyCondition, el.$extras.mechanicalCondition, el.$extras.cylinders, el.$extras.horsePower, el.$extras.capacity, el.$extras.extra,
                el.$extras.interiorColor, el.$extras.exteriorColor, el.$extras.leatherSeat, el.$extras.parkingSensor, el.$extras.rearViewCamera, el.$extras.sunRoof, el.$extras.accidentFree,
                el.$extras.warranty, el.$extras.fullyMaintained)
        })
    }
} 