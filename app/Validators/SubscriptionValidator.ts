import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SubscriptionValidator {
  constructor(protected ctx: HttpContextContract) { }

  public get data() {
    return {
      ...this.ctx.request.all(),
    }
  }

  public schema = schema.create({
    name: schema.string(),
    imageType: schema.string.optional(),
    price: schema.number(),
    description: schema.string(),
    subscriptionsTime: schema.number(),
    totalPost: schema.number(),
    type: schema.string(),
    userType: schema.string()
  })

  public messages = {
    'required': '{{ field }} is required',
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
  public cacheKey = this.ctx.routeKey
}