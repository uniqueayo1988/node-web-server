const express = require('express')
const app = express()

app.use(express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
  // res.send('<h1>Welcome here Express</h1>')
  res.json({message: 'Hello Express'})
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`server started at PORT ${PORT}`)
})
