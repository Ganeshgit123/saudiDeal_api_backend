
export default class MotorCategoryDomain {
    public readonly id: number
    public readonly motorId: number
    public readonly motorCategoriesName: string
    public readonly active: boolean
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly enMotorCategoriesName: string
    public readonly arMotorCategoriesName: string

    private constructor(id: number, motorId: number, motorCategoriesName: string, active: boolean, createdAt: string, updatedAt: string,
        enMotorCategoriesName: string, arMotorCategoriesName: string) {

        this.id = id
        this.motorId = motorId
        this.motorCategoriesName = motorCategoriesName
        this.active = active
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.enMotorCategoriesName = enMotorCategoriesName
        this.arMotorCategoriesName = arMotorCategoriesName
    }

    public static createFromObject(data: any) {
        return new MotorCategoryDomain(data.id, data.motorId, data.motorCategoriesName, data.active, data.createdAt, data.updatedAt,
            data.enMotorCategoriesName, data.arMotorCategoriesName)
    }

    public static createFromArrOfObject(data: any) {
        return data.map((el) => {
            return new MotorCategoryDomain(el.id, el.motorId, el.motorCategoriesName, el.active, el.createdAt, el.updatedAt,
                el.enMotorCategoriesName, el.arMotorCategoriesName)
        })
    }
} 