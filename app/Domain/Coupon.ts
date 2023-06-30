
export default class CouponDomain {
    public readonly id: number
    public readonly couponName: string
    public readonly couponCode: string
    public readonly discountPercentage: string
    public readonly maximumDiscount: string
    public readonly active: boolean
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly title: string
    public readonly description: string

    private constructor(id: number, couponName: string, couponCode: string,
        discountPercentage: string, maximumDiscount: string, active: boolean, createdAt: string, updatedAt: string,
        title: string, description: string) {

        this.id = id
        this.couponName = couponName
        this.couponCode = couponCode
        this.discountPercentage = discountPercentage
        this.maximumDiscount = maximumDiscount
        this.active = active
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.title = title
        this.description = description
    }

    public static createFromObject(data: any) {
        return new CouponDomain(data.id, data.couponName, data.couponCode,
            data.discountPercentage, data.maximumDiscount, data.active, data.createdAt, data.updatedAt,
            data.title, data.description)
    }

    public static createFromArrOfObject(data: any) {
        return data.map((el) => {
            return new CouponDomain(el.id, el.couponName, el.couponCode,
                el.discountPercentage, el.maximumDiscount, el.active, el.createdAt, el.updatedAt,
                el.title, el.description)
        })
    }
} 