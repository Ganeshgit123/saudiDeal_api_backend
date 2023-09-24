
export default class SubscriptionListsDomain {
    public readonly id: number
    public readonly subscriptionId: number
    public readonly userId: number
    public readonly startDate: string
    public readonly endDate: string
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly remainingDays: number
    public readonly totalPost: number
    public readonly remainingPost: number
    public readonly type: string


    private constructor(id: number, subscriptionId: number, userId: number, startDate: string, endDate: string, createdAt: string, updatedAt: string,
        remainingDays: number, totalPost: number, remainingPost: number, type: string) {

        this.id = id
        this.subscriptionId = subscriptionId
        this.userId = userId
        this.startDate = startDate
        this.endDate = endDate
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.remainingDays = remainingDays
        this.totalPost = totalPost
        this.remainingPost = remainingPost
        this.type = type
    }

    public static createFromObject(data: any) {
        return new SubscriptionListsDomain(data.id, data.subscriptionId, data.userId, data.startDate, data.endDate, data.createdAt, data.updatedAt,
            data.remainingDays, data.totalPost, data.remainingPost, data.type)
    }

    public static createFromArrOfObject(data: any) {
        return data.map((el) => {
            return new SubscriptionListsDomain(el.id, el.subscriptionId, el.userId, el.startDate, el.endDate, el.createdAt, el.updatedAt,
                el.remainingDays, el.totalPost, el.remainingPost, el.type)
        })
    }
} 