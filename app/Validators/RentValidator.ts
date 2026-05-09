import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public get data() {
    return {
      ...this.ctx.request.all(),
    }
  }

  public schema = schema.create({
    price: schema.string(),
    areaInSqmt: schema.string.optional(),
    widthInMtr: schema.string.optional(),
    lengthInMtr: schema.string.optional(),
    title: schema.string.optional(),
    phoneNumber: schema.string.optional(),
    ownerType: schema.string.optional(),
    rentalTerm: schema.string.optional(),
    streetLength: schema.string.optional(),
    noBedrooms: schema.string.optional(),
    noBathrooms: schema.string.optional(),
    noFloors: schema.string.optional(),
    provinceId: schema.number.optional(),
    cityId: schema.number.optional(),
    userId: schema.number.optional(),
    location: schema.number.optional(),
    images: schema.string.optional(),
    description: schema.string.optional(),
    propetyType: schema.string.optional(),
    furnished: schema.boolean.optional(),
    kitchen: schema.boolean.optional(),
    garage: schema.boolean.optional(),
    elevator: schema.boolean.optional(),
    waterSupply: schema.boolean.optional(),
    electricitySupply: schema.boolean.optional(),
    categoryId: schema.number.optional(),
    latitude: schema.number.optional(),
    longitude: schema.number.optional(),
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
