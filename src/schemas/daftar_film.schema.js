import z from "zod";

export const storedaftar_filmSchema = z.object({
  title: z
    .string({ required_error: "Nama daftar_film wajib diisi" })
    .trim()
    .min(1, "Nama daftar_film tidak boleh kosong")
    .max(50, "Diisi dengan nama lengkap (maksimal 50 karakter)"),
  genre: z
    .string({ required_error: "Genre wajib diisi" })
    .trim()
    .min(1, "Genre tidak boleh kosong")
    .max(50, "Genre tidak boleh disingkat"),
  duration_minutes: z
    .number({ required_error: "Durasi wajib diisi" })
    .positive("Durasi harus bilangan positif tanpa koma"),
  is_watched: z
    .boolean()
    .optional()
});

export const updatedaftar_filmSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Nama daftar_film tidak boleh kosong")
    .max(50, "Diisi dengan nama lengkap")
    .optional(),
  genre: z
    .string()
    .trim()
    .min(1, "Genre tidak boleh kosong")
    .max(50, "Genre tidak boleh disingkat")
    .optional(),
  duration_minutes: z
    .number()
    .positive("Durasi harus bilangan positif tanpa koma")
    .optional(),
  is_watched: z
    .boolean()
    .optional()
});

