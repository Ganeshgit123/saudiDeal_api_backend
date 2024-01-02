// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DashboardRepo } from "../../Repositories";

export default class DashboardController {

    public async get() {

        const motorCount = await DashboardRepo.getMotorCount()
        const rentCount = await DashboardRepo.getRentCount()
        const sellCount = await DashboardRepo.getSellCount()
        const propertiesCount = await DashboardRepo.getPropertiesCount()
        const userCount = await DashboardRepo.getUserCount()
        const getDailyUser: any = await DashboardRepo.getDailyUser()
        const getWeekUser: any = await DashboardRepo.getWeekUser()
        const getYearUser: any = await DashboardRepo.getYearUser()
        const getDailyMotorPost: any = await DashboardRepo.getDailyMotorPost()
        const getWeekMotorPost: any = await DashboardRepo.getWeekMotorPost()
        const getYearMotorPost: any = await DashboardRepo.getYearMotorPost()

        const getDailyPropertyPost: any = await DashboardRepo.getDailyPropertyPost()
        const getWeekPropertyPost: any = await DashboardRepo.getWeekPropertyPost()
        const getYearPropertyPost: any = await DashboardRepo.getYearPropertyPost()


        const getDailyMotorPostCount: any = await DashboardRepo.getDailyMotorPostCount()
        const getWeekMotorPostCount: any = await DashboardRepo.getWeekMotorPostCount()
        const getYearMotorPostCount: any = await DashboardRepo.getYearMotorPostCount()

        const getDailyRentPostCount: any = await DashboardRepo.getDailyRentPostCount()
        const getWeekRentPostCount: any = await DashboardRepo.getWeekRentPostCount()
        const getYearRentPostCount: any = await DashboardRepo.getYearRentPostCount()

        const getDailySalePostCount: any = await DashboardRepo.getDailySalePostCount()
        const getWeekSalePostCount: any = await DashboardRepo.getWeekSalePostCount()
        const getYearSalePostCount: any = await DashboardRepo.getYearSalePostCount()

        
        return {
            success: true,
            data: [{
                motorCount: motorCount[0],
                userCount: userCount[0],
                rentCount: rentCount[0],
                sellCount: sellCount[0],
                propertiesCount: propertiesCount[0],
                dailyUserCount: getDailyUser ? getDailyUser[0].$extras.dailyUserCount : 0,
                weeklyUserCount: getWeekUser ? getWeekUser[0].$extras.weeklyUserCount : 0,
                yearlyUserCount: getYearUser ? getYearUser[0].$extras.yearlyUserCount : 0,
                dailyMotorPostCount: getDailyMotorPost ? getDailyMotorPost[0].$extras.dailyMotorPostCount : 0,
                weeklyMotorPostCount: getWeekMotorPost ? getWeekMotorPost[0].$extras.weeklyMotorPostCount : 0,
                yearlyMotorPostCount: getYearMotorPost ? getYearMotorPost[0].$extras.yearlyMotorPostCount : 0,
                dailyPropertyPostCount: getDailyPropertyPost ? getDailyPropertyPost[0].$extras.dailyPropertyPostCount : 0,
                weekPropertyPostCount: getWeekPropertyPost ? getWeekPropertyPost[0].$extras.weeklyPropertyCount : 0,
                yearPropertyPostCount: getYearPropertyPost ? getYearPropertyPost[0].$extras.yearlyPropertyCount : 0,
                getDailyMotorPostCount:getDailyMotorPostCount,
                getWeekMotorPostCount: getWeekMotorPostCount,
                getYearMotorPostCount: getYearMotorPostCount,
                getDailyRentPostCount: getDailyRentPostCount,
                getWeekRentPostCount: getWeekRentPostCount,
                getYearRentPostCount: getYearRentPostCount,
                getDailySalePostCount: getDailySalePostCount,
                getWeekSalePostCount: getWeekSalePostCount,
                getYearSalePostCount: getYearSalePostCount
            }]
        };
    }
}
