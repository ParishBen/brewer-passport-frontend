console.log("this is script to file")
const cityForm = document.getElementById("city-form")
const cityInput = document.getElementById("city-search-input")
const cityDiv = document.getElementById("city-div")







  

cityForm.addEventListener("submit", citySubmit)

function citySubmit(){
    event.preventDefault()
    showMeTheInput()
    countryFetcher()
    makeVisible()
}

function showMeTheInput(){
    console.log( cityInput.value)
    let div = document.getElementById("city-div")
    let ul = document.createElement("ul")
    let li = document.createElement("li")
    let city = cityInput.value
    ul.appendChild(li)
    li.innerText = structure(city)
    div.append(ul)
    console.log(ul, li)

}


function countryFetcher(){
return fetch(`https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database-breweries%40public-us&rows=100&refine.city=${structure(cityInput.value)}`)
.then(resp=> resp.json())
.then(function(objs){ 
    let records = objs.records
    console.log(objs)
    console.log(records)
    let counter = 0
    while (counter < records.length){
    let p = document.createElement('p')
        p.innerText = records[counter].fields.name_breweries
        
    let brewery = new Brewery(records[counter].fields.city, records[counter].fields.state, records[counter].fields.address1, records[counter].fields.country, records[counter].fields.phone, records[counter].fields.name_breweries, records[counter].fields.descript, records[counter].fields.website)
    breweries.push(brewery)
        console.log(brewery)
        cityDiv.append(p)
        counter++
    }
    myGuy()
    })
}
    // let records = rec.records
    // let counter = 0;
    
    function myGuy(){
        let ptest = document.getElementsByTagName('p')
        console.log(ptest)
        
        let counter = 0;
        while (counter < ptest.length){
            let theP = ptest[counter]
            let myClick = function(e){
               let clickedBrewery = breweries.find(brew => brew.name == theP.innerText)
               theP.innerText+=(`\n Address: ${clickedBrewery.address},\n Phone Num: ${clickedBrewery.phoneNum}, \n Website: ${clickedBrewery.website},\n Description: ${clickedBrewery.description}`)
                console.log(`CLICKED! ${clickedBrewery, clickedBrewery.name}`)}
            theP.addEventListener("click", myClick)
            counter++
        }

        }

        function makeVisible(){
            let h4 = document.getElementById('clickInstruct');
            h4.className = 'showMoreInfo'
            console.log(h4)
        }

    
    
   // https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database-breweries%40public-us&rows=20&start=30

//countryFetcher()
// brewery.record.fields.name_breweries // console.log(brewery.record.fields))


let structure = function toTitleCase( str ) 
{
    let nowStr = str.toString()
   return nowStr.split(/\s+/).map( s => s.charAt( 0 ).toUpperCase() + s.substring(1).toLowerCase() ).join( " " );
}