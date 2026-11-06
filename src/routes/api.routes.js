import express from 'express'
import daftar_filmController from '../controllers/daftar_film.controller.js'
import upload from '../config/upload.js'
import UploadController from '../controllers/upload.controller.js'
import UserController from '../controllers/user.controller.js'
import WelcomeController from '../controllers/welcome.controller.js'
import { logMiddleware } from '../middleware/log.middleware.js'


// Inisialisasi router Express
const router = express.Router()

router.use(logMiddleware) 

// Endpoint Health-Check / Welcome
router.get('/welcome', WelcomeController.welcome)

// Endpoint Manajemen User & Upload
router.post('/users', UserController.store)
router.post('/upload', upload.single('file'), UploadController.store)

// Endpoint REST API daftar_film (CRUD)

// 1. POST - Menambahkan data daftar_film baru
router.post('/daftar_film', daftar_filmController.store)

// 2. GET - Menampilkan seluruh daftar data daftar_film
router.get('/daftar_film', daftar_filmController.index)

// 3. GET by ID - Menampilkan detail data daftar_film berdasarkan ID
router.get('/daftar_film/:id', daftar_filmController.show)

// 4. PUT - Mengganti seluruh data daftar_film berdasarkan ID
router.put('/daftar_film/:id', daftar_filmController.update)

// 5. DELETE - Menghapus data daftar_film berdasarkan ID
router.delete('/daftar_film/:id', daftar_filmController.delete)

// Ekspor router menggunakan standar ESM (ES Modules)
export default router