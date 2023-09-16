
export default class MotorPostDomain {
    public readonly id: number
    public readonly region: string
    public readonly title: string
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
    public readonly bodyType: string
    public readonly transmissionType: string
    public readonly extra: string
    public readonly specification: string
    public readonly updateStatusLevel: number
    public readonly active: boolean
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly make: string
    public readonly model: string
    public readonly age: string
    public readonly length: string
    public readonly mainMotorCategoryId: number
    public readonly motorCategoryId: number
    public readonly motorSubCategoryId: number
    public readonly mainMotorCategoryName: string
    public readonly motorCategoryName: string
    public readonly motorSubCategoryName: string
    public readonly isApprove: number
    public readonly rejectReason: string
    public readonly userId: number
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
    public readonly provinceName: string
    public readonly cityName: string
    public readonly userName: string
    public readonly userMobileNumber: string
    public readonly productId: number
    public readonly isFavorites: number
    public readonly interiorColor: string
    public readonly exteriorColor: string
    public readonly leatherSeat: boolean
    public readonly parkingSensor: boolean
    public readonly rearViewCamera: boolean
    public readonly sunRoof: boolean
    public readonly accidentFree: boolean
    public readonly warranty: boolean
    public readonly fullyMaintained: boolean
    public readonly favUserId: number

    private constructor(id: number, region: string, title: string, makeAndModel: string, trim: string,
        regionalSpecs: string, year: string, kilometer: number, price: number, phoneNumber: string,
        image: string, location: string, usage: string, description: string, bodyType: string, transmissionType: string,
        extra: string, specification: string, updateStatusLevel: number,
        active: boolean, createdAt: string, updatedAt: string, make: string, model: string, age: string, length: string,
        mainMotorCategoryId: number, motorCategoryId: number, motorSubCategoryId: number,
        mainMotorCategoryName: string, motorCategoryName: string, motorSubCategoryName: string, isApprove: number,
        rejectReason: string, userId: number, provinceId: number, cityId: number, finalDriveSystem: string, wheels: string,
        engineSize: string, bodyCondition: string, mechanicalCondition: string, cylinders: string, horsePower: string,
        capacity: string, provinceName: string, cityName: string, userName: string, userMobileNumber: string,
        productId: number, isFavorites: number, interiorColor: string, exteriorColor: string, leatherSeat: boolean,
        parkingSensor: boolean, rearViewCamera: boolean, sunRoof: boolean, accidentFree: boolean, warranty: boolean,
        fullyMaintained: boolean, favUserId: number) {

        this.id = id
        this.region = region
        this.title = title
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
        this.bodyType = bodyType
        this.transmissionType = transmissionType
        this.extra = extra
        this.specification = specification
        this.updateStatusLevel = updateStatusLevel
        this.active = active
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.make = make
        this.model = model
        this.age = age
        this.length = length
        this.mainMotorCategoryId = mainMotorCategoryId
        this.motorCategoryId = motorCategoryId
        this.motorSubCategoryId = motorSubCategoryId
        this.mainMotorCategoryName = mainMotorCategoryName
        this.motorCategoryName = motorCategoryName
        this.motorSubCategoryName = motorSubCategoryName
        this.isApprove = isApprove
        this.rejectReason = rejectReason
        this.userId = userId
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
        this.provinceName = provinceName
        this.cityName = cityName
        this.userName = userName
        this.userMobileNumber = userMobileNumber
        this.productId = productId
        this.isFavorites = isFavorites
        this.interiorColor = interiorColor
        this.exteriorColor = exteriorColor
        this.leatherSeat = leatherSeat
        this.parkingSensor = parkingSensor
        this.rearViewCamera = rearViewCamera
        this.sunRoof = sunRoof
        this.accidentFree = accidentFree
        this.warranty = warranty
        this.fullyMaintained = fullyMaintained
        this.favUserId = favUserId
    }

    public static createFromObject(data: any) {
        return new MotorPostDomain(data.id, data.region, data.title, data.makeAndModel, data.trim,
            data.regionalSpecs, data.year, data.kilometer, data.price, data.phoneNumber, data.image,
            data.location, data.usage, data.description, data.bodyType, data.transmissionType,
            data.extra, data.specification, data.updateStatusLevel, data.active, data.createdAt, data.updatedAt,
            data.make, data.model, data.age, data.length, data.mainMotorCategoryId, data.motorCategoryId,
            data.motorSubCategoryId, data.$extras ? data.$extras.mainMotorCategoryName : '', data.$extras ? data.$extras.motorCategoryName : '', data.$extras ? data.$extras.motorSubCategoryName : '',
            data.isApprove, data.rejectReason, data.userId, data.provinceId, data.cityId, data.finalDriveSystem, data.wheels, data.engineSize,
            data.bodyCondition, data.mechanicalCondition, data.cylinders, data.horsePower, data.capacity, data.$extras ? data.$extras.provinceName : '',
            data.$extras ? data.$extras.cityName : '', data.$extras ? data.$extras.userName : '', data.$extras ? data.$extras.userMobileNumber : '',
            data.id, 0, data.$extras.interiorColor, data.$extras.exteriorColor,
            data.$extras.leatherSeat, data.$extras.parkingSensor, data.$extras.rearViewCamera, data.$extras.sunRoof, data.$extras.accidentFree,
            data.$extras.warranty, data.$extras.fullyMaintained, data.$extras.favUserId)
    }

    public static createFromArrOfObject(data: any) {
        return data.map((el) => {
            return new MotorPostDomain(el.id, el.region, el.title, el.makeAndModel, el.trim,
                el.regionalSpecs, el.year, el.kilometer, el.price, el.phoneNumber, el.image,
                el.location, el.usage, el.description, el.bodyType, el.transmissionType,
                el.extra, el.specification, el.updateStatusLevel, el.active, el.createdAt, el.updatedAt,
                el.make, el.model, el.age, el.length, el.mainMotorCategoryId, el.motorCategoryId,
                el.motorSubCategoryId, el.$extras ? el.$extras.mainMotorCategoryName : '', el.$extras ? el.$extras.motorCategoryName : '', el.$extras ? el.$extras.motorSubCategoryName : '',
                el.isApprove, el.rejectReason, el.userId, el.provinceId, el.cityId, el.finalDriveSystem,
                el.wheels, el.engineSize, el.bodyCondition, el.mechanicalCondition, el.cylinders, el.horsePower, el.capacity,
                el.$extras ? el.$extras.provinceName : '',
                el.$extras ? el.$extras.cityName : '', el.$extras ? el.$extras.userName : '', el.$extras ? el.$extras.userMobileNumber : '',
                el.id, 0, el.$extras.interiorColor || el.interiorColor, el.$extras.exteriorColor || el.exteriorColor, el.$extras.leatherSeat || el.leatherSeat, el.$extras.parkingSensor || el.parkingSensor,
                el.$extras.rearViewCamera || el.rearViewCamera, el.$extras.sunRoof || el.sunRoof, el.$extras.accidentFree || el.accidentFree,
                el.$extras.warranty || el.warranty, el.$extras.fullyMaintained || el.fullyMaintained, el.$extras.favUserId)
        })
    }
}
//[Audi,Audi,Austin,Martin,Bently,BMW,Bugatti,Cadillac,Changan,Chery,Chevrolet,Chrysler,Citroen,Daihatsu,Dodge,Ferrari,Fiat,Ford,Geely,Genesis,GMC,Haval,Honda,Hummer,Hyundai,Infiniti,Isuzu,Jaguar,Jeep,Kia,Lamborghini,Land Rover,Lexus,Lincoln,Maserati,Maybach,Mazda,Mclaren,Mercedes-Benz,Mercury.MG,Mini Cooper,Mitsubishi,Nissan,Opel,Peugeot,Porsche,Renault,Rolls,Royce,Subaru,Suzuki,Tesla,Toyota,Volkswagen,Volvo]
