import Product from "../models/product-model.js";
import User from "../models/user-model.js";

export const CheckedOutProducts = async (req, res) => {
    const { username: userName, products: selectedProducts } = req.body;
    try {
        const user = await User.findOne({ username: userName });

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        user.cart.CheckedOutProducts.push(...selectedProducts);
        await user.save();
        res.status(200).json({ message: "Products Checked Out Successfully" });
    }
    catch (err) {
        res.status(406).json({ message: `Error fetching cart:${err}` });
    }

};

export const PlaceOrder = async (req, res) => {
    const { username, shippingData } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        const checkedOutProducts = user.cart.CheckedOutProducts;
        let total = checkedOutProducts.reduce((sum, product) => sum + product.total, 0);
        let shipmentCharge = total * 0.3;
        let gst = total * 0.18;
        let netTotal = total + shipmentCharge + gst;

        if (shippingData) {
            user.shippingAddress = shippingData;
        }
        if (checkedOutProducts) {
            user.orders.products = checkedOutProducts;
            user.orders.NetTotal = netTotal;
        }
        await user.save();
        const shippingAddress = user.shippingAddress;

        user.save();

        return res.status(200).send({ total, shipmentCharge, gst, netTotal, shippingAddress });
    }
    catch (e) {
        res.status(406).json({ message: `Error fetching cart:${e}` });
    }
};

export const TrackOrder = async (req, res)=>{
    try{
        const username = req.body.username;
        const findUser = await User.findOne({username: username})
        if(!findUser){
            res.status(404).json({message: 'User Not Found'});
        }
        const OrderedProducts = findUser.orders.products;
        const NetTotal = findUser.orders.NetTotal;
        res.status(200).json({OrderedProducts, NetTotal})

    }
    catch(err){
        res.status(500).json({message: err})
    }
}


// Admin Order Handling 

export const UserOrders = async (req, res) => {

   try{
    const users = await User.find({}, "username email shippingAddress orders").lean();

    if(!users){
        res.status(404).json({message: 'USERS NOT FOUND'})
    }

    const UserWithOrders = users.filter(user => user.orders && user.orders.products.length > 0);

    if(UserWithOrders.length === 0){
        res.status(404).json({message: 'NO ORDERS FOUND'});
    }
    return res.status(200).json({message: 'Order Fetched Succesfully', orders: UserWithOrders})
   }
   catch(err){
    res.status(500).json({message: `ERROR FETCHING DATA ${err}`})
   }

}   

export const OrderStatus = async (req, res) => {
try{
    const {username , product_id, status } = req.body;

    const findUser  = await User.findOne({username: username});
    if(!findUser){
        res.status(400).json({message: 'USER NOT FOUND'})
    }

    let foundProduct = false;

    if(findUser && findUser.orders.products){
        findUser.orders.products.forEach((product)=>{
            if(product.product_id === product_id){
                product.status = status;
                foundProduct = true;
            }
            
        })
    }
    if(foundProduct){
        await findUser.save();
        res.status(200).json({message: 'Product Status Changed Successfully', status: status});
    }
    else{
        res.status(404).json({message: 'NO PRODUCT FOUND FOR STATUS CHANGE'})
    }
}
catch(err){
    res.status(500).json({message: `ERROR ${err}`})
}
}
