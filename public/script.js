const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () => {
   const place = searchBox.getPlaces()[0] 
   if (place == null) return
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    fetch('/weather', {
       method: 'POST',
       headers: {
           'content-type': 'application/json',
           'Accept': 'application/json'
       },
       body: JSON.stringify({
           latitude: latitude,
           longitude: longitude
       })
    }) .then(res => res.json()).then(data => {
        setWeatherData(data, place.formatted_address)
    })
})

const icon = new Skycons({ color: '#222'})
const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[status-location]')
const temperatureElement = document.querySelector('[temperature-location]')
const precipationElement = document.querySelector('[precipitation-location]')
const windElement = document.querySelector('[wind-location]')
icon.set('icon', 'clear-day')
icon.play()

function setWeatherData(data, place) {
loactionElement.textContent = place
statusElement.textContent = data.summary
temperatureElement.textContent = data.temperatureElement
precipitationElement.textContent = `${data.precipProbability * 100}%`
windElement.textContent = data.windSpeed
icon.set('icon', data.icon)
icon.play()
}