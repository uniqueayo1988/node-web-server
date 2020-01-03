const express = require('express')
const hbs = require('hbs')
const app = express()

app.set('view engine', 'hbs')
app.use(express.static(`${__dirname}/public`))

const pageDetails = {
  pageTitle: 'About Page View',
  currentYear: new Date().getFullYear()
}

app.get('/', (req, res) => {
  // res.send('<h1>Welcome here Express</h1>')
  // res.json({message: 'Hello Express'})
  res.render('home.hbs', {
    ...pageDetails,
    pageTitle: 'Welcome to Express Templating',
    welcomeMsg: 'We identify problems, analyse them and proffer a lasting solution'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', pageDetails)
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`server started at PORT ${PORT}`)
})
