import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { SettingsDomain } from "../../Domain";
import { SettingsRepo } from "../../Repositories";
import Validators from "../../Validators";
import { SUCCESS } from "../../Data/language";
// import Setting from 'App/Models/Setting'

export default class SettingsController {

    public async get() {

        return {
            success: true,
            data: SettingsDomain.createFromArrOfObject(
                await SettingsRepo.get()
            ),
        };
    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(Validators.SettingValidator);

        const language = request.header('language') || 'en'
        const proposalDetails = await SettingsRepo.create(payload, language);

        return {
            success: true,
            result: SettingsDomain.createFromObject(proposalDetails),
            massage: SUCCESS.SETTING_CREATE[language]
        };
    }

    public async update({ request, params }: HttpContextContract) {
        const UpdatePost = request.all()

        const language = request.header('language') || 'en'
        await SettingsRepo.isEntryExist(params.id, language);

        const updateResult = SettingsDomain.createFromObject(
            await SettingsRepo.update(params.id, UpdatePost, language)
        );
        return {
            success: true,
            result: updateResult,
            massage: SUCCESS.SETTING_CREATE[language]
        };
    }

    public async delete({ request, params }: HttpContextContract) {
        // const { postId } = await request.validate(
        //     Validators.DeletePost
        // );
        const language = request.header('language') || 'en'
        const result = await SettingsRepo.isEntryExist(params.id, language);

        await SettingsRepo.delete({ active: 0 }, result, language);
        return {
            success: true,
            massage: SUCCESS.SETTING_DELETE[language]
        }
    }

    public async getUrl({ request }: HttpContextContract) {

        const language = request.header('language') || 'en'
        let setting = SettingsDomain.createFromArrOfObject(
            await SettingsRepo.adminGet(1)
        )

        let whatsAppNumber
        let countryCode
        let enSupportUrl
        let arSupportUrl
        let enAbout
        let arAbout
        let enTermsAndCondition
        let arTermsAndCondition
        let enPrivacyPolicy
        let arPrivacyPolicy
        let enFaq
        let arFaq
        let enEmail
        let arEmail
        let enCall
        let arCall
        let enPopupAdvertisement
        let arPopupAdvertisement

        if (setting.length != 0) {
            await setting.map((data) => {
                if (data.key == 'whatsAppNumber') {
                    whatsAppNumber = data.enValue
                } else if (data.key == 'countryCode') {
                    countryCode = data.enValue

                } else if (data.key == 'supportUrl') {
                    enSupportUrl = data.enValue
                    arSupportUrl = data.arValue

                } else if (data.key == 'about') {
                    enAbout = data.enValue
                    arAbout = data.arValue

                } else if (data.key == 'termsAndCondition') {
                    enTermsAndCondition = data.enValue
                    arTermsAndCondition = data.arValue

                } else if (data.key == 'privacyPolicy') {
                    enPrivacyPolicy = data.enValue
                    arPrivacyPolicy = data.arValue

                } else if (data.key == 'faq') {
                    enFaq = data.enValue
                    arFaq = data.arValue

                } else if (data.key == 'email') {
                    enEmail = data.enValue
                    arEmail= data.arValue

                } else if (data.key == 'call') {
                    enCall = data.enValue
                    arCall = data.arValue

                }  else if (data.key == 'popupAdvertisement') {
                    enPopupAdvertisement = data.enValue
                    arPopupAdvertisement = data.arValue

                }
            })
        }

        return {
            success: true,
            // result: result,
            data: {
                support: language == 'en' ? enSupportUrl : arSupportUrl,
                about: language == 'en' ? enAbout : arAbout,
                termsAndCondition: enTermsAndCondition,
                termsAndCondition_ar: arTermsAndCondition,
                privacyPolicy: language == 'en' ? enPrivacyPolicy : arPrivacyPolicy,
                privacyPolicy_ar: 'https://www.google.com',
                faq: language == 'en' ? enFaq : arFaq,
                whatsAppNumber: whatsAppNumber,
                countryCode: countryCode,
                email: language == 'en' ? enEmail : arEmail,
                call: language == 'en' ? enCall : arCall,
                popupAdvertisement: language == 'en' ? enPopupAdvertisement : arPopupAdvertisement,
            },
        };
    }

    public async adminGet({ request }: HttpContextContract) {
        const payload = request.all()

        return {
            success: true,
            data: SettingsDomain.createFromArrOfObject(
                await SettingsRepo.adminGet(payload.active)
            ),
        };
    }
}
