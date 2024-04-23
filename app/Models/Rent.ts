import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Rent extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public price: string

  @column()
  public areaInSqmt: string

  @column()
  public widthInMtr: string

  @column()
  public lengthInMtr: string

  @column()
  public title: string

  @column()
  public phoneNumber: number

  @column()
  public ownerType: string

  @column()
  public rentalTerm: string

  @column()
  public streetLength: string

  @column()
  public noBedrooms: string

  @column()
  public noBathrooms: string

  @column()
  public noFloors: string

  @column()
  public provinceId: number

  @column()
  public cityId: number

  @column()
  public userId: number

  @column()
  public location: number

  @column()
  public image: string

  @column()
  public description: string

  @column()
  public propetyType: string

  @column()
  public furnished: boolean

  @column()
  public kitchen: boolean

  @column()
  public garage: boolean

  @column()
  public elevator: boolean

  @column()
  public waterSupply: boolean

  @column()
  public electricitySupply: boolean

  @column()
  public categoryId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public active: boolean

  @column()
  public type: boolean

  @column()
  public isApprove: number

  @column()
  public rejectReason: string

  @column()
  public updateStatusLevel: number

  @column()
  public features: string

  @column()
  public noLivingRooms: string

  @column()
  public propertyAge: string

  @column()
  public latitude: string

  @column()
  public longitude: string

  @column()
  public subscriptionId: number
}
