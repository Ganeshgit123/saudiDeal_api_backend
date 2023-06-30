
export default class TranslationStringDomain {
    public readonly id: number
    public readonly arName: string
    public readonly enName: string
    public readonly active: boolean
    public readonly createdAt: string
    public readonly updatedAt: string
    
    
    private constructor(id: number, arName: string, enName: string, active: boolean, createdAt: string, updatedAt: string) {

        this.id = id
        this.arName = arName
        this.enName = enName
        this.active = active
        this.createdAt = createdAt
        this.updatedAt = updatedAt    
    }

    public static createFromObject(data: any) {
        return new TranslationStringDomain(data.id, data.arName, data.enName, data.active, data.createdAt, data.updatedAt)
    }

    public static createFromArrOfObject(data: any) {        
        return data.map((el) => {
            return new TranslationStringDomain(el.id, el.arName, el.enName, el.active, el.createdAt, el.updatedAt)
        })
    }
} 