// import Exceptions from '../Exceptions'
// import Post from 'App/Models/Post'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import Motorpost from 'App/Models/Motorpost'
import Rent from 'App/Models/Rent'
import { format, subYears, subMonths } from 'date-fns'

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

    static async getDailyUser() {
        var datetime: any = new Date();
        datetime = format(datetime, 'yyyy-MM-dd')
        const startDate = datetime

        const result = await User.query()
            .whereBetween('users.created_at', [`${startDate} 00:00:00`, `${startDate} 23:59:00`])
            .count('* as dailyUserCount')

        return result
    }

    static async getWeekUser() {
        var datetime = new Date();
        var startDate = format(datetime, 'yyyy-MM-dd')

        var endDate: any = subMonths(datetime, 1);
        endDate = format(endDate, 'yyyy-MM-dd')

        const result = await User.query()
            .whereBetween('users.created_at', [`${endDate} 00:00:00`, `${startDate} 23:59:00`])
            .count('* as weeklyUserCount')

        return result
    }

    static async getYearUser() {
        var datetime = new Date();
        var startDate = format(datetime, 'yyyy-MM-dd')

        var endDate: any = subYears(datetime, 1);
        endDate = format(endDate, 'yyyy-MM-dd')

        const result = await User.query()
            .whereBetween('users.created_at', [`${endDate} 00:00:00`, `${startDate} 23:59:00`])
            .count('* as yearlyUserCount')

        return result
    }

    static async getDailyMotorPost() {
        var datetime: any = new Date();
        datetime = format(datetime, 'yyyy-MM-dd')
        const startDate = datetime

        const result = await Motorpost.query()
            .where('motor_posts.is_approve', 1)
            .where('motor_posts.active', 1)
            .where('motor_posts.update_status_level', 3)
            .whereBetween('motor_posts.created_at', [`${startDate} 00:00:00`, `${startDate} 23:59:00`])
            .count('* as dailyMotorPostCount')

        return result
    }

    static async getWeekMotorPost() {
        var datetime: any = new Date();
        var startDate: any = format(datetime, 'yyyy-MM-dd')

        var endDate: any = subMonths(datetime, 1);
        endDate = format(endDate, 'yyyy-MM-dd')

        const result = await Motorpost.query()
            .where('motor_posts.is_approve', 1)
            .where('motor_posts.active', 1)
            .where('motor_posts.update_status_level', 3)
            .whereBetween('motor_posts.created_at', [`${endDate} 00:00:00`, `${startDate} 23:59:00`])
            .count('* as weeklyMotorPostCount')

        return result
    }

    static async getYearMotorPost() {
        var datetime: any = new Date();
        var startDate: any = format(datetime, 'yyyy-MM-dd')

        var endDate: any = subYears(datetime, 1);
        endDate = format(endDate, 'yyyy-MM-dd')

        const result = await Motorpost.query()
            .where('motor_posts.is_approve', 1)
            .where('motor_posts.active', 1)
            .where('motor_posts.update_status_level', 3)
            .whereBetween('motor_posts.created_at', [`${endDate} 00:00:00`, `${startDate} 23:59:00`])
            .count('* as yearlyMotorPostCount')

        return result
    }

    static async getDailyPropertyPost() {
        var datetime: any = new Date();
        datetime = format(datetime, 'yyyy-MM-dd')
        const startDate: any = datetime

        const result = await Rent.query()
            .where('rents.is_approve', 1)
            .where('rents.active', 1)
            .where('rents.update_status_level', 4)
            .whereBetween('rents.created_at', [`${startDate} 00:00:00`, `${startDate} 23:59:00`])
            .count('* as dailyPropertyPostCount')

        return result
    }

    static async getWeekPropertyPost() {
        var datetime: any = new Date();
        var startDate: any = format(datetime, 'yyyy-MM-dd')

        var endDate: any = subMonths(datetime, 1);
        endDate = format(endDate, 'yyyy-MM-dd')

        const result = await Rent.query()
            .where('rents.is_approve', 1)
            .where('rents.active', 1)
            .where('rents.update_status_level', 4)
            .whereBetween('rents.created_at', [`${endDate} 00:00:00`, `${startDate} 23:59:00`])
            .count('* as weeklyPropertyCount')

        return result
    }

    static async getYearPropertyPost() {
        var datetime: any = new Date();
        var startDate: any = format(datetime, 'yyyy-MM-dd')

        var endDate: any = subYears(datetime, 1);
        endDate = format(endDate, 'yyyy-MM-dd')

        const result = await Rent.query()
            .where('rents.is_approve', 1)
            .where('rents.active', 1)
            .where('rents.update_status_level', 4)
            .whereBetween('rents.created_at', [`${endDate} 00:00:00`, `${startDate} 23:59:00`])
            .count('* as yearlyPropertyCount')

        return result
    }

    static async getDailyMotorPostCount() {
        var datetime: any = new Date();
        datetime = format(datetime, 'yyyy-MM-dd')
        const startDate: any = datetime

        const result = await Database.rawQuery(`SELECT Count(*) as total, SUM(main_motor_category_id = 1) as usedCarCount,
        SUM(main_motor_category_id = 2) as motorCycleCount, 
        SUM(main_motor_category_id = 3) as heavyEquipmentCount, 
        SUM(main_motor_category_id = 4) as boatCount FROM motor_posts where is_approve =1 and active =1 and update_status_level =3 and (created_at BETWEEN ${startDate} AND ${datetime})`)
        return result[0]
    }

    static async getWeekMotorPostCount() {
        var datetime: any = new Date();
        var startDate: any = format(datetime, 'yyyy-MM-dd')

        var endDate: any = subMonths(datetime, 1);
        endDate = format(endDate, 'yyyy-MM-dd')

        const result = await Database.rawQuery(`SELECT Count(*) as total, SUM(main_motor_category_id = 1) as usedCarCount,
        SUM(main_motor_category_id = 2) as motorCycleCount, 
        SUM(main_motor_category_id = 3) as heavyEquipmentCount, 
        SUM(main_motor_category_id = 4) as boatCount FROM motor_posts where is_approve =1 and active =1 and update_status_level =3 and (created_at BETWEEN ${startDate} AND ${endDate})`)
        return result[0]
    }

    static async getYearMotorPostCount() {
        var datetime: any = new Date();
        var startDate: any = format(datetime, 'yyyy-MM-dd')

        var endDate: any = subYears(datetime, 1);
        endDate = format(endDate, 'yyyy-MM-dd')

        const result = await Database.rawQuery(`SELECT Count(*) as total, SUM(main_motor_category_id = 1) as usedCarCount,
        SUM(main_motor_category_id = 2) as motorCycleCount, 
        SUM(main_motor_category_id = 3) as heavyEquipmentCount, 
        SUM(main_motor_category_id = 4) as boatCount FROM motor_posts where is_approve =1 and active =1 and update_status_level =3 and (created_at BETWEEN ${startDate} AND ${endDate})`)
        return result[0]
    }

    static async getDailyRentPostCount() {
        var datetime: any = new Date();
        datetime = format(datetime, 'yyyy-MM-dd')
        const startDate: any = datetime

        const result = await Database.rawQuery(`SELECT Count(*) as total, SUM(category_id = 7) as apartmentCount,
        SUM(category_id = 8) as villaCount, 
        SUM(category_id = 9) as commercialCount,
        SUM(category_id = 10) as villaCompoundCount,
        SUM(category_id = 11) as penthouseCount,
        SUM(category_id = 12) as residentialBuildingCount,
        SUM(category_id = 13) as landCount,
        SUM(category_id = 14) as roomsForRentCount,
        SUM(category_id = 15) as warehouseCount FROM rents where is_approve =1 and active =1 and update_status_level =4 and (created_at BETWEEN ${startDate} AND ${datetime})`)
        return result[0]
    }

    static async getWeekRentPostCount() {
        var datetime: any = new Date();
        var startDate: any = format(datetime, 'yyyy-MM-dd')

        var endDate: any = subMonths(datetime, 1);
        endDate = format(endDate, 'yyyy-MM-dd')

        const result = await Database.rawQuery(`SELECT Count(*) as total, SUM(category_id = 7) as apartmentCount,
        SUM(category_id = 8) as villaCount, 
        SUM(category_id = 9) as commercialCount,
        SUM(category_id = 10) as villaCompoundCount,
        SUM(category_id = 11) as penthouseCount,
        SUM(category_id = 12) as residentialBuildingCount,
        SUM(category_id = 13) as landCount,
        SUM(category_id = 14) as roomsForRentCount,
        SUM(category_id = 15) as warehouseCount FROM rents where is_approve =1 and active =1 and update_status_level =4 and (created_at BETWEEN ${startDate} AND ${endDate})`)
        return result[0]
    }

    static async getYearRentPostCount() {
        var datetime: any = new Date();
        var startDate: any = format(datetime, 'yyyy-MM-dd')

        var endDate: any = subYears(datetime, 1);
        endDate = format(endDate, 'yyyy-MM-dd')

        const result = await Database.rawQuery(`SELECT Count(*) as total, SUM(category_id = 7) as apartmentCount,
        SUM(category_id = 8) as villaCount, 
        SUM(category_id = 9) as commercialCount,
        SUM(category_id = 10) as villaCompoundCount,
        SUM(category_id = 11) as penthouseCount,
        SUM(category_id = 12) as residentialBuildingCount,
        SUM(category_id = 13) as landCount,
        SUM(category_id = 14) as roomsForRentCount,
        SUM(category_id = 15) as warehouseCount FROM rents where is_approve =1 and active =1 and update_status_level =4 and (created_at BETWEEN ${startDate} AND ${endDate})`)
        return result[0]
    }

    static async getDailySalePostCount() {
        var datetime: any = new Date();
        datetime = format(datetime, 'yyyy-MM-dd')
        const startDate: any = datetime

        const result = await Database.rawQuery(`SELECT Count(*) as total, SUM(category_id = 16) as apartmentCount,
        SUM(category_id = 17) as villaCount, 
        SUM(category_id = 18) as commercialCount,
        SUM(category_id = 19) as villaCompoundCount,
        SUM(category_id = 20) as penthouseCount,
        SUM(category_id = 21) as residentialBuildingCount,
        SUM(category_id = 22) as landCount,
        SUM(category_id = 24) as warehouseCount FROM rents where is_approve =1 and active =1 and update_status_level =4 and (created_at BETWEEN ${startDate} AND ${datetime})`)
        return result[0]
    }

    static async getWeekSalePostCount() {
        var datetime: any = new Date();
        var startDate: any = format(datetime, 'yyyy-MM-dd')

        var endDate: any = subMonths(datetime, 1);
        endDate = format(endDate, 'yyyy-MM-dd')

        const result = await Database.rawQuery(`SELECT Count(*) as total, SUM(category_id = 16) as apartmentCount,
        SUM(category_id = 17) as villaCount, 
        SUM(category_id = 18) as commercialCount,
        SUM(category_id = 19) as villaCompoundCount,
        SUM(category_id = 20) as penthouseCount,
        SUM(category_id = 21) as residentialBuildingCount,
        SUM(category_id = 22) as landCount,
        SUM(category_id = 24) as warehouseCount FROM rents where is_approve =1 and active =1 and update_status_level =4 and (created_at BETWEEN ${startDate} AND ${endDate})`)
        return result[0]
    }

    static async getYearSalePostCount() {
        var datetime: any = new Date();
        var startDate: any = format(datetime, 'yyyy-MM-dd')

        var endDate: any = subYears(datetime, 1);
        endDate = format(endDate, 'yyyy-MM-dd')

        const result = await Database.rawQuery(`SELECT Count(*) as total, SUM(category_id = 16) as apartmentCount,
        SUM(category_id = 17) as villaCount, 
        SUM(category_id = 18) as commercialCount,
        SUM(category_id = 19) as villaCompoundCount,
        SUM(category_id = 20) as penthouseCount,
        SUM(category_id = 21) as residentialBuildingCount,
        SUM(category_id = 22) as landCount,
        SUM(category_id = 24) as warehouseCount FROM rents where is_approve =1 and active =1 and update_status_level =4 and (created_at BETWEEN ${startDate} AND ${endDate})`)
        return result[0]
    }

}
