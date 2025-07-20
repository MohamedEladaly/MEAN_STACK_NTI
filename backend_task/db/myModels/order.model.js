import mongoose, {Schema} from "mongoose";
const orderSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "product",
      },
      quantity: Number
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  Status: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  }
},
{
    timestamps: true,
    versionKey:false
}
);
export const orderModel = mongoose.model("order", orderSchema);
