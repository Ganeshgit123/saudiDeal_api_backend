import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public userName: string

  @column()
  public mobileNumber: string

  @column()
  public email: string

  @column()
  public active: boolean

  @column()
  public countryCode: string

  @column()
  public otp: string

  @column()
  public isNotification: boolean

  @column()
  public deviceToken: string

  @column()
  public isNewUser: boolean

  @column()
  public userType: string

  @column()
  public image: string

  @column()
  public isBlock: boolean

  @column()
  public remarks: string

  @column()
  public isOtpVerify: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
