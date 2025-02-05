import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: true
    },
    admin_id: {
        type: Number,
        required: true,
        unique: true
    },
    // AdminOrders: {
    //     userOrders:
    //         [
    //             {
    //                 username: { type: String },
    //                 email: { type: String },
    //                 shippingAddress: {
    //                     address: String,
    //                     city: String,
    //                     postalCode: String,
    //                     country: String,
    //                     landmark: String
    //                 },
    //                 products: [
    //                     {
    //                         product_id: { type: Number, required: true },
    //                         name: { type: String, required: true },
    //                         qty: { type: Number, default: 1 },
    //                         total: { type: Number, required: true }
    //                     }
    //                 ],
    //                 NetTotal: { type: Number, required: true },
    //                 Status: { type: String, default: "Received" },
    //                 OrderDate: { type: Date, default: Date.now }
    //             }
    //         ]
    // }

});

// Create the user model
const Admin = mongoose.model('Admin', adminSchema);

export default Admin;