
export default class AddressDomain {
    public readonly id: number
    public readonly userId: number
    public readonly flatNo: string
    public readonly buildingName: string
    public readonly landmark: string
    public readonly address: string
    public readonly saveAs: string
    public readonly active: boolean
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly latitude: string
    public readonly longitude: string
    public readonly addressName: string

    private constructor(id: number, userId: number, flatNo: string, buildingName: string,
        landmark: string, address: string, saveAs: string,
         active: boolean, createdAt: string, updatedAt: string, latitude: string, longitude: string,
         addressName: string) {

        this.id = id
        this.userId = userId
        this.flatNo = flatNo
        this.buildingName = buildingName
        this.landmark = landmark
        this.address = address
        this.saveAs = saveAs
        this.active = active
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.latitude = latitude
        this.longitude = longitude
        this.addressName = addressName
    }

    public static createFromObject(data: any) {
        return new AddressDomain(data.id, data.userId, data.flatNo, data.buildingName,
            data.landmark, data.address, data.saveAs,
            data.active, data.createdAt, data.updatedAt, data.latitude, data.longitude,
            data.addressName)
    }

    public static createFromArrOfObject(data: any) {
        return data.map((el) => {
            return new AddressDomain(el.id, el.userId, el.flatNo, el.buildingName,
                el.landmark, el.address, el.saveAs,
                el.active, el.createdAt, el.updatedAt, el.latitude, el.longitude,
                el.addressName)
        })
    }
} 