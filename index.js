import express from 'express'

const url ='https://whois.fdnd.nl/api/v1/squad/' 
/// woonplaats arry die wil ik het toevoegen aan de members
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
/// de url maken aanhand van de slug 
  let slug = request.query.squad || 'squad-b-2022'

  let orderBy = request.query.orderBy || 'name'
  let squadUrl = url + slug + '?orderBy=' + orderBy + '&direction=ASC'

/// een nep woonplaats data toevoegen aan de api 
  fetchJson(squadUrl).then((data) => {
    data.squad.members = data.squad.members.map(function(member) {
      if (!member.residence) {
        member.residence = provincies[getRandomInt(maxFromProvincies)]
      }
      return member
    })
    data.provinces = provincies
    // response.render('index', data)

    /// filter de member aanhand van de woonplaats
  const filtered = structuredClone(data)
  filtered.currentProv = null
  if (request.query.provincies) {
    /// als je er filterd dan verdwijerd de andere members die niet bij hoord 
    filtered.currentProv = request.query.provincies
    filtered.squad.members = filtered.squad.members.filter((member) => member.residence == request.query.provincies)
   
  }
  response.render('index', filtered)
  })
  // console.log(data.squad.members);

 })

 /// voegt een random data aan de members
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


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

