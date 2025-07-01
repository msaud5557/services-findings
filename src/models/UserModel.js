const pkg = require("mongoose");
const { Schema, model, models } = pkg;

const UserSchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
   password: {
        type: String,
        default: null,
        select: false,
    },
    role: {
        type: String,
        enum: {
            values: ["user", "admin"],
            message: "Invalid role provided",
        },
        default: "user"
    },
  profilePicture: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  trade: {
    type: String,
    default: null,
  },
  experience: {
    type: String,
    default: null,
  },
   certification: {
  type: String,
  default: null,
},
   shortBio: {
    type: String,
    default: null,
  },
   serviceArea: {
    type: String,
    default: null,
  },
   availability: {
    type: String,
    default: null,
  },
   hourlyRate: {
    type: String,
    default: null,
  },
  country: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  apartment: {
    type: String,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
  state: {
    type: String,
    default: null,
  },
  zipCode: {
    type: Number,
    default: 0,
  },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], default: [0, 0] },
  },
  stripeAccountId: {
    type: String,
    default: null,
    select: false,
  },
  uid: {
    type: String,
    default: null,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
    select: false,
  },
  provider: {
    type: String,
    default: null,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
    select: false,
  },
  identityStatus: {
    type: String,
    enum: {
      values: ["approved", "rejected", "pending", "not-provided"]
    },
    default: 'not-provided',
    select: false,
  },
  isProfileCompleted: {
    type: Boolean,
    default: false,
    select: false,
  },
  stripeProfileStatus: {
    type: String,
    enum: {
      values: ["approved", "rejected", "in-review", "not-provided"]
    },
    default: "not-provided",
    select: false,
  },
  stripeCustomerId: {
    type: String,
    default: null
  },
  stripeBankId: {
    type: String,
    default: null
  },
  idFrontImage: {
    type: String,
    default: null,
    select: false
  },
  idBackImage: {
    type: String,
    default: null,
    select: false
  },
  veriffSessionId: {
    type: String,
    default: null,
  },
  isDeactivatedByAdmin: {
    type: Boolean,
    default: false,
    select: false
  },
  isDeleted: {
    type: Boolean,
    default: false,
    select: false
  }
}, { timestamps: true });

UserSchema.index({ location: "2dsphere" });

const UserModel = models.User || model("User", UserSchema);

module.exports = UserModel;
