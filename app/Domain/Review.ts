
export default class ReviewsDomain {
    public readonly id: number
    public readonly productId: string
    public readonly userId: string
    public readonly review: string
    public readonly rating: string
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly active: boolean
    public readonly firstName: string
    public readonly lastName: string
    public readonly mobileNumber: string

    private constructor(id: number, productId: string, userId: string, review: string, rating: string, active: boolean, createdAt: string, updatedAt: string,
        firstName: string, lastName: string, mobileNumber: string) {

        this.id = id
        this.productId = productId
        this.userId = userId
        this.review = review
        this.rating = rating
        this.active = active
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.firstName = firstName
        this.lastName = lastName
        this.mobileNumber = mobileNumber
    }

    public static createFromObject(data: any) {
        return new ReviewsDomain(data.id, data.productId, data.userId, data.review, data.rating, data.active, data.createdAt, data.updatedAt,
            data.$extras.first_name, data.$extras.last_name, data.$extras.mobile_number)
    }

    public static createFromArrOfObject(data: any) {
        return data.map((el) => {
            return new ReviewsDomain(el.id, el.productId, el.userId, el.review, el.rating, el.active, el.createdAt, el.updatedAt,
                el.$extras.first_name, el.$extras.last_name, el.$extras.mobile_number)
        })
    }
} 