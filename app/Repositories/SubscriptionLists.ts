import Exceptions from '../Exceptions'
import SubscriptionList from 'App/Models/SubscriptionList'
import { FAILURE } from "../Data/language";

export default class SubscriptionListRepo {

    static async get() {
        const result = await SubscriptionList.query()
        return result
    }

    static async create(data: any, language: string) {
        const result = await SubscriptionList.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.SUBSCRIPTION_CREATE[language])
        return result
    }

    static async update(id: number, data: any, language: string) {
        try {
            const subscription = await SubscriptionList.findOrFail(id)
            subscription.merge(data)
            await subscription.save()

            return subscription
        } catch (error) {
            throw Exceptions.conflict(FAILURE.SUBSCRIPTION_CONFLICT[language])
        }
    }

    static async delete(data: any, Subscription, language: string) {
        Subscription.active = data.active
        await Subscription.save()
        if (!Subscription.$isPersisted)
            throw Exceptions.notFound(FAILURE.SUBSCRIPTION_DELETE_CONFLICT[language])
        return Subscription
    }

    static async isEntryExist(id: number, language) {
        const result = await SubscriptionList.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.SUBSCRIPTION_DELETE_CONFLICT[language])
        return result
    }

    static async adminGet(active, subscriptionId) {
        const result = await SubscriptionList.query()
            .select('subscriptions.*')
            .orderBy('subscriptions.id', "desc")
            .if(active, (query) =>
                query.where('subscriptions.active', active))
            .if(subscriptionId, (query) =>
                query.where('subscriptions.id', subscriptionId))
        return result
    }

}
