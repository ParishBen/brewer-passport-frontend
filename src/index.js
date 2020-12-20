console.log("this is script to file")
const cityForm = document.getElementById("city-form")
const cityInput = document.getElementById("city-search-input")
const cityDiv = document.getElementById("city-div")







// function toggle_visibility(id) {
//     var e = document.getElementsByClassName(id);
//     if(e.style.display == 'block')
//        e.style.display = 'none';
//     else
//        e.style.display = 'block';
//  }

  

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
        p.className = "brewery-info-class"
        const wishList = document.createElement('button')
        const favoritedBrewery = document.createElement('button')
        wishList.setAttribute('class', 'wishList')
        wishList.innerText = "Add to Wishlist"
        favoritedBrewery.innerText = "Add to Favorites"
        favoritedBrewery.setAttribute('class', 'favoriteList')
        p.appendChild(wishList)
        p.appendChild(favoritedBrewery)
    let brewery = new Brewery(records[counter].fields.city, records[counter].fields.state, records[counter].fields.address1, records[counter].fields.country, records[counter].fields.phone, records[counter].fields.name_breweries, records[counter].fields.descript, records[counter].fields.website)
    breweries.push(brewery)
        console.log(brewery)
        p.addEventListener("click", myClick)
        cityDiv.append(p)
        counter++
    }

    //changeBreweriesIds()
    })
}
    // let records = rec.records
    // let counter = 0;
    
   
        
        
        //if (!theP.innerText.includes('Address:') && !theP.innerText.includes('Phone Num:') && !theP.innerText.includes('Website:') && !theP.innerText.includes('Description:')){
            //theP.addEventListener("click", myClick).unless(!theP.innerText.includes('Address:') && !theP.innerText.includes('Phone Num:') && !theP.innerText.includes('Website:') && !theP.innerText.includes('Description:'))
            function myClick (e){
                let breweryP = e.target
                let ret = breweryP.innerText.replace('Add to WishlistAdd to Favorites', '')
                let clickedBrewery = breweries.find(brew => brew.name == ret)
                console.log(breweryP.children.length)
                console.log(breweryP.innerText)
                console.log(ret)
                let newP = document.createElement('p')
                if (breweryP.children.length == 2 ){
                    newP.innerText+=(`Address: ${clickedBrewery.address},\n Phone Num: ${clickedBrewery.phoneNum}, \n Website: ${clickedBrewery.website},\n Description: ${clickedBrewery.description}`)
                    newP.className = 'semi-invisible'
                    breweryP.append(newP)} 
                    console.log(breweryP.children[2])
                    if (breweryP.children[2].className == 'semi-invisible'){
                        breweryP.children[2].className = 'brewery-subinfo-class'}
                    else {breweryP.children[2].className = 'semi-invisible' && removePspace() }
                console.log(breweryP.innerText.includes('Address:'))
                console.log(breweryP)
                console.log(newP)
                console.log(breweryP.children)
                
                //  if (!(breweryP.innerText.includes('Address:') && breweryP.innerText.includes('Phone Num:') && breweryP.innerText.includes('Website:') && breweryP.innerText.includes('Description:'))){
                //     ///////////theP.addEventListener("click", myClick).unless(!theP.innerText.includes('Address:') && !theP.innerText.includes('Phone Num:') && !theP.innerText.includes('Website:') && !theP.innerText.includes('Description:'))
                //     breweryP.innerText+=(`\n Address: ${clickedBrewery.address},\n Phone Num: ${clickedBrewery.phoneNum}, \n Website: ${clickedBrewery.website},\n Description: ${clickedBrewery.description}`)
                // breweryP.className = 'brewery-info-class'
                    
                        
                //     } else { breweryP.className = 'semi-invisible'
                //         console.log(breweryP.className)
                   // }
                }
                
            function removePspace(){
                let p = document.querySelector('p.brewery-subinfo-class')
                p.remove()
            }
            
    
    let theP = document.querySelectorAll('#addedBrewInfoToP');
    console.log(theP)
    theP.forEach(
        p=>  p.addEventListener("click", toggleBrewInfo).addEventListener("click", myClick).addEventListener("click", displayBreweriesInfo))


        function displayBreweriesInfo(){
    let thePs = document.querySelectorAll('#addedBrewInfoToP')
    thePs.forEach(p=> p.id = `${p.innerText}`) 
    let counter = 0;
    while (counter < thePs.length){
        let p = thePs[counter]
    let clickedBrewery = breweries.find(brew => brew.name == `${p.innerText}`)
    console.log(thePs, clickedBrewery)
    counter++
    if (!p.innerText.includes('Address:') && !p.innerText.includes('Phone Num:') && !p.innerText.includes('Website:') && !p.innerText.includes('Description:')){
        //theP.addEventListener("click", myClick).unless(!theP.innerText.includes('Address:') && !theP.innerText.includes('Phone Num:') && !theP.innerText.includes('Website:') && !theP.innerText.includes('Description:'))
    thePs.forEach(theP=> theP.innerText+=(`\n Address: ${clickedBrewery.address},\n Phone Num: ${clickedBrewery.phoneNum}, \n Website: ${clickedBrewery.website},\n Description: ${clickedBrewery.description}`))}
}}

    




        function makeVisible(){
            let h4 = document.getElementById('clickInstruct');
            h4.className = 'showMoreInfo'
            console.log(h4)
        }
        function toggleBrewInfo() {
            var x = document.getElementsByClassName("brewery-info-class");
    if(x.className == 'brewery-info-class')
       x.className = 'semi-invisible';
    else
    x.className = 'brewery-info-class';
 }
         
    
   // https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database-breweries%40public-us&rows=20&start=30

//countryFetcher()
// brewery.record.fields.name_breweries // console.log(brewery.record.fields))


let structure = function toTitleCase( str ) 
{
    let nowStr = str.toString()
   return nowStr.split(/\s+/).map( s => s.charAt( 0 ).toUpperCase() + s.substring(1).toLowerCase() ).join( " " );
}