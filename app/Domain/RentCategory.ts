
export default class RentCategoryDomain {
    public readonly id: number
    public readonly name: string
    public readonly area: string
    public readonly image: string
    public readonly active: boolean
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly en_name: string
    public readonly ar_name: string
    public readonly type: string


    private constructor(id: number, name: string, area: string, image: string, active: boolean, createdAt: string, updatedAt: string, en_name: string, ar_name: string,
        type: string) {

        this.id = id
        this.name = name
        this.area = area
        this.image = image
        this.active = active
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.en_name = en_name
        this.ar_name = ar_name
        this.type = type
    }

    public static createFromObject(data: any) {
        return new RentCategoryDomain(data.id, data.name, data.area, data.image, data.active, data.createdAt, data.updatedAt, data.en_name, data.ar_name,
            data.type)
    }

    public static createFromArrOfObject(data: any) {
        return data.map((el) => {
            return new RentCategoryDomain(el.id, el.name, el.area, el.image, el.active, el.createdAt, el.updatedAt, el.en_name, el.ar_name,
                el.$extras.type || el.type)
        })
    }
} 