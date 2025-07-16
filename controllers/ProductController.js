// controllers/productController.js
import Product from '../models/product-model.js';
// Controller to handle creating a product


// Create Product with Image Upload
export const CreateProduct = async (req, res) => {
    try {
        const { name, price, desc, category } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null; // Save image path

        if (!image) {
            return res.status(400).json({ message: 'Image upload failed' });
        }

        const ProductCount = await Product.countDocuments();
        const product_id = ProductCount + 1;

        const newProduct = new Product({
            product_id,
            image,
            name,
            price,
            desc,
            category,
        });

        await newProduct.save();
        res.status(201).json({ message: 'Your product was created successfully', product: newProduct });
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error: error.message });
        console.log(error);
    }
}



// Controller to handle fetching all products
export const getProducts = async (req, res) => {
    try {
        const {categoryName} = req.params;

        // Fetch all products from the database
        const products = await Product.find({category: categoryName});

        // Send the products as a response
        res.status(200).json({
            message: 'Products fetched successfully',
            products: products
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching products',
            error: error.message
        });
    }
};
export const getAdminProducts = async (req, res) => {
    try {

        // Fetch all products from the database
        const products = await Product.find({});

        // Send the products as a response
        res.status(200).json({
            message: 'Products fetched successfully',
            products: products
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching products',
            error: error.message
        });
    }
};

export const deleteProducts = async (req,res)=>{
    try{
        const productName = req.body.name;

        const foundProduct = await Product.find({name: `${productName}`});
        if(!foundProduct){
            res.status(404).json({
                message: 'Product Not Found'
            });
        }
        await Product.deleteOne({name: `${productName}`});
        res.status(200).json({
            message: 'Product Deleted Successfully',
            name: productName
        });
    }
    catch (error){
        res.status(500).json({
            message: 'Error Delteting Products',
            error: error.message
        });
    }
}

export const ProductViewData = async (req,res)=>{
    try{
        const { product_id } = req.params;  //{} is used to extract a specific item from req.body

        const showcase_product = await Product.findOne({product_id: product_id});

        if(showcase_product){
            res.status(200).json({
                response: `Product Found. OK`,
                showcase_product
            });
        }
        else{
            res.status(404).json({
                message: `NOT FOUND`
            })
        }
    }
    catch(e){
        res.status(500).json({
            message: `Server Erorr In Product Data View ${e}`
        })
    }
};

