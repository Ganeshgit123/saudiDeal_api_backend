import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import JWT from 'jsonwebtoken'
import Compression from '../Helpers/Compression'

const JWT_SECRET_KEY = Env.get('JWT_SECRET_KEY')

export default class Auth {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    let authHeader = request.header('authorization') || ''
    if (!authHeader)
      return response.unauthorized({
        success: false,
        message: 'Missing JWT Token',
      })

    try {
      if (authHeader && authHeader.startsWith('Bearer '))
        authHeader = authHeader.slice(7, authHeader.length)

      const decoded = JWT.verify(authHeader, JWT_SECRET_KEY)

      // const isVerified =
      //   decoded && decoded.claims && decoded.claims.verified ? decoded.claims.verified : false

      if (!decoded)
        return response.unauthorized({
          success: false,
          message: 'User not verified',
        })

      // if (request.ctx) request.ctx.token = { parsed: decoded, base64: authHeader }
    } catch (err) {
      return response.unauthorized({
        success: false,
        message: `Error verifying JWT Token: ${err.message}`,
      })
    }

    await next()
    return response.send(await Compression.zipResponse(response))
  }
}