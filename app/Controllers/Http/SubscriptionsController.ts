import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { SubscriptionDomain } from "../../Domain";
import { SUCCESS } from "../../Data/language";
import { SubscriptionRepo } from "../../Repositories";
import Subscription from 'App/Models/Subscription'

export default class SubscriptionsController {

    public async get({ request }: HttpContextContract) {
        const payload = request.all()
        let type = payload.type || ''
        let userType = payload.userType || ''

        return {
            success: true,
            data: SubscriptionDomain.createFromArrOfObject(
                await SubscriptionRepo.get(type, userType)
            ),
        };
    }

    public async create({ request }: HttpContextContract) {

        const payload = await request.validate(Validators.SubscriptionValidator);

        // let payload = request.all();

        const language = request.header('language') || 'en'
        const SubscriptionDetails = await SubscriptionRepo.create(payload, language);

        return {
            success: true,
            result: SubscriptionDomain.createFromObject(SubscriptionDetails),
            massage: SUCCESS.SUBSCRIPTION_CREATE[language]
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdatePost = request.all()

        const language = request.header('language') || 'en'
        await SubscriptionRepo.isEntryExist(params.id, language);

        const updateResult = SubscriptionDomain.createFromObject(
            await SubscriptionRepo.update(params.id, UpdatePost, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.SUBSCRIPTION_UPDATE[language]
        };
    }

    public async delete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'
        const result = await SubscriptionRepo.isEntryExist(params.id, language);

        await SubscriptionRepo.delete({ active: 0 }, result, language);
        return {
            success: true,
            massage: SUCCESS.SUBSCRIPTION_DELETE[language]
        };

    }

    public async subscriptionDelete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'

        const address = await Subscription.findOrFail(params.id)
        await address.delete()

        return {
            success: true,
            massage: SUCCESS.DELETE_SUBSCRIPTION[language]
        };

    }

    public async adminGet({ request }: HttpContextContract) {
        const payload = request.all()
        let type = payload.type || ''
        let userType = payload.userType || ''

        return {
            success: true,
            data: SubscriptionDomain.createFromArrOfObject(
                await SubscriptionRepo.adminGet(payload.active, payload.subscriptionId, type, userType)
            ),
        };
    }
}
