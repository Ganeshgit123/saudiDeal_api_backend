import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ModelValidator {
  constructor(protected ctx: HttpContextContract) { }

  public get data() {
    return {
      ...this.ctx.request.all(),
    }
  }

  public schema = schema.create({
    modelName: schema.string(),
    enModelName: schema.string.optional(),
    arModelName: schema.string(),
    brandId: schema.number(),
    type: schema.string()
  })

  public messages = {
    'required': '{{ field }} is required',
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
  public cacheKey = this.ctx.routeKey

}