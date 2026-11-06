import mongoose from 'mongoose';

const daftar_filmSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Nama daftar_film wajib diisi'],
      trim: true
    },
    genre: {
      type: String,
      required: [true, 'Genre wajib diisi'],
      trim: true
    },
    duration_minutes: {
      type: Number,
      required: [true, 'Durasi wajib diisi'],
      min: [0, 'Durasi tidak boleh negatif']
    },
    is_watched: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    collection: 'daftar_film' // Menentukan nama collection di MongoDB
  }
);

const daftar_filmModel = mongoose.model('daftar_film', daftar_filmSchema);
export default daftar_filmModel;