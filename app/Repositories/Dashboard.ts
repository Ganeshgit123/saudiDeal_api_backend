// import Exceptions from '../Exceptions'
// import Post from 'App/Models/Post'
import Database from '@ioc:Adonis/Lucid/Database'

export default class DashboardRepo {

    static async getMotorCount() {
        const result = await Database.rawQuery(`SELECT count(id) as motorCount, sum(case when active = "1" then 1 else 0 end) as active,
        sum(case when active = "0" then 1 else 0 end) as inActive FROM motors`)
        return result[0]
    }

    static async getUserCount() {
        const result = await Database.rawQuery(`SELECT count(id) as userCount, sum(case when active = "1" then 1 else 0 end) as active,
        sum(case when active = "0" then 1 else 0 end) as inActive FROM users`)
        return result[0]
    }

    static async getRentCount() {
        const result = await Database.rawQuery(`SELECT count(id) as rentCount, sum(case when active = "1" then 1 else 0 end) as active,
        sum(case when active = "0" then 1 else 0 end) as inActive FROM rents where type = "RENT"`)
        return result[0]
    }

    static async getSellCount() {
        const result = await Database.rawQuery(`SELECT count(id) as sellCount, sum(case when active = "1" then 1 else 0 end) as active,
        sum(case when active = "0" then 1 else 0 end) as inActive FROM rents where type = "SELL"`)
        return result[0]
    }

    static async getPropertiesCount() {
        const result = await Database.rawQuery(`SELECT count(id) as propertiesCount, sum(case when active = "1" then 1 else 0 end) as active,
        sum(case when active = "0" then 1 else 0 end) as inActive FROM rents`)
        return result[0]
    }

    static async getBrandCount() {
        const result = await Database.rawQuery(`SELECT count(id) as userCount, sum(case when active = "1" then 1 else 0 end) as active,
        sum(case when active = "0" then 1 else 0 end) as inActive FROM users`)
        return result[0]
    }

}
