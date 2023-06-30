// import Exceptions from '../Exceptions'
// import Post from 'App/Models/Post'
import Database from '@ioc:Adonis/Lucid/Database'

export default class DashboardRepo {

    static async getProductCount() {
        const result = await Database.rawQuery(`SELECT count(id) as productCount FROM products`)
        return result[0]
    }

    static async getUserCount() {
        const result = await Database.rawQuery(`SELECT count(id) as userCount FROM users`)
        return result[0]
    }

    static async getAdminCount() {
        const result = await Database.rawQuery(`SELECT count(id) as adminCount FROM admins`)
        return result[0]
    }

    static async getCategoryCount() {
        const result = await Database.rawQuery(`SELECT count(id) as categoryCount, sum(case when active = "1" then 1 else 0 end) as active,
        sum(case when active = "0" then 1 else 0 end) as inActive
        FROM categories`)
        return result[0]
    }

    static async getSubCategoryCount() {
        const result = await Database.rawQuery(`SELECT count(id) as subCategoryCount, sum(case when active = "1" then 1 else 0 end) as active,
        sum(case when active = "0" then 1 else 0 end) as inActive
        FROM sub_categories`)
        return result[0]
    }

    static async getBrandCount() {
        const result = await Database.rawQuery(`SELECT count(id) as brandCount FROM brands`)
        return result[0]
    }

}
