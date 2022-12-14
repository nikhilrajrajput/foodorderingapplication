const authController = require('../app/http/controllers/authController');
const homeController = require('../app/http/controllers/homeController');
const cartController=require('../app/http/controllers/customer/cartController');
const orderController = require('../app/http/controllers/customer/orderController');
const AdminOrderController = require('../app/http/controllers/admin/orderController');

//Middleware 
const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')
const admin = require('../app/http/middleware/admin')

function intiRoutes(app){
    // app.get('/', (req,res)=>{
    //     res.render('home')
    // })

    app.get('/', homeController().index)
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)
    app.post('/logout', authController().logout)

    app.get('/cart',cartController().cart)
    app.post('/update-cart', cartController().update)
    
    // Customer Routes
    app.post ('/orders',auth,orderController().store)

    app.get('/customers/orders',auth,orderController().index)

    // Admin routes

    app.get('/admin/orders', admin , AdminOrderController().index)
    



    
    

}

module.exports= intiRoutes;