const order = require("../../../models/order")

// const Order = require('../../../models/order')

function orderController() {
    return {
        index(req, res) {
           order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 }}).populate('customerId', '-password').exec((err, order) => {
               if(req.xhr) {
                   return res.json(order)
               } else {
                return res.render('admin/orders')
               }
           })
        }
    }
}

module.exports = orderController