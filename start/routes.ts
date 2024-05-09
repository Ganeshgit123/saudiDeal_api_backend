/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// test Route
Route.get('/', async () => {
  return "wellcome to Saudideals..."
})

// Admin Routes
Route.group(() => {

  // admin Auth login and logout API
  Route.post('/login', 'AdminsController.login')
  Route.get('/logout', 'AdminsController.logout')
  Route.post('/changePassword', 'AdminsController.changePassword').middleware('auth')
  Route.get('/contact', 'ContactsController.adminGet')

  Route.group(() => {
    Route.post('/send', 'NotificationsController.create')
  }).prefix('/notification')

  Route.group(() => {
    Route.get('/', 'MotorpostsController.adminGet')
    Route.get('/expiryPost', 'MotorpostsController.adminExpiryGet')
    Route.post('/:id', 'MotorpostsController.update')
    Route.delete('/:id', 'MotorpostsController.delete')
  }).prefix('/motorPost')

  // admin role type
  Route.group(() => {
    Route.get('/', 'RolesController.get')
    Route.post('/', 'RolesController.create')
    Route.post('/:id', 'RolesController.update')
    Route.delete('/:id', 'RolesController.delete')
  }).prefix('/roleType').middleware('auth')

  //category crud API
  Route.group(() => {
    Route.get('/', 'CategoriesController.adminGet')
    Route.post('/', 'CategoriesController.create').middleware('auth')
    Route.post('/:id', 'CategoriesController.update').middleware('auth')
    Route.delete('/:id', 'CategoriesController.delete').middleware('auth')
    Route.delete('/delete/:id', 'CategoriesController.categoriesDelete').middleware('auth')
  }).prefix('/category')

  // subCategory crud API
  Route.group(() => {
    Route.get('/', 'SubCategoriesController.adminGet')
    Route.post('/', 'SubCategoriesController.create')
    Route.post('/:id', 'SubCategoriesController.update')
    Route.delete('/:id', 'SubCategoriesController.delete')
    Route.delete('/delete/:id', 'SubCategoriesController.categoriesDelete')
  }).prefix('/subCategory').middleware('auth')

  // user API
  Route.group(() => {
    Route.get('/', 'UsersController.getAllUser')
    Route.post('/update/:id', 'UsersController.adminUpdate').middleware('auth')
  }).prefix('/user')

  // dashboard API
  Route.group(() => {
    Route.get('/', 'DashboardController.get')
  }).prefix('/dashboard').middleware('auth')

  Route.group(() => {
    Route.get('/', 'MotorSubCategoriesController.adminGet')
    Route.post('/', 'MotorSubCategoriesController.create')
    Route.post('/:id', 'MotorSubCategoriesController.update')
  }).prefix('/motorSubCategory')

  Route.group(() => {
    Route.get('/', 'MotorCategoriesController.adminGet')
    Route.post('/', 'MotorCategoriesController.create')
    Route.post('/:id', 'MotorCategoriesController.update')
  }).prefix('/motorCategory')

  Route.group(() => {
    Route.get('/', 'MotorsController.adminGet')
    Route.post('/', 'MotorsController.create')
    Route.post('/:id', 'MotorsController.update')
  }).prefix('/motor')

  // brand curd API
  Route.group(() => {
    Route.get('/', 'BrandsController.adminGet')
    Route.post('/', 'BrandsController.create')
    Route.post('/:id', 'BrandsController.update')
    Route.delete('/:id', 'BrandsController.delete')
    Route.delete('/delete/:id', 'BrandsController.brandDelete')
  }).prefix('/brand')

  // model curd API
  Route.group(() => {
    Route.get('/', 'ModelsController.adminGet')
    Route.post('/', 'ModelsController.create')
    Route.post('/:id', 'ModelsController.update')
    Route.delete('/:id', 'ModelsController.delete')
    Route.delete('/delete/:id', 'ModelsController.modelDelete')
  }).prefix('/model')

  // Province curd API
  Route.group(() => {
    Route.get('/', 'ProvincesController.adminGet')
    Route.post('/', 'ProvincesController.create')
    Route.post('/:id', 'ProvincesController.update')
    Route.delete('/:id', 'ProvincesController.delete')
    Route.delete('/delete/:id', 'ProvincesController.provinceDelete')
  }).prefix('/province')

  // City curd API
  Route.group(() => {
    Route.get('/', 'CitiesController.adminGet')
    Route.post('/', 'CitiesController.create')
    Route.post('/:id', 'CitiesController.update')
    Route.delete('/:id', 'CitiesController.delete')
    Route.delete('/delete/:id', 'CitiesController.cityDelete')
  }).prefix('/city')

  // Rent Admin API
  Route.group(() => {
    Route.get('/', 'RentsController.adminGet')
    Route.get('/expiryPost', 'RentsController.adminExpiryGet')
    Route.post('/:id', 'RentsController.update')
    Route.delete('/:id', 'RentsController.delete')
  }).prefix('/rent')


  // Rent Category curd API
  Route.group(() => {
    Route.get('/', 'RentCategoriesController.get')
    Route.post('/', 'RentCategoriesController.create')
    Route.post('/:id', 'RentCategoriesController.update')
    Route.delete('/:id', 'RentCategoriesController.delete')
    Route.delete('/delete/:id', 'RentCategoriesController.rentCategoryDelete')
  }).prefix('/rentCategory')

  // Subscription curd API
  Route.group(() => {
    Route.get('/', 'SubscriptionsController.adminGet')
    Route.post('/', 'SubscriptionsController.create')
    Route.post('/:id', 'SubscriptionsController.update')
    Route.delete('/:id', 'SubscriptionsController.delete')
    Route.delete('/delete/:id', 'SubscriptionsController.subscriptionDelete')
  }).prefix('/subscription')

  // Trim curd API
  Route.group(() => {
    Route.get('/', 'TrimsController.adminGet')
    Route.post('/', 'TrimsController.create')
    Route.post('/:id', 'TrimsController.update')
    Route.delete('/:id', 'TrimsController.delete')
    Route.delete('/delete/:id', 'TrimsController.trimDelete')
  }).prefix('/trim')

  // Trim curd API
  Route.group(() => {
    Route.get('/', 'MasterTrimsController.adminGet')
    Route.post('/', 'MasterTrimsController.create')
    Route.post('/:id', 'MasterTrimsController.update')
  }).prefix('/masterTrim')

  // Translation String curd API
  Route.group(() => {
    Route.get('/', 'TranslationStringsController.adminGet')
    Route.post('/', 'TranslationStringsController.create')
    Route.post('/:id', 'TranslationStringsController.update')
    Route.delete('/:id', 'TranslationStringsController.delete')
    Route.delete('/delete/:id', 'TranslationStringsController.translationStringDelete')
  }).prefix('/translationString')

  Route.group(() => {
    Route.get('/', 'SettingsController.adminGet')
    Route.post('/', 'SettingsController.create')
    Route.post('/:id', 'SettingsController.update')
    Route.delete('/:id', 'SettingsController.delete')
  }).prefix('/setting')

  // admin crud API
  Route.get('/:id', 'AdminsController.getAdminList').middleware('auth')
  Route.post('/', 'AdminsController.createAdmin').middleware('auth')
  Route.post('/:id', 'AdminsController.updateAdmin').middleware('auth')
  Route.delete('/:id', 'AdminsController.deleteAdmin').middleware('auth')


}).prefix('/v1/admin')

//user Routes
Route.group(() => {

  Route.get('/category', 'CategoriesController.get')
  Route.get('/subCategory', 'SubCategoriesController.get')
  Route.get('/banner', 'BannersController.get')
  Route.get('/rentCategory', 'RentCategoriesController.get')
  Route.get('/home', 'HomeController.get')
  Route.get('/subscription', 'SubscriptionsController.get')
  Route.get('/motorPostCount', 'MotorpostsController.getMotorPostCount')
  Route.get('/rentPostCount', 'RentsController.getRentPostCount')
  Route.get('/url', 'SettingsController.getUrl')

  Route.group(() => {
    Route.post('/', 'ContactsController.create')
  }).prefix('/contact')

  // Subscription List curd API
  Route.group(() => {
    Route.get('/', 'SubscriptionListsController.get')
    Route.get('/check', 'SubscriptionListsController.checkSubscriptionList')
    Route.post('/', 'SubscriptionListsController.create')
  }).prefix('/subscriptionList')

  Route.group(() => {
    Route.get('/', 'NotificationsController.get')
    Route.get('/readAll', 'NotificationsController.readAll')
    Route.patch('/:id', 'NotificationsController.update')
    Route.delete('/', 'NotificationsController.delete')
    Route.delete('/deleteAll', 'NotificationsController.deleteAll')
  }).prefix('/notification')

  // brand list API
  Route.group(() => {
    Route.get('/', 'BrandsController.get')
  }).prefix('/brand')

  // trime list API
  Route.group(() => {
    Route.get('/', 'TrimsController.get')
  }).prefix('/trim')

  // model list API
  Route.group(() => {
    Route.get('/:id', 'ModelsController.get')
  }).prefix('/model')

  // Province list API
  Route.group(() => {
    Route.get('/', 'ProvincesController.get')
  }).prefix('/province')


  // City list API
  Route.group(() => {
    Route.get('/:id', 'CitiesController.get')
  }).prefix('/city')

  Route.group(() => {
    Route.get('/myPost', 'MotorpostsController.get')
    Route.get('/', 'MotorpostsController.getAllPost')
    Route.post('/', 'MotorpostsController.create')
    Route.post('/:id', 'MotorpostsController.update')
    Route.delete('/:id', 'MotorpostsController.delete')
  }).prefix('/motorPost')

  Route.group(() => {
    Route.get('/list', 'AddressesController.get')
    Route.post('/', 'AddressesController.create')
    Route.post('/:id', 'AddressesController.update')
    Route.delete('/:id', 'AddressesController.delete')
    // Route.delete('/delete/:id', 'AddressesController.addressDelete')
  }).prefix('/address')

  Route.group(() => {

    Route.group(() => {
      Route.get('/', 'RecentViewedProductsController.get')
      Route.post('/', 'RecentViewedProductsController.create')
    }).prefix('/recentViewedProduct')

    // Route.group(() => {
    //   Route.get('/list', 'FavouritesController.get')
    //   Route.post('/', 'FavouritesController.favourites')
    // }).prefix('/favourites')

    Route.group(() => {
      Route.get('/get', 'OrdersController.get')
      Route.post('/', 'OrdersController.create')
      Route.post('/:id', 'OrdersController.update')
    }).prefix('/order')

  }).prefix('/product')

  Route.group(() => {
    Route.get('/:id', 'ReviewsController.get')
    Route.post('/', 'ReviewsController.create')
    Route.post('/:id', 'ReviewsController.update')
    Route.delete('/:id', 'ReviewsController.delete')
    Route.delete('/delete/:id', 'ReviewsController.reviewDelete')
  }).prefix('/review')

  Route.group(() => {
    Route.get('/list', 'RentFavouritesController.get')
    Route.post('/', 'RentFavouritesController.favourites')
  }).prefix('/rentFavourites')

  Route.group(() => {
    Route.get('/', 'RentViewedProductsController.get')
    Route.post('/', 'RentViewedProductsController.create')
  }).prefix('/rentViewedProduct')

  Route.group(() => {
    Route.get('/list', 'MotorFavouritesController.get')
    Route.post('/', 'MotorFavouritesController.favourites')
  }).prefix('/motorFavourites')

  Route.group(() => {
    Route.get('/', 'MotorViewedProductsController.get')
    Route.post('/', 'MotorViewedProductsController.create')
  }).prefix('/motorViewedProduct')

  Route.group(() => {
    Route.post('/createUser', 'AuthController.create')
    Route.post('/sendOtp', 'AuthController.sendOtp')
    Route.post('/verifyOtp', 'AuthController.verifyOtp')
    Route.get('/logout', 'AuthController.logout').middleware('auth')
  }).prefix('/auth')

  Route.group(() => {
    Route.get('/:id', 'MotorSubCategoriesController.get')
  }).prefix('/motorSubCategory')

  Route.group(() => {
    Route.get('/:id', 'MotorCategoriesController.get')
  }).prefix('/motorCategory')

  Route.group(() => {
    Route.get('/', 'MotorsController.get')
  }).prefix('/motor')

  Route.get('/', 'UsersController.get')
  Route.get('/getUser', 'UsersController.getUserById')
  Route.post('/', 'UsersController.create').middleware('auth')
  Route.post('/update', 'UsersController.update').middleware('auth')

  // Rent curd API
  Route.group(() => {
    Route.get('/myPost', 'RentsController.get')
    Route.get('/', 'RentsController.getAllPost')
    Route.post('/:id', 'RentsController.update')
    Route.delete('/:id', 'RentsController.delete')
    Route.delete('/delete/:id', 'RentsController.rentDelete')
    Route.post('/', 'RentsController.create')
  }).prefix('/rent')

}).prefix('/v1/user')