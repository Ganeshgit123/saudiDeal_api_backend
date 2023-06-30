
export default class CityDomain {
    public readonly id: number
    public readonly city: string
    public readonly provinceId: number
    public readonly active: boolean
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly provincesName: string

    private constructor(id: number, city: string, provinceId: number, active: boolean, createdAt: string, updatedAt: string,
        provincesName: string) {

        this.id = id
        this.city = city
        this.provinceId = provinceId
        this.active = active
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.provincesName = provincesName
    }

    public static createFromObject(data: any) {
        return new CityDomain(data.id, data.city, data.provinceId, data.active, data.createdAt, data.updatedAt,
            data.provincesName)
    }

    public static createFromArrOfObject(data: any) {        
        return data.map((el) => {
            return new CityDomain(el.id, el.city, el.provinceId, el.active, el.createdAt, el.updatedAt,
                el.$extras ? el.$extras.provinceName : '')
        })
    }
} 