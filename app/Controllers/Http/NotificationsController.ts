import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { NotificationRepo } from "../../Repositories";
import Validators from "../../Validators";
import { SUCCESS } from "../../Data/language";
import { NotificationDomain } from "../../Domain";
// import FcmNotification from "../../Listeners/Notification";
// import Event from '@ioc:Adonis/Core/Event'
import JWT from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
const JWT_SECRET_KEY = Env.get('JWT_SECRET_KEY')

export default class NotificationsController {

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(Validators.NotificationValidator);
        const language = request.header('language') || 'en'

        await NotificationRepo.create(payload, language)

        return {
            success: true,
            massage: SUCCESS.NOTIFICATION_CREATE[language]
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const payload = request.all()

        const language = request.header('language') || 'es'
        await NotificationRepo.isEntryExist(params.id, language);

        const updateResult = NotificationDomain.createFromObject(
            await NotificationRepo.update(params.id, payload, language)
        );

        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.NOTIFICATION_UPDATE[language]
        };
    }

    public async readAll({ request, response }: HttpContextContract) {
        // const payload = request.all()
        let token = request.headers().authorization || ''

        if (token && token.startsWith("Bearer ")) token = token.slice(7, token.length);
        let userId
        if (token) {
            const decoded = await JWT.verify(token, JWT_SECRET_KEY, async (err, decodedData) => {
                if (err) return false
                return decodedData
            })

            if (!decoded) return response.status(422).send({
                msg: `JWT Expired`
            })
            userId = decoded.id
        }

        const language = request.header('language') || 'es'

        const updateResult = await NotificationRepo.readAll(userId, language)

        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.NOTIFICATION_UPDATE[language]
        };
    }

    public async get({ request }: HttpContextContract) {

        const payload = request.all()
        const offset = payload.offset ? Number(payload.offset) : 1;
        const limit = payload.offset ? Number(payload.limit) : 1000;
        const userId = payload.userId || ''

        return {
            success: true,
            data: NotificationDomain.createFromArrOfObject(
                await NotificationRepo.get(offset, limit, userId)
            ),
        };
    }

    // public async sendPushNotification({ request }: HttpContextContract) {
    //     const language = request.header('language') || 'es'

    //     const payload = request.all()
    //     let userData
    //     if (payload.userId) {
    //         userData = await UserRepo.getUserById(payload.userId)
    //     } else {
    //         userData = UserDomain.createFromArrOfObject(
    //             await UserRepo.getAll('', '', '', '', '', '')
    //         )
    //     }

    //     const title = payload.title
    //     const text = payload.message
    //     const massage = payload.message

    //     if (userData) {
    //         userData.map(async (data) => {
    //             const notification = FcmNotification.created({ title, text, massage, data })
    //             Event.emit('notification::created', notification)
    //             const notificationData = {
    //                 "postId": 0,
    //                 "commentUserId": 0,
    //                 "postUserId": data.id,
    //                 "type": "ADMIN",
    //                 "message": payload.message
    //             }

    //             await NotificationRepo.create(notificationData, language)
    //         })
    //     }
    //     return {
    //         success: true,
    //         massage: 'Push notification send successfully.'
    //     };
    // }

    public async delete({ request }: HttpContextContract) {

        const language = request.header('language') || 'en'

        const payload = request.all()

        if (payload.id && payload.id.length != 0) {

            await NotificationRepo.delete(payload.id)
            return {
                success: true,
                massage: SUCCESS.NOTIFICATION_DELETE[language]
            };
        } else {
            return {
                success: true,
                massage: SUCCESS.NOTIFICATION_ERROR[language]
            };
        }

    }

    public async deleteAll({ request, response }: HttpContextContract) {

        const language = request.header('language') || 'en'
        let token = request.headers().authorization || ''

        if (token && token.startsWith("Bearer ")) token = token.slice(7, token.length);
        let userId
        if (token) {
            const decoded = await JWT.verify(token, JWT_SECRET_KEY, async (err, decodedData) => {
                if (err) return false
                return decodedData
            })

            if (!decoded) return response.status(422).send({
                msg: `JWT Expired`
            })
            userId = decoded.id
        }

        await NotificationRepo.deleteAll(userId)
        return {
            success: true,
            massage: SUCCESS.NOTIFICATION_DELETE[language]
        };
    }
}
