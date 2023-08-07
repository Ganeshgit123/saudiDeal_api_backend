
export default class ProvinceDomain {
    public readonly id: number
    public readonly name: string
    public readonly active: boolean
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly enName: string
    public readonly arName: string

    private constructor(id: number, name: string, active: boolean, createdAt: string, updatedAt: string,
        enName: string, arName: string) {

        this.id = id
        this.name = name
        this.active = active
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.enName = enName
        this.arName = arName
    }

    public static createFromObject(data: any) {
        return new ProvinceDomain(data.id, data.name, data.active, data.createdAt, data.updatedAt,
            data.enName, data.arName)
    }

    public static createFromArrOfObject(data: any) {
        return data.map((el) => {
            return new ProvinceDomain(el.id, el.name, el.active, el.createdAt, el.updatedAt,
                el.enName, el.arName)
        })
    }
} 