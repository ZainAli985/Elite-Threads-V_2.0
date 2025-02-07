import express from 'express';
const router = express.Router();


import {authenticateToken} from '../middlewares/auth.js'
import { CreateProduct,  deleteProducts, getAdminProducts, getProducts } from '../controllers/ProductController.js';
import { register, login } from '../controllers/RegisterController.js';
import { Adminlogin, AdminRegister } from '../controllers/AdminRegisterController.js';
import { CreateCartProducts, decreaseCartQuantity, DelteCartProducts, increaseCartQuantity, userCart } from '../controllers/CartController.js';
import { CheckedOutProducts, OrderStatus, PlaceOrder, TrackOrder, UserOrders } from '../controllers/OrderHandling.js';
import { upload } from '../middlewares/multer-upload-middleware.js';


// Login 
router.post('/login', login);
router.post('/register', register);

// Admin Register/Login 
router.post('/adminlogin', Adminlogin)
router.post('/adminregister', AdminRegister)

// Protected Routes 
router.get('/home',authenticateToken, (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Home Page! You are authorized to view this page.'
    });
});

router.get('/adminpanel', authenticateToken, (req,res)=>{
    res.status(200).json({
        message: 'Welcome To Admin Panel. You Are An Authorized Admin For Elite Threads'
    })
});

// Admin Routes 
router.post('/createproduct', upload.single('image'), CreateProduct);
router.post('/deleteproducts', deleteProducts);
router.get('/getAdminproducts', getAdminProducts);
router.get('/getuserorders', UserOrders);
router.post('/updateorderstatus', OrderStatus)

// Cart Routes 
router.post('/createcartproducts', CreateCartProducts);
router.post('/getusercart', userCart);
router.post('/deletecartproduct', DelteCartProducts);
router.post('/increaseqty',increaseCartQuantity);
router.post('/decreaseqty',decreaseCartQuantity);
router.post('/trackorders', TrackOrder);

// Order Handling Routes 

router.post('/checkout', CheckedOutProducts);
router.post('/placeorder', PlaceOrder);

// Public Routes 
router.get('/getproducts/:categoryName', getProducts);



export default router;