
export default class BrandDomain {
    public readonly id: number
    public readonly name: string
    public readonly active: boolean
    public readonly createdAt: string
    public readonly updatedAt: string

    private constructor(id: number, name: string, active: boolean, createdAt: string, updatedAt: string) {

        this.id = id
        this.name = name
        this.active = active
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    public static createFromObject(data: any) {
        return new BrandDomain(data.id, data.name, data.active, data.createdAt, data.updatedAt)
    }

    public static createFromArrOfObject(data: any) {
        return data.map((el) => {
            return new BrandDomain(el.id, el.name, el.active, el.createdAt, el.updatedAt)
        })
    }
} 