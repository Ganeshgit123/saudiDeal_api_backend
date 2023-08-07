import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MotorCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public motorCategoriesName: string

  @column()
  public enMotorCategoriesName: string

  @column()
  public arMotorCategoriesName: string

  @column()
  public motorId: number

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}