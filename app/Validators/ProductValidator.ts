import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductValidator {
  constructor(protected ctx: HttpContextContract) { }

  public get data() {
    return {
      ...this.ctx.request.all(),
    }
  }

  public schema = schema.create({
    name: schema.string(),
    image: schema.string(),
    brand: schema.string.optional(),
    price: schema.number(),
    originalPrice: schema.number(),
    isStock: schema.number.optional(),
    colour: schema.string.optional(),
    capacity: schema.string.optional(),
    warrenty: schema.number(),
    isPod: schema.number.optional(),
    returnpolicy: schema.number.optional(),
    sellCount: schema.number.optional(),
    active: schema.boolean.optional(),
    categoryId: schema.number(),
    specification: schema.string(),
    freeInstallation: schema.boolean.optional()
  })

  public messages = {
    'required': '{{ field }} is required',
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
  public cacheKey = this.ctx.routeKey

}