
export default class MasterTrimsDomain {
    public readonly id: number
    public readonly enName: string
    public readonly arName: string
    public readonly active: boolean
    public readonly createdAt: string
    public readonly updatedAt: string

    private constructor(id: number, enName: string, arName: string, active: boolean, createdAt: string, updatedAt: string) {

        this.id = id
        this.enName = enName
        this.arName = arName
        this.active = active
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    public static createFromObject(data: any) {
        return new MasterTrimsDomain(data.id, data.enName, data.arName, data.active, data.createdAt, data.updatedAt)
    }

    public static createFromArrOfObject(data: any) {        
        return data.map((el) => {
            return new MasterTrimsDomain(el.id, el.enName, el.arName, el.active, el.createdAt, el.updatedAt)
        })
    }
} 