const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

// add a middleware
app.use((req, res, next) => {
  var now = new Date().toString()
  var log = `${now}: ${req.method} - Method ${req.url} - URL`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log file')
    }
  })
  next()
})

// maintenance page middleware
// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

// if above, help.html will be rendered in lieu of maintenance page
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
