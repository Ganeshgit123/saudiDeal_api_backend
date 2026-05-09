
export default class UserDomain {
    public readonly id: number
    public readonly userName: string
    public readonly firstName: string
    public readonly lastName: string
    public readonly image: string
    public readonly email: string
    public readonly address: string
    public readonly description: string
    public readonly createdAt: string
    public readonly updatedAt: string
    public readonly cityId: number
    public readonly isNotification: boolean
    public readonly deviceToken: string
    public readonly mobileNumber: string
    public readonly isBadge: boolean
    public readonly userCommission: number
    public readonly gender: string
    public readonly os: string
    public readonly countryCode: string
    public readonly userType: string
    public readonly active: boolean
    public readonly roles : string
    public readonly dob: string
    public readonly isNewUser: boolean
    public readonly isBlock: boolean
    public readonly remarks: string
    public readonly isOtpVerify: boolean

    private constructor(id: number, userName: string, firstName: string, lastName: string, image: string, email: string, address: string, description: string, createdAt: string, updatedAt: string, cityId: number, isNotification: boolean, deviceToken: string,
        mobileNumber: string, isBadge: boolean, userCommission: number, gender: string, os: string,
        countryCode: string, userType: string, active: boolean, roles: string, dob: string, isNewUser: boolean,
        isBlock: boolean, remarks: string, isOtpVerify: boolean) {

        this.id = id
        this.userName = userName
        this.firstName = firstName
        this.lastName = lastName
        this.image = image
        this.email = email
        this.address = address
        this.description = description
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.cityId = cityId
        this.isNotification = isNotification
        this.deviceToken = deviceToken
        this.mobileNumber = mobileNumber
        this.isBadge = isBadge
        this.userCommission = userCommission
        this.gender = gender
        this.os = os
        this.countryCode = countryCode
        this.userType = userType
        this.active = active
        this.roles = roles
        this.dob = dob
        this.isNewUser = isNewUser
        this.isBlock = isBlock
        this.remarks = remarks
        this.isOtpVerify = isOtpVerify
    }

    public static createFromObject(data: any) {
        return new UserDomain(data.id, data.userName, data.firstName, data.lastName, data.image, data.email, data.address, data.description, data.createdAt, data.updatedAt, data.cityId, data.isNotification, data.deviceToken,
            data.mobileNumber, data.isBadge, data.userCommission, data.gender, data.os, data.countryCode, data.userType, data.active,
            data.roles, data.dob, data.isNewUser, data.isBlock, data.remarks, data.isOtpVerify)
    }

    public static createFromArrOfObject(data: any) {
        return data.map((el) => {
            return new UserDomain(el.id, el.userName, el.firstName, el.lastName, el.image, el.email, el.address, el.description, el.createdAt, el.updatedAt, el.cityId, el.isNotification, el.deviceToken,
                el.mobileNumber, el.isBadge, el.userCommission, el.gender, el.os, el.countryCode, el.userType, el.active,
                el.roles, el.dob, el.isNewUser, el.isBlock, el.remarks, el.isOtpVerify)
        })
    }
} 