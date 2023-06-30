
export default class CategoryDomain {
    public readonly id: number
    public readonly name: string
    public readonly enName: string
    public readonly arName: string
    public readonly image: string
    public readonly active: boolean
    public readonly createdAt: string
    public readonly updatedAt: string

    private constructor(id: number, name: string, enName: string, arName: string, image: string, active: boolean, createdAt: string, updatedAt: string) {

        this.id = id
        this.name = name
        this.enName = enName
        this.arName = arName
        this.image = image
        this.active = active
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    public static createFromObject(data: any) {
        return new CategoryDomain(data.id, data.name, data.enName, data.arName, data.image, data.active, data.createdAt, data.updatedAt)
    }

    public static createFromArrOfObject(data: any) {
        return data.map((el) => {
            return new CategoryDomain(el.id, el.name, el.enName, el.arName, el.image, el.active, el.createdAt, el.updatedAt)
        })
    }
} 