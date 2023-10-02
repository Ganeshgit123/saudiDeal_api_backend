
export default class MotorSubCategory {
    public readonly id: number
    public readonly motorId: number
    public readonly motorCategoriesId: number
    public readonly motorSubCategoriesName: string
    public readonly active: boolean
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly arMotorSubCategoriesName: string

    private constructor(id: number, motorId: number, motorCategoriesId: number, motorSubCategoriesName: string, active: boolean, createdAt: string, updatedAt: string,
        arMotorSubCategoriesName: string) {

        this.id = id
        this.motorId = motorId
        this.motorCategoriesId = motorCategoriesId
        this.motorSubCategoriesName = motorSubCategoriesName
        this.active = active
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.arMotorSubCategoriesName = arMotorSubCategoriesName
    }

    public static createFromObject(data: any) {
        return new MotorSubCategory(data.id, data.motorId, data.motorCategoriesId, data.motorSubCategoriesName, data.active, data.createdAt, data.updatedAt,
            data.arMotorSubCategoriesName)
    }

    public static createFromArrOfObject(data: any) {
        return data.map((el) => {
            return new MotorSubCategory(el.id, el.motorId, el.motorCategoriesId, el.motorSubCategoriesName, el.active, el.createdAt, el.updatedAt,
                el.arMotorSubCategoriesName)
        })
    }
} 