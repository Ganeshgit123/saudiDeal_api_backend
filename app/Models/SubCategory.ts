import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SubCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public subCategoryName: string

  @column()
  public enSubCategoryName: string

  @column()
  public arSubCategoryName: string

  @column()
  public categoryId: number

  @column()
  public image: string

  @column()
  public active: boolean


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
