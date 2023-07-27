import Exceptions from '../Exceptions'
import Subscription from 'App/Models/Subscription'
import { FAILURE } from "../Data/language";

export default class SubscriptionRepo {

    static async get(type, userType) {
        const result = await Subscription.query().where('active', 1)
            .if(type, (query) =>
                query.where('subscriptions.type', type))
            .if(userType, (query) =>
                query.where('subscriptions.user_type', userType))
        return result
    }

    static async create(data: any, language: string) {
        const result = await Subscription.create(data)
        if (!result) throw Exceptions.notFound(FAILURE.SUBSCRIPTION_CREATE[language])
        return result
    }

    static async update(id: number, data: any, language: string) {
        try {
            const subscription = await Subscription.findOrFail(id)
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
        const result = await Subscription.query().where('id', id).first()
        if (!result) throw Exceptions.notFound(FAILURE.SUBSCRIPTION_DELETE_CONFLICT[language])
        return result
    }

    static async adminGet(active, subscriptionId, type, userType) {
        const result = await Subscription.query()
            .select('subscriptions.*')
            .orderBy('subscriptions.id', "desc")
            .if(active, (query) =>
                query.where('subscriptions.active', active))
            .if(subscriptionId, (query) =>
                query.where('subscriptions.id', subscriptionId))
            .if(type, (query) =>
                query.where('subscriptions.type', type))
            .if(userType, (query) =>
                query.where('subscriptions.user_type', userType))
        return result
    }

}
