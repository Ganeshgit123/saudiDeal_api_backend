import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OrderValidator {
  constructor(protected ctx: HttpContextContract) {}

  public get data() {
    return {
      ...this.ctx.request.all(),
    }
  }

  public schema = schema.create({
    // userId: schema.number(),
    // productId: schema.number(),
    deliveryAddressId: schema.number(),
    deliveryAddress: schema.string(),
    deliveryAddressType: schema.string(),
    netAmount: schema.number(),
    discount: schema.number.optional(),
    couponName: schema.string.optional(),
    orderReferenceId: schema.string.optional(),
    paymentTypeId: schema.string.optional(),
    orderStatus: schema.string.optional(),
    deliveryCharge: schema.number.optional(),
    addressName: schema.string.optional(),
    cartId: schema.string(),
    vat: schema.number(),
    priceDetails: schema.string.optional()
  })

  public messages = {
    'required': '{{ field }} is required',
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
  public cacheKey = this.ctx.routeKey

}
