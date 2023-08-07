
export default class CityDomain {
    public readonly id: number
    public readonly city: string
    public readonly provinceId: number
    public readonly active: boolean
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly provincesName: string
    public readonly enProvincesName: string
    public readonly arProvincesName: string
    public readonly enCity: string
    public readonly arCity: string

    private constructor(id: number, city: string, provinceId: number, active: boolean, createdAt: string, updatedAt: string,
        provincesName: string, enProvincesName: string, arProvincesName: string,
        enCity: string, arCity: string) {

        this.id = id
        this.city = city
        this.provinceId = provinceId
        this.active = active
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.provincesName = provincesName
        this.enProvincesName = enProvincesName
        this.arProvincesName = arProvincesName
        this.enCity = enCity
        this.arCity = arCity
    }

    public static createFromObject(data: any) {
        return new CityDomain(data.id, data.city, data.provinceId, data.active, data.createdAt, data.updatedAt,
            data.provincesName, data.enProvincesName, data.arProvincesName, data.enCity, data.arCity)
    }

    public static createFromArrOfObject(data: any) {        
        return data.map((el) => {
            return new CityDomain(el.id, el.city, el.provinceId, el.active, el.createdAt, el.updatedAt,
                el.$extras ? el.$extras.provinceName : '', el.$extras ? el.$extras.enProvinceName : '', el.$extras ? el.$extras.arProvinceName : '',
                el.enCity, el.arCity)
        })
    }
} 