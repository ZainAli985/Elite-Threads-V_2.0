import mongoose from 'mongoose';


// Define the user schema
const ProductSchema = new mongoose.Schema({
    image: {type: String, required: true},
    name: {type: String, required: true} ,
    price: {type: Number , required: true},
    desc: {type: String , required: true},
    category: {
        type: String,
        required: true,
    },
    product_id: {type: Number, required: true}

});

// Create the user model
const Product = mongoose.model('Product', ProductSchema);

export default Product;