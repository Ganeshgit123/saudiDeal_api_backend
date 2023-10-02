import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MotorSubCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public motorId: number

  @column()
  public motorCategoriesId: number

  @column()
  public motorSubCategoriesName: string

  @column()
  public active: boolean

  @column()
  public arMotorSubCategoriesName: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
