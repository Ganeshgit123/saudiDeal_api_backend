// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DashboardRepo } from "../../Repositories";

export default class DashboardController {

    public async get() {

        const productCount = await DashboardRepo.getProductCount()
        const categoryCount = await DashboardRepo.getCategoryCount()
        const subCategoryCount = await DashboardRepo.getSubCategoryCount()
        const brandCount = await DashboardRepo.getBrandCount()
        const userCount = await DashboardRepo.getUserCount()
        const adminCount = await DashboardRepo.getAdminCount()

        return {
            success: true,
            data: [{
                productCount: productCount[0],
                userCount: userCount[0],
                adminCount: adminCount[0],
                categoryCount: categoryCount[0],
                subCategoryCount: subCategoryCount[0],
                brandCount: brandCount[0]
            }]
        };
    }
}
