import mongoose from 'mongoose'
import connectDB from '../config/daftar_film.js' // Sesuaikan path koneksi DB
import daftar_filmModel from '../model/daftar_film.js' // Sesuaikan path model daftar_film

// Data dummy yang akan di-seed
const samples = [
  { title: 'Godzilla vs. Kong', 
    genre: 'Action', 
    duration_minutes: 135, 
    is_watched: false },
  { title: 'Tom and Jerry', 
    genre: 'Comedy', 
    duration_minutes: 120, 
    is_watched: true },
  { title: 'Batman', 
    genre: 'Drama', 
    duration_minutes: 150, 
    is_watched: false },
  { title: 'Ghostbusters', 
    genre: 'Thriller', 
    duration_minutes: 140, 
    is_watched: false },
  { title: 'Interstellar', 
    genre: 'Sci-Fi', 
    duration_minutes: 160, 
    is_watched: false }
]

const seed = async () => {
  const counts = { daftar_film: 0 }

  try {
    await connectDB()

    // Menginisialisasi index dan membersihkan data lama
    await daftar_filmModel.init()
    await daftar_filmModel.deleteMany() // atau await mongoose.connection.dropDatabase()
    console.log('Database cleared')

    await daftar_filmModel.createIndexes()

    // Proses insert data per baris
    for (const sample of samples) {
      await daftar_filmModel.create(sample)
      counts.daftar_film += 1
    }
  } catch (error) {
    console.error('Seeding failed:', error.message)
    process.exitCode = 1
  } finally {
    // Log hasil insert data
    for (const [model, count] of Object.entries(counts)) {
      console.log(`${model}: ${count} inserted`)
    }

    // Memastikan koneksi MongoDB terputus di akhir
    try {
      await mongoose.disconnect()
      console.log('MongoDB disconnected cleanly')
    } catch (error) {
      console.error('MongoDB disconnect failed:', error.message)
      process.exitCode = 1
    }
  }
}

seed()