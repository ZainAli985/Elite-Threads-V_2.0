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
        const UpdateCart = await User.updateOne(
            { username: userName },
            { $pull: { 'cart.products': { name: productName } } }
        )

        const UpdatedUser = await User.findOne({ username: userName });


        res.status(200).json({
            message: 'Product Deleted Successfully',
            UpdatedCart: UpdatedUser.cart.products,
            message2: "HELLOO THIS IS WORKING"
        });
    }
    catch (err) {
        res.json({
            message: `Error Deleting Product ${err}`
        });
    }
}

export const increaseCartQuantity = async (req, res) => {
    try {
        let { userName: userName, productName: productName } = req.body;
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
        let { userName: userName, productName: productName } = req.body;
        let foundUser = await User.findOne({ username: userName });
        if (!foundUser) {
           return res.status(404).json({
                message: `User Not Found`
            });
        };

        let productInCart =  foundUser.cart.products.find(product => product.name === productName);

        if (productInCart && productInCart.qty != 0 && productInCart.qty != 1) { //This is to prevent the quantity from going below 0 Or Zero
            productInCart.qty -= 1;
            await foundUser.save(); //THISSSSSSS ISSSSSSS IMMMMMPOOOORRRRTTTTAAAAANTTTTTAAA!

           return res.status(200).json({
                message: 'Quantity Updated Successfully'
            });

        }
        else {
          return  res.status(423).json({
                message: `Product Not Found || Can't Update Quantity`
            });
        }

    }
    catch (err) {
       return res.json({
            message: `Error Updating Product Quantity ${err}`
        });
    }
};

// For Product Display Page 
export const ProductPageCartHandler = async (req, res) => {
    try {
        const { ProductName: ProductTitle, username: Username, productqty: ProductQty } = req.body;

        const foundProduct = await Product.findOne({ name: ProductTitle });

        if (!foundProduct) {
            res.status(404).json({
                message: 'USER NOT FOUND'
            })
        }
        const foundUser = await User.findOne({ username: Username });

        if (!foundUser) {
            res.status(404).json({
                message: 'USER NOT FOUND'
            })
        }
        let productInCart = foundUser.cart.products.find(product => product.name === ProductTitle);
        if (productInCart) {
            productInCart.qty += ProductQty;
        }
        else {
            foundUser.cart.products.push({
                product_id: foundProduct.product_id,
                image: foundProduct.image,
                name: foundProduct.name,
                price: foundProduct.price,
                desc: foundProduct.desc,
                category: foundProduct.category,
                qty: ProductQty
            });
        }

        await foundUser.save();
        res.status(200).json({ message: 'PRODUCT CREATED IN CART SUCCESSFULLY' })
    }
    catch (e) {
        res.status(500).json({ message: `Server Error At Product View Controller${e}` })
    }
}