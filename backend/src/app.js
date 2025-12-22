import express from 'express'
import { prisma } from './db/prisma.js'
import req from 'express/lib/request.js'
import res from 'express/lib/response.js'

const app = express()
app.use(express.json())

app.get('/health', async (req, res) => {
  await prisma.$queryRaw`SELECT 1`
  res.json({ ok: true })
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.get('/test', async (req,res)=>{
    const user = await prisma.user.create(
        {
            data: {
                email: "cire@gmail.com",
                nom:  "Diallo Mamadou Cire"
            }
        }
    )

    res.json({
        user
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server on in  http://127.0.0.1:${port}`))

// arrêt propre
async function shutdown() {
  await prisma.$disconnect()
  process.exit(0)
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
