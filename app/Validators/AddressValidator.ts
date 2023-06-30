import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddressValidator {
  constructor(protected ctx: HttpContextContract) { }

  public get data() {
    return {
      ...this.ctx.request.all(),
    }
  }

  public schema = schema.create({
    // userId: schema.number(),
    flatNo: schema.string.optional(),
    buildingName: schema.string(),
    landmark: schema.string(),
    address: schema.string(),
    saveAs: schema.string(),
    latitude: schema.string.optional(),
    longitude: schema.string.optional(),
    addressName: schema.string.optional()
  })

  public messages = {
    'required': '{{ field }} is required',
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
  public cacheKey = this.ctx.routeKey

}