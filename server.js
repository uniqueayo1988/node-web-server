const express = require('express')
const hbs = require('hbs')
const app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(`${__dirname}/public`))

// register functions that can be called in a partial
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('changeCase', (text) => {
  return text.toUpperCase()
})

const pageDetails = {
  pageTitle: 'About Page View',
  currentYear: new Date().getFullYear()
}

app.get('/', (req, res) => {
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

// nodemon server -e js, hbs  // let’s you watch files with those extensions
