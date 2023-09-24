import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SubscriptionList extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public subscriptionId: number

  @column()
  public userId: number

  @column()
  public startDate: string

  @column()
  public endDate: string

  @column()
  public totalPost: number

  @column()
  public remainingDays: string

  @column()
  public remainingPost: number

  @column()
  public type: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
