import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  plateNumber: {
    type: String,
    required: true
  },
  wxId: String,
  wxName: String,
  phone: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  invoiceDate: Date,
  amount: Number,
  remarks: String
}, {
  timestamps: true
});

export default mongoose.model('Driver', driverSchema);