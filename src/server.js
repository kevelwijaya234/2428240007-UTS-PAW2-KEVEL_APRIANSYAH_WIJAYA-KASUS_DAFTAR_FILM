import app from './app.js'
import { APP_PORT } from './config/env.js'
import { connectDB } from './config/daftar_film.js'

await connectDB()

app.listen(APP_PORT, () => {
  console.log(`Example app listening on port ${APP_PORT}`)
})
