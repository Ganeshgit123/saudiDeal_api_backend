import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Subscription extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public imageType: string

  @column()
  public price: number

  @column()
  public description: string

  @column()
  public active: boolean

  @column()
  public subscriptionsTime: number

  @column()
  public totalPost: number

  @column()
  public type: string

  @column()
  public userType: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
