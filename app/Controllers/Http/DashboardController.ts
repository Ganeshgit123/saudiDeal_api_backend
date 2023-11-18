// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DashboardRepo } from "../../Repositories";

export default class DashboardController {

    public async get() {

        const motorCount = await DashboardRepo.getMotorCount()
        const rentCount = await DashboardRepo.getRentCount()
        const sellCount = await DashboardRepo.getSellCount()
        const propertiesCount = await DashboardRepo.getPropertiesCount()
        const userCount = await DashboardRepo.getUserCount()
        // const adminCount = await DashboardRepo.getAdminCount()

        return {
            success: true,
            data: [{
                motorCount: motorCount[0],
                userCount: userCount[0],
                rentCount: rentCount[0],
                sellCount: sellCount[0],
                propertiesCount: propertiesCount[0],
                // brandCount: brandCount[0]
            }]
        };
    }
}
