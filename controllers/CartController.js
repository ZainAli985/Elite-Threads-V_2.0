import Product from "../models/product-model.js";
import User from "../models/user-model.js";

export const CreateCartProducts = async (req, res) => {
    try {


        let { name: productName, username: UserName } = req.body;


        let findProduct = await Product.findOne({ name: productName });
        if (!findProduct) {
            return res.status(404).json({
                message: 'Product Not Found'
            });
        }


        let findUser = await User.findOne({ username: UserName });
        if (!findUser) {
            return res.status(404).json({
                message: 'USER NOT FOUND'
            });
        }

        let productInCart = findUser.cart.products.find(product => product.name === productName);

        if (productInCart) {
            productInCart.qty += 1;
        } else {
            findUser.cart.products.push({
                product_id: findProduct.product_id,
                image: findProduct.image,
                name: findProduct.name,
                price: findProduct.price,
                desc: findProduct.desc,
                category: findProduct.category,
                qty: 1
            });
        }

        await findUser.save();

        return res.status(200).json({
            message: 'Product added to cart successfully',
            cart: findUser.cart
        });
    }
    catch (err) {
        res.send(err);
    }
};

export const userCart = async (req, res) => {
    try {

        const userName = req.body.username;

        let foundUser = await User.findOne({ username: userName });

        let userCart = foundUser.cart;

        if (!foundUser) {
            res.status(404).json({
                message: `USER NOT FOUND`
            })
        }
        else {
            res.send(userCart);
        }
    }
    catch (error) {
        res.send(error)
    }
};

export const DelteCartProducts = async (req, res) => {
    try {
        let { username: userName, productName: productName } = req.body;

        let foundUser = await User.findOne({ username: userName });
        if (!foundUser) {
            res.status(404).json({
                message: `User Invalid`
            });
        }
        else {
            const UpdateCart = await User.updateOne(
                { username: userName },
                { $pull: { 'cart.products': { name: productName } } }
            )
            res.status(200).json({
                message: 'Product Deleted Successfully'
            });
        }
    }
    catch (err) {
        res.json({
            message: `Error Deleting Product ${err}`
        });
    }
}

export const increaseCartQuantity = async (req, res) => {
    try {
        let { username: userName, productName: productName } = req.body;
        let foundUser = await User.findOne({ username: userName }); //REQUIREMENT 
        if (!foundUser) {
            res.status(404).json({
                message: `User Not Found`
            });
        }

        let productInCart = foundUser.cart.products.find(product => product.name === productName);

        if (productInCart) {
            productInCart.qty += 1;
            res.status(200).json({
                message: 'Quantity Updated Successfully'
            });
        } else {
            res.status(404).json({
                message: `Product Not Found`
            });
        }

        foundUser.save(); //THISSSSSSS ISSSSSSS IMMMMMPOOOORRRRTTTTAAAAANTTTTTAAA!
    }
    catch (err) {
        res.json({
            message: `Error Updating Product Quantity ${err}`
        });
    }
};
export const decreaseCartQuantity = async (req, res) => {
    try {
        let { username: userName, productName: productName } = req.body;
        let foundUser = await User.findOne({ username: userName });
        if (!foundUser) {
            res.status(404).json({
                message: `User Not Found`
            });
        }

        let productInCart = foundUser.cart.products.find(product => product.name === productName);

        if (productInCart.qty != 0 && productInCart.qty != 1) { //This is to prevent the quantity from going below 0 Or Zero
            if (productInCart) {
                productInCart.qty -= 1;
                res.status(200).json({
                    message: 'Quantity Updated Successfully'
                });
            } else {
                res.status(404).json({
                    message: `Product Not Found`
                });
            }
        }
        else {
            productInCart.qty = 1;
            res.status(200).json({
                message: 'Quantity Updated Successfully 0000'
            });
        }
        foundUser.save(); //THISSSSSSS ISSSSSSS IMMMMMPOOOORRRRTTTTAAAAANTTTTTAAA!

    }
    catch (err) {
        res.json({
            message: `Error Updating Product Quantity ${err}`
        });
    }
};