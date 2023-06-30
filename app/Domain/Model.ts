
export default class ModelDomain {
    public readonly id: number
    public readonly brandId: number
    public readonly modelName: string
    public readonly type: string
    public readonly active: boolean
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly brandName: string

    private constructor(id: number, brandId: number, type: string,  modelName: string, active: boolean, createdAt: string, updatedAt: string,
        brandName: string) {

        this.id = id
        this.brandId = brandId
        this.modelName = modelName
        this.type = type
        this.active = active
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.brandName = brandName
    }

    public static createFromObject(data: any) {
        return new ModelDomain(data.id, data.brandId, data.modelName, data.type, data.active, data.createdAt, data.updatedAt,
            data.brandName)
    }

    public static createFromArrOfObject(data: any) {
        return data.map((el) => {
            return new ModelDomain(el.id, el.brandId, el.modelName, el.type, el.active, el.createdAt, el.updatedAt,
                el.$extras ? el.$extras.brandName : '')
        })
    }
} 