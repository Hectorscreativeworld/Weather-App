const main = () => {
  //defines API Key
  const api = 'd3db06f59bed8dac061346a6f2d056af'
  // named function
  function searchBtn(event) {
    //tells page not to reload

    event.preventDefault()
    // grabbing the value from text box 
    let cityOrZip = document.querySelector('#inner-textbar').value
    // defineing an empty variables or null so difine it with if statements  
    let CZ;
    // we reg expersion to determine a string is a city or zip code.
    let regex = new RegExp('[a-zA-Z]')
    // .test returns true or false
    if (regex.test(cityOrZip)) {
      CZ = 'q='
    } else {
      CZ = 'zip='
    }
    // calling the API with template literal variables 
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=imperial&${CZ}${cityOrZip}&appid=${api}`)

      .then(resp => {
        return resp.json()
      })
      .then(json => {
        console.log(json)
        // manipulting the HTML using the native dom API
        document.querySelectorAll('.weatherInfo li').forEach(e => e.remove())
        let node1 = document.createElement('li')
        node1.className = 'temp'
        let text1 = document.createTextNode(`Temperature: ${json.main.temp}`)
        node1.appendChild(text1)
        let node2 = document.createElement('li')
        node2.className = 'humidity'
        // let text2 = document.createTextNode(`Humidity: ${json.main.humidity}`)
        let text2 = document.createTextNode(`Weather: ${json.weather}`)
        node2.appendChild(text2)

        // creating new nodes and adding to the DOM
        let list = document.querySelector('.weatherInfo')
          .appendChild(node1)
        document.querySelector('.weatherInfo')
          .appendChild(node2)



      })
  }
  //looking for ID and addEventListener for the subit of form
  document.querySelector('#weathersearch').addEventListener('submit', searchBtn)
}


//web browser contacts website issue get request to index.HTML the starts top run JS
document.addEventListener('DOMContentLoaded', main)