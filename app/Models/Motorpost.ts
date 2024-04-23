import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MotorPost extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public region: string

  @column()
  public title: string

  @column()
  public makeAndModel: string

  @column()
  public trim: string

  @column()
  public regionalSpecs: string

  @column()
  public year: string

  @column()
  public kilometer: number

  @column()
  public price: number

  @column()
  public phoneNumber: string

  @column()
  public image: string

  @column()
  public usage: string

  @column()
  public description: string

  @column()
  public bodyType: string

  @column()
  public transmissionType: string

  @column()
  public extra: string

  @column()
  public specification: string

  @column()
  public updateStatusLevel: number

  @column()
  public location: string

  @column()
  public active: boolean

  @column()
  public make: string

  @column()
  public model: string

  @column()
  public age: string

  @column()
  public length: string

  @column()
  public mainMotorCategoryId: string

  @column()
  public motorCategoryId: string

  @column()
  public motorSubCategoryId: string

  @column()
  public isApprove: number

  @column()
  public rejectReason: string

  @column()
  public provinceId: string

  @column()
  public cityId: string

  @column()
  public finalDriveSystem: string

  @column()
  public wheels: string

  @column()
  public engineSize: string

  @column()
  public bodyCondition: string

  @column()
  public mechanicalCondition: string

  @column()
  public cylinders: string

  @column()
  public horsePower: string

  @column()
  public capacity: string

  @column()
  public interiorColor: string

  @column()
  public exteriorColor: string

  @column()
  public leatherSeat: boolean

  @column()
  public parkingSensor: boolean

  @column()
  public rearViewCamera: boolean

  @column()
  public sunRoof: boolean

  @column()
  public accidentFree: boolean

  @column()
  public warranty: boolean

  @column()
  public fullyMaintained: boolean

  @column()
  public latitude: string

  @column()
  public longitude: string

  @column()
  public subscriptionId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
