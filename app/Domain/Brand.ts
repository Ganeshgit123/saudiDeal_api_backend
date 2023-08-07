
export default class BrandDomain {
    public readonly id: number
    public readonly name: string
    public readonly active: boolean
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly enName: string
    public readonly arName: string
    public readonly type: string

    private constructor(id: number, name: string, active: boolean, createdAt: string, updatedAt: string,
        enName: string, arName: string, type: string) {

        this.id = id
        this.name = name
        this.active = active
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.enName = enName
        this.arName = arName
        this.type = type
    }

    public static createFromObject(data: any) {
        return new BrandDomain(data.id, data.name, data.active, data.createdAt, data.updatedAt,
            data.enName, data.arName, data.type)
    }

    public static createFromArrOfObject(data: any) {
        return data.map((el) => {
            return new BrandDomain(el.id, el.name, el.active, el.createdAt, el.updatedAt,
                el.enName, el.arName, el.type)
        })
    }
} 