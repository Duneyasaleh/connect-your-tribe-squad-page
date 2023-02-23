import express from 'express'

const url ='https://whois.fdnd.nl/api/v1/squad/' 
const provincies = ['Limburg', 'Noord-Brabant', 'Zuid-Holland' , 'Zeeland', 'Noord-Holland', 'Utrecht', 'Gelderland', 'Flevoland', 'Overijssel', 'Drenthe', 'Friesland ', 'Groningen']
const maxFromProvincies = provincies.length - 1
const app = express()

// Stel in hoe we express gebruiken
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

  // console.log(data)
  //Js file:   // deep copy   // fuld way   // const filtered = JSON.parse(JSON.stringify(data))  


// Maak een route voor de index
app.get('/', (request, response) => {

  let slug = request.query.squad || 'squad-b-2022'
  let orderBy = request.query.orderBy || 'name'
  let squadUrl = url + slug + '?orderBy=' + orderBy + '&direction=ASC'


  fetchJson(squadUrl).then((data) => {
    data.squad.members = data.squad.members.map(function(member) {
      if (!member.residence) {
        member.residence = provincies[getRandomInt(maxFromProvincies)]
      }
      return member
    })
    data.provinces = provincies
    // response.render('index', data)

  const filtered = structuredClone(data)
  filtered.currentProv = null
  if (request.query.provincies) {
    
    filtered.currentProv = request.query.provincies
    filtered.squad.members = filtered.squad.members.filter((member) => member.residence == request.query.provincies)
   
  }
  response.render('index', filtered)
  })
  // console.log(data.squad.members);

 })

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


app.get('/members', (request, response) => {
  response.send('Joepie!!')
})

// Stel het poortnummer in en start express
app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}

