import mongoose from "mongoose";
import daftar_filmModel from "../model/daftar_film.js";
import { apiResponse, apiResponseValidation } from "../utils/response.js";
import { storedaftar_filmSchema, updatedaftar_filmSchema } from "../schemas/daftar_film.schema.js";

class daftar_filmController {
 // Get All DaftarFilm (Search & Sort)
  static async index(req, res) {
    try {
      // 1. Tangkap 'search', 'sortBy', dan 'sort' dari query params
      const { search, sortBy = "title", sort } = req.query; 
      const filter = {}; 
      
      // 2. Jika parameter 'search' diisi di Postman, lakukan pencarian berdasarkan title
      if (search) { 
        filter.title = { 
          $regex: search, 
          $options: "i", // case-insensitive
        }; 
      } 
      
      // 3. Logika sorting (default asc jika 'sort' tidak diisi / bernilai selain 'desc')
      const sortOption = { 
        [sortBy]: sort === "desc" ? -1 : 1, 
      }; 

      // 4. Ambil data dari database
      const listdaftar_film = await daftar_filmModel.find(filter).sort(sortOption);
      return apiResponse({
        res,
        status: 200,
        message: "List daftar_film",
        data: listdaftar_film
      });
    } catch (error) {
      return apiResponse({ res, status: 500, message: error.message });
    }
  }

  // Get Detail daftar_film by ID
  static async show(req, res) {
    try {
      const daftar_filmId = req.params.id;

      // Validasi format ID MongoDB
      if (!mongoose.Types.ObjectId.isValid(daftar_filmId)) {
        return apiResponse({ res, status: 400, message: 'Format ID tidak valid' });
      }

      const daftar_film = await daftar_filmModel.findById(daftar_filmId);
      
      // Cek jika data tidak ditemukan
      if (!daftar_film) {
        return apiResponse({ res, status: 404, message: 'daftar_film tidak ditemukan' });
      }

      return apiResponse({
        res,
        status: 200,
        message: "Detail daftar_film",
        data: daftar_film
      });
    } catch (error) {
      return apiResponse({ res, status: 500, message: error.message });
    }
  }

  // Create daftar_film
  static async store(req, res) {
    try {
      const result = storedaftar_filmSchema.safeParse(req.body);
      if (!result.success) {
        return apiResponseValidation({
          res,
          errors: result.error
        });
      }
      
      const { title, genre, duration_minutes, is_watched } = result.data;

      const daftar_film = await daftar_filmModel.create({
        title,
        genre,
        duration_minutes,
        is_watched
      });

      return apiResponse({
        res,
        status: 201, // HTTP Status 201 Created
        message: "daftar_film berhasil dibuat",
        data: daftar_film
      });
    } catch (error) {
      return apiResponse({ res, status: 500, message: error.message });
    }
  }

  // Update daftar_film by ID
  static async update(req, res) {
    try {
      const daftar_filmId = req.params.id;

      // Validasi format ID MongoDB
      if (!mongoose.Types.ObjectId.isValid(daftar_filmId)) {
        return apiResponse({ res, status: 400, message: 'Format ID tidak valid' });
      }

      const result = updatedaftar_filmSchema.safeParse(req.body);
      if (!result.success) {
        return apiResponseValidation({
          res,
          errors: result.error
        });
      }

      const {title, genre, duration_minutes, is_watched } = result.data;

      const updatedaftar_film = await daftar_filmModel.findOneAndUpdate(
        { _id: daftar_filmId },
        { title, genre, duration_minutes, is_watched },
        { new: true, runValidators: true }
      );

      if (!updatedaftar_film) {
        return apiResponse({ res, status: 404, message: 'daftar_film tidak ditemukan' });
      }

      return apiResponse({ 
        res, 
        status: 200, 
        message: 'daftar_film berhasil diperbarui',
        data: updatedaftar_film 
      });
    } catch (error) {
      return apiResponse({ res, status: 500, message: error.message });
    }
  }

  // Delete daftar_film by ID
  static async delete(req, res) {
    try {
      const daftar_filmId = req.params.id;

      // Validasi format ID MongoDB
      if (!mongoose.Types.ObjectId.isValid(daftar_filmId)) {
        return apiResponse({ res, status: 400, message: 'Format ID tidak valid' });
      }

      const deleteddaftar_film = await daftar_filmModel.findOneAndDelete({ _id: daftar_filmId });

      if (!deleteddaftar_film) {
        return apiResponse({ res, status: 404, message: 'daftar_film tidak ditemukan' });
      }

      return apiResponse({ 
        res, 
        status: 200, 
        message: 'daftar_film berhasil dihapus', 
        data: null 
      });
    } catch (error) {
      return apiResponse({ res, status: 500, message: error.message });
    }
  }
}

export default daftar_filmController;