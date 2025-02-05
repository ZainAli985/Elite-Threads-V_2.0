import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    cart: {
        products: [
            {
                product_id: { type: Number, required: true },
                image: { type: String, required: true },
                name: { type: String, required: true },
                price: { type: Number, required: true },
                desc: { type: String, required: true },
                category: { type: String, required: true },
                qty: { type: Number, default: 1 }
            }
        ],
        CheckedOutProducts: [
            {
                image: {type:String, required: true},
                product_id: { type: Number, required: true },
                name: { type: String, required: true },
                price: { type: Number, required: true },
                qty: { type: Number, default: 1 },
                total: { type: Number, required: true },
                status: {type: String, default: "Order Received"}
            }
        ]
    },
    shippingAddress: {
        address: String,
        city: String,
        postalCode: String,
        country: String,
        landmark: String
    },
   orders: {
    products: [
        {
            image: {type:String, required: true},
            product_id: { type: Number, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            qty: { type: Number, default: 1 },
            total: { type: Number, required: true },
            status: {type: String, default: "Order Received"}

        }
    ],
    NetTotal: {type: Number},
    CreatedAt: { type: Date, default: Date.now }
   }
});

// Create the user model
const User = mongoose.model('User', userSchema);

export default User;