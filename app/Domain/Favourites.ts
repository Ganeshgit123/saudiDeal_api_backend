
export default class FavouritesDomain {
    public readonly id: number
    public readonly productId: number
    public readonly userId: number
    public readonly name: string
    public readonly image: string
    public readonly price: number
    public readonly originalPrice: number
    public readonly isStock: number
    public readonly colour: string
    public readonly capacity: string
    public readonly warrenty: number
    public readonly isPod: boolean
    public readonly returnpolicy: string
    public readonly sellCount: number
    public readonly categoryId: string
    public readonly subCategoryId: boolean
    public readonly productRating: boolean
    public readonly brandId: number
    public readonly specification: string
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly brandName: string
    public readonly categoryName: string
    public readonly subCategoryName: string

    private constructor(id: number, productId: number, userId: number, name: string,
        image: string, price: number, originalPrice: number, isStock: number, colour: string,
        capacity: string, warrenty: number, isPod: boolean, returnpolicy: string,
        sellCount: number, categoryId: string, subCategoryId: boolean, productRating: boolean,
        brandId: number, specification: string, createdAt: string, updatedAt: string, brandName: string, categoryName: string, subCategoryName: string) {

        this.id = id
        this.productId = productId
        this.userId = userId
        this.name = name
        this.image = image
        this.price = price
        this.originalPrice = originalPrice
        this.isStock = isStock
        this.colour = colour
        this.capacity = capacity
        this.warrenty = warrenty
        this.isPod = isPod
        this.returnpolicy = returnpolicy
        this.sellCount = sellCount
        this.categoryId = categoryId
        this.subCategoryId = subCategoryId
        this.productRating = productRating
        this.brandId = brandId
        this.specification = specification
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.brandName = brandName
        this.categoryName = categoryName
        this.subCategoryName = subCategoryName
    }

    public static createFromObject(data: any) {
        return new FavouritesDomain(data.favouritesId, data.id, data.userId, data.$extras ? data.$extras.name : '', data.$extras ? data.$extras.image ? JSON.parse(data.$extras.image) : '' : '', data.$extras ? data.$extras.price : '', data.$extras ? data.$extras.originalPrice : '',
            data.$extras ? data.$extras.is_stock : '', data.$extras ? data.$extras.colour : '', data.$extras ? data.$extras.capacity : '',
            data.$extras ? data.$extras.warrenty : '', data.$extras ? data.$extras.isPod : '', data.$extras ? data.$extras.returnpolicy : '', data.$extras ? data.$extras.sellCount : '', data.$extras ? data.$extras.categoryId : '',
            data.$extras ? data.$extras.subCategoryId : '', data.$extras ? data.$extras.productRating : '', data.$extras ? data.$extras.brandId : '', data.$extras ? data.$extras.specification : '', data.createdAt, data.updatedAt,
            data.$extras ? data.$extras.brandName : '', data.$extras ? data.$extras.categoryName : '', data.$extras ? data.$extras.subCategoryName : '')
    }

    public static createFromArrOfObject(data: any) {
        return data.map((el) => {
            return new FavouritesDomain(el.$extras.favouritesId, el.id, el.userId, el.$extras ? el.$extras.name : '', el.$extras ? el.$extras.image : "", el.$extras ? el.$extras.price : '', el.$extras ? el.$extras.original_price : '',
                el.$extras ? el.$extras.is_stock : '', el.$extras ? el.$extras.colour : '', el.$extras ? el.$extras.capacity : '',
                el.$extras ? el.$extras.warrenty : '', el.$extras ? el.$extras.is_pod : '', el.$extras ? el.$extras.return_policy : '', el.$extras ? el.$extras.sell_count : '', el.$extras ? el.$extras.category_id : '',
                el.$extras ? el.$extras.sub_category_id : '', el.$extras ? el.$extras.product_rating : '', el.$extras ? el.$extras.brand_id : '', el.$extras ? el.$extras.specification : '', el.createdAt, el.updatedAt,
                el.$extras.brandName, el.$extras.categoryName, el.$extras.subCategoryName)
        })
    }
} 