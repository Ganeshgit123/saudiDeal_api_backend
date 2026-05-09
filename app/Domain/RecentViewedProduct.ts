export default class RecentViewedProductDomain {
    public readonly id: number
    public readonly productId: number
    public readonly userId: number
    public readonly deviceId: string
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly name: string
    public readonly image: string
    public readonly brand: string
    public readonly price: number
    public readonly originalPrice: number
    public readonly isStack: number
    public readonly colour: string
    public readonly capacity: string
    public readonly active: boolean
    public readonly warrenty: number
    public readonly isPod: boolean
    public readonly returnPolicy: number
    public readonly sellCount: number
    public readonly categoryId: number
    public readonly subCategoryId: number


    private constructor(id: number, productId: number, userId: number, deviceId: string, createdAt: string, updatedAt: string,
        name: string, image: string, brand: string, price: number, originalPrice: number,
        isStock: number, colour: string, capacity: string, active: boolean, warrenty: number,
        isPod: boolean, returnPolicy: number, sellCount: number, categoryId: number, subCategoryId: number) {

        this.id = id
        this.productId = productId
        this.userId = userId
        this.deviceId = deviceId
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.name = name
        this.image = image
        this.brand = brand
        this.price = price
        this.originalPrice = originalPrice
        this.isStack = isStock
        this.colour = colour
        this.capacity = capacity
        this.active = active
        this.warrenty = warrenty
        this.isPod = isPod
        this.returnPolicy = returnPolicy
        this.sellCount = sellCount
        this.categoryId = categoryId
        this.subCategoryId = subCategoryId

    }

    public static createFromObject(data: any) {
        return new RecentViewedProductDomain(data.id, data.productId, data.userId, data.deviceId, data.createdAt, data.updatedAt,
            data.$extras.name, data.$extras.image, data.$extras.brand, data.$extras.price, data.$extras.original_price,
            data.$extras.is_stock, data.$extras.colour, data.$extras.capacity, data.$extras.active, data.$extras.warrenty,
            data.$extras.is_pod, data.$extras.returnPolicy, data.$extras.sell, data.$extras.category_id,
            data.$extras.sub_category_id)
    }

    public static createFromArrOfObject(data: any) {        
        return data.map((el) => {
            return new RecentViewedProductDomain(el.id, el.productId, el.userId, el.deviceId, el.createdAt, el.updatedAt,
                el.$extras.name, el.$extras.image, el.$extras.brand, el.$extras.price, el.$extras.original_price,
                el.$extras.is_stock, el.$extras.colour, el.$extras.capacity, el.$extras.active, el.$extras.warrenty,
                el.$extras.is_pod, el.$extras.returnpolicy, el.$extras.sell, el.$extras.category_id,
                el.$extras.sub_category_id)
        })
    }
} 