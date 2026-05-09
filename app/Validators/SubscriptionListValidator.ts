import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SubscriptionListValidator {
  constructor(protected ctx: HttpContextContract) { }

  public get data() {
    return {
      ...this.ctx.request.all(),
    }
  }

  public schema = schema.create({
    subscriptionId: schema.number(),
    userId: schema.number(),
    startDate: schema.string(),
    endDate: schema.string(),
    totalPost: schema.number(),
    remainingDays: schema.number(),
    remainingPost: schema.number(),
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
