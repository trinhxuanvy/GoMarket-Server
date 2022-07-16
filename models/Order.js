const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    storeId: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
    shipperId: {
      type: String,
      default: '',
    },
    deliveryFeeOfShipper: {
      type: Number,
      default: 0,
    },
    paymentMethod: {
      type: String,
      required: true,
      default: 'Cod',
    },
    status: {
      type: String,
      default: 'Open',
    }, // Open -> Confirmed -> Shipping -> Shipped -> Completed -> Cancelled
    olderStatus: {
      type: String,
      default: '',
    },
    deliveryFee: {
      type: Number,
      default: 0,
    },
    subTotal: { type: Number, min: 0, required: true },
    total: { type: Number, min: 0, required: true },
    phone: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      ward: { type: String, required: true },
      district: { type: String, required: true },
      province: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      _id: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    orderDetails: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        productImg: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: false,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'Order',
  },
);

module.exports = mongoose.model('Order', Order);
