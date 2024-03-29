import Order from '../models/ordermodels.mjs';
import Product from '../models/productmodel.mjs';
import ErrorHander from "../utils/errorhander.mjs";
import catchAsyncErrors from "../middleware/catchAsyncErrors.mjs";

const newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
    } = req.body;
    
    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id,
    });
    
    res.status(201).json({
        success: true,
        order,
    });
    });

const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );
    
    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404));
    }
    
    res.status(200).json({
        success: true,
        order,
    });
    });

// const myOrders = catchAsyncErrors(async (req, res, next) => {
//     const orders = await Order.find({ user: req.user.id });
    
//     res.status(200).json({
//         success: true,
//         orders,
//     });
//     });

// const allOrders = catchAsyncErrors(async (req, res, next) => {
//     const orders = await Order.find();
    
//     let totalAmount = 0;
    
//     orders.forEach((order) => {
//         totalAmount += order.totalPrice;
//     });
    
//     res.status(200).json({
//         success: true,
//         totalAmount,
//         orders,
//     });
//     });

// const updateOrder = catchAsyncErrors(async (req, res, next) => {
//     const order = await Order.findById(req.params.id);
    
//     if (order.orderStatus === 'Delivered') {
//         return next(new ErrorHandler('You have already delivered this order', 400));
//     }
    
//     order.orderItems.forEach(async (item) => {
//         await updateStock(item.product, item.quantity);
//     });
    
//     order.orderStatus = req.body.status;
//     order.deliveredAt = Date.now();
    
//     await order.save();
    
//     res.status(200).json({
//         success: true,
//     });
//     });

// const deleteOrder = catchAsyncErrors(async (req, res, next) => {
//     const order = await Order.findById(req.params.id);
    
//     if (!order) {
//         return next(new ErrorHandler('No Order found with this ID', 404));
//     }
    
//     await order.remove();
    
//     res.status(200).json({
//         success: true,
//     });
//     });

// const updateStock = async (id, quantity) => {
//     const product = await Product.findById(id);
    
//     product.stock = product.stock - quantity;
    
//     await product.save({ validateBeforeSave: false });
//     };

export {
    newOrder,
    getSingleOrder,
    // myOrders,
    // allOrders,
    // updateOrder,
    // deleteOrder,
};
