console.log("this is script to file")
const cityForm = document.getElementById("city-form")
const cityInput = document.getElementById("city-search-input")
const cityDiv = document.getElementById("city-div")


cityForm.addEventListener("submit", citySubmit)

function citySubmit(){
    event.preventDefault()
    showMeTheInput()
    countryFetcher()
}

function showMeTheInput(){
    console.log( cityInput.value)
    let div = document.getElementById("city-div")
    let ul = document.createElement("ul")
    let li = document.createElement("li")
    let city = cityInput.value
    ul.appendChild(li)
    li.innerText = city
    div.append(ul)
    console.log(ul, li)

}


function countryFetcher(){
return fetch(`https://data.opendatasoft.com/api/v2/catalog/datasets/open-beer-database-breweries%40public-us/records?where=city%3D%20%22${cityInput.value}%22&rows=100&pretty=false&timezone=UTC`)
.then(resp=> resp.json())
.then(function(rec){
    let records = rec.records
    
    records.forEach(brewery=> 
         
        cityDiv.append(p)
})
}

//countryFetcher()
// brewery.record.fields.name_breweries //console.log(brewery.record.fields))