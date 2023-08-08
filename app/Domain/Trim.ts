
export default class TrimDomain {
    public readonly id: number
    public readonly makeId: number
    public readonly modelId: number
    public readonly arName: string
    public readonly enName: string
    public readonly active: boolean
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly brandName: string
    public readonly enBrandName: string
    public readonly arBrandName: string
    public readonly modelName: string
    public readonly enModelName: string
    public readonly arModelName: string

    private constructor(id: number, makeId: number, modelId: number, arName: string, enName: string, active: boolean, createdAt: string, updatedAt: string,
        brandName: string,enBrandName: string, arBrandName: string, modelName: string, enModelName: string,
        arModelName: string) {

        this.id = id
        this.makeId = makeId
        this.modelId = modelId
        this.arName = arName
        this.enName = enName
        this.active = active
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.brandName = brandName
        this.enBrandName = enBrandName
        this.arBrandName = arBrandName
        this.modelName = modelName
        this.enModelName = enModelName
        this.arModelName = arModelName
    }

    public static createFromObject(data: any) {
        return new TrimDomain(data.id, data.makeId, data.modelId, data.arName, data.enName, data.active, data.createdAt, data.updatedAt,
            data.brandName, data.enBrandName, data.arBrandName, data.modelName, data.enModelName,
            data.arModelName)
    }

    public static createFromArrOfObject(data: any) {        
        return data.map((el) => {
            return new TrimDomain(el.id, el.makeId, el.modelId, el.arName, el.enName, el.active, el.createdAt, el.updatedAt,
                el.$extras.brandName, el.$extras.enBrandName, el.$extras.arBrandName, el.$extras.modelName, el.$extras.enModelName,
                el.$extras.arModelName)
        })
    }
} 