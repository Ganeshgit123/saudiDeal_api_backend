
export default class ContactDomain {
    public readonly id: number
    public readonly name: string
    public readonly email: number
    public readonly mobileNumber: boolean
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly message: string
    public readonly attachment: string

    private constructor(id: number, name: string, email: number, mobileNumber: boolean, createdAt: string, updatedAt: string,
        message: string, attachment: string) {

        this.id = id
        this.name = name
        this.email = email
        this.mobileNumber = mobileNumber
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.message = message
        this.attachment = attachment
    }

    public static createFromObject(data: any) {
        return new ContactDomain(data.id, data.name, data.email, data.mobileNumber, data.createdAt, data.updatedAt,
            data.message, data.attachment)
    }

    public static createFromArrOfObject(data: any) {
        return data.map((el) => {
            return new ContactDomain(el.id, el.name, el.email, el.mobileNumber, el.createdAt, el.updatedAt,
                el.message, el.attachment)
        })
    }
} 