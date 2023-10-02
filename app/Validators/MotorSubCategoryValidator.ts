import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MotorSubCategoryValidator {
  constructor(protected ctx: HttpContextContract) { }

  public get data() {
    return {
      ...this.ctx.request.all(),
    }
  }

  public schema = schema.create({
    motorId: schema.number(),
    motorCategoriesId: schema.number(),
    motorSubCategoriesName: schema.string(),
    arMotorSubCategoriesName: schema.string(),
  })

  public messages = {
    'required': '{{ field }} is required',
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
  public cacheKey = this.ctx.routeKey

}
