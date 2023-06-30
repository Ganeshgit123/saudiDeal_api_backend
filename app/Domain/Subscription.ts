
export default class SubscriptionDomain {
    public readonly id: number
    public readonly name: string
    public readonly imageType: string
    public readonly price: number
    public readonly description: string
    public readonly active: boolean
    public readonly createdAt: string
    public readonly updatedAt: string


    private constructor(id: number, name: string, imageType: string, price: number, description: string, active: boolean, createdAt: string, updatedAt: string) {

        this.id = id
        this.name = name
        this.imageType = imageType
        this.price = price
        this.description = description
        this.active = active
        this.createdAt = createdAt
        this.updatedAt = updatedAt    
    }

    public static createFromObject(data: any) {
        return new SubscriptionDomain(data.id, data.name, data.imageType, data.price, data.description, data.active, data.createdAt, data.updatedAt)
    }

    public static createFromArrOfObject(data: any) {        
        return data.map((el) => {
            return new SubscriptionDomain(el.id, el.name, el.imageType, el.price, el.description, el.active, el.createdAt, el.updatedAt)
        })
    }
} 