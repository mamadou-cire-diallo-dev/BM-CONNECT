import express from 'express'
import { prisma } from './db/prisma.js'

const app = express()
app.use(express.json())


app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.post('/test', async (req,res)=>{
    const user = await prisma.user.create(
        {
            data: {
                email: "cire@gmail.com",
                nom:  "Diallo Mamadou Cire"
            }
        }
    )
    res.json({ user })
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
