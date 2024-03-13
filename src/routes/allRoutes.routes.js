const userRoute = require('./User/user.routes');
const menuRoute = require('./Menu/menu.routes');
const orderRoute = require('./Order/order.routes');

// Admin Routes
const log = require('./Admin/log.routes');

exports.allRoute = {
    userRoute: userRoute,
    menuRoute: menuRoute,
    orderRoute: orderRoute,
    admin : {
        log : log
    }
}