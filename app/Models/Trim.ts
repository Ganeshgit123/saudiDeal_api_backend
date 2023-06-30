import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Trim extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public makeId: number

  @column()
  public modelId: number

  @column()
  public arName: string

  @column()
  public enName: string

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
