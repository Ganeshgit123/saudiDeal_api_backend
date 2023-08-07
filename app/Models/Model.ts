import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Model extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public brandId: string

  @column()
  public modelName: string

  @column()
  public enModelName: string

  @column()
  public arModelName: string

  @column()
  public type: string

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}