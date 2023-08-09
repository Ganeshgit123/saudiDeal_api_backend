import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CityValidator {
  constructor(protected ctx: HttpContextContract) { }

  public get data() {
    return {
      ...this.ctx.request.all(),
    }
  }

  public schema = schema.create({
    city: schema.string(),
    enCity: schema.string.optional(),
    arCity: schema.string(),
    provinceId: schema.number(),
  })

  public messages = {
    'required': '{{ field }} is required',
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
  public cacheKey = this.ctx.routeKey

}