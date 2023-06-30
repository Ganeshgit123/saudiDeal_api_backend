
export default class SubCategoryDomain {
    public readonly id: number
    public readonly subCategoryName: string
    public readonly enSubCategoryName: string
    public readonly arSubCategoryName: string
    public readonly categoryId: number
    public readonly image: string
    public readonly active: boolean
    public readonly createdAt: string
    public readonly updatedAt: string

    private constructor(id: number, subCategoryName: string, enSubCategoryName: string,
        arSubCategoryName: string, categoryId: number, image: string, active: boolean, createdAt: string, updatedAt: string) {

        this.id = id
        this.subCategoryName = subCategoryName
        this.enSubCategoryName = enSubCategoryName
        this.arSubCategoryName = arSubCategoryName
        this.categoryId = categoryId
        this.image = image
        this.active = active
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    public static createFromObject(data: any) {
        return new SubCategoryDomain(data.id, data.subCategoryName, data.enSubCategoryName,
            data.arSubCategoryName, data.categoryId, data.image, data.active, data.createdAt, data.updatedAt)
    }

    public static createFromArrOfObject(data: any) {
        return data.map((el) => {
            return new SubCategoryDomain(el.id, el.subCategoryName, el.enSubCategoryName,
                el.arSubCategoryName, el.categoryId, el.image, el.active, el.createdAt, el.updatedAt)
        })
    }
} 