 
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    url = '/weather?address=' + location

    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            // console.log(error)
            messageOne.textContent = data.error
        } else {
            // console.log(data.forecast)
            // console.log(data.location)
            messageOne.textContent = data.forecast.summary + data.forecast.temperature + data.forecast.precipProbability
            messageTwo.textContent = data.location
            }
    })
})
})

// "summary": "Clear",
// "temperature": 36.84,
// "precipProbability": 0
