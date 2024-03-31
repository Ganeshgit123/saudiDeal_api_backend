import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Validators from "../../Validators";
import { SubscriptionListsDomain } from "../../Domain";
import { SUCCESS } from "../../Data/language";
import { SubscriptionListRepo } from "../../Repositories";
import Subscription from 'App/Models/Subscription'

export default class SubscriptionListsController {

    public async get({ request }: HttpContextContract) {
        const payload = request.all()
        const userId = request.header('userId') || 0
        const subscriptionId = payload.subscriptionId
        return {
            success: true,
            data: SubscriptionListsDomain.createFromArrOfObject(
                await SubscriptionListRepo.get(userId, subscriptionId)
            ),
        };
    }

    public async checkSubscriptionList({ request }: HttpContextContract) {
        const userId = request.header('userId') || 0
        const payload = request.all()
        const type = payload.type || 'RENT'
        
        return {
            success: true,
            data: SubscriptionListsDomain.createFromArrOfObject(
                await SubscriptionListRepo.checkSubscriptionList(userId, type)
            ),
        };
    }

    public async create({ request }: HttpContextContract) {

        const payload = await request.validate(Validators.SubscriptionListValidator);

        // let payload = request.all();

        const language = request.header('language') || 'en'
        const SubscriptionDetails = await SubscriptionListRepo.create(payload, language);

        return {
            success: true,
            result: SubscriptionListsDomain.createFromObject(SubscriptionDetails),
            massage: SUCCESS.SUBSCRIPTION_LIST_CREATE[language]
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdatePost = request.all()

        const language = request.header('language') || 'en'
        await SubscriptionListRepo.isEntryExist(params.id, language);

        const updateResult = SubscriptionListsDomain.createFromObject(
            await SubscriptionListRepo.update(params.id, UpdatePost, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.SUBSCRIPTION_UPDATE[language]
        };
    }

    public async delete({ request, params }: HttpContextContract) {
        const language = request.header('language') || 'en'
        const result = await SubscriptionListRepo.isEntryExist(params.id, language);

        await SubscriptionListRepo.delete({ active: 0 }, result, language);
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
        return {
            success: true,
            data: SubscriptionListsDomain.createFromArrOfObject(
                await SubscriptionListRepo.adminGet(payload.active, payload.subscriptionId)
            ),
        };
    }
}
