import mongoose from "mongoose";

const PromoCodeSchema = new mongoose.Schema({
    promoCode: { type: String, required: true, unique: true, uppercase: true },
    discountPercentage: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
    validUntil: { type: Date },
    maxUsage: { type: Number },
    usedCount: { type: Number, default: 0 },
}, { timestamps: true });

const PromoCode = mongoose.models.PromoCode || mongoose.model("PromoCode", PromoCodeSchema);

export default PromoCode;
