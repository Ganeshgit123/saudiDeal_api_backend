
export default class ModelDomain {
    public readonly id: number
    public readonly brandId: number
    public readonly modelName: string
    public readonly active: boolean
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly brandName: string
    public readonly enModelName: string
    public readonly arModelName: string
    public readonly enBrandName: string
    public readonly arBrandName: string
    public readonly type: string

    private constructor(id: number, brandId: number, modelName: string, active: boolean, createdAt: string, updatedAt: string,
        brandName: string, enModelName: string, arModelName: string, enBrandName: string, arBrandName: string,
        type: string) {

        this.id = id
        this.brandId = brandId
        this.modelName = modelName
        this.active = active
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.brandName = brandName
        this.enModelName = enModelName
        this.arModelName = arModelName
        this.enBrandName = enBrandName
        this.arBrandName = arBrandName
        this.type = type
    }

    public static createFromObject(data: any) {
        return new ModelDomain(data.id, data.brandId, data.modelName, data.active, data.createdAt, data.updatedAt,
            data.brandName, data.enModelName, data.arModelName,
            data.$extras ? data.$extras.enBrandName : '', data.$extras ? data.$extras.arBrandName : '',
            data.type)
    }

    public static createFromArrOfObject(data: any) {
        return data.map((el) => {
            return new ModelDomain(el.id, el.brandId, el.modelName, el.active, el.createdAt, el.updatedAt,
                el.$extras ? el.$extras.brandName : '', el.enModelName, el.arModelName,
                el.$extras ? el.$extras.enBrandName : '', el.$extras ? el.$extras.arBrandName : '',
                el.type)
        })
    }
} 