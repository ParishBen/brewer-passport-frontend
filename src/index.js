const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/wishlist`
const POKEMONS_URL = `${BASE_URL}/favorites`
console.log("this is script to file")
const cityForm = document.getElementById("city-form")
const cityInput = document.getElementById("city-search-input")
const cityDiv = document.getElementById("city-div")



// example grabbing already from DB data...
// function fetchTrainers(){ 
//     return fetch(TRAINERS_URL)
//     .then(resp => resp.json())
//     .then(json => {
//         let trainers = json['data']
//         console.log(json)
//         trainers.forEach(trainer => {
//         createTrainerCard(trainer.attributes)
        
//         })
//     })
// }

//             EXAMPLE WAYS OF FETCH req

// function postToy(toy_data) {
//     fetch('http://localhost:3000/toys', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: "application/json"
//         },
//         body: JSON.stringify({
//           "name": toy_data.name.value,
//           "image": toy_data.image.value,
//           "likes": 0
  
//         })
//       })
//       .then(res => res.json())
//       .then((obj_toy) => {
//         let new_toy = renderToys(obj_toy)
//         divCollect.append(new_toy)
//         
//       })
//   }
  
//   function likes(e) {
//     e.preventDefault()
//     let more = parseInt(e.target.previousElementSibling.innerText) + 1
  
//     fetch(`http://localhost:3000/toys/${e.target.id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json"
  
//         },
//         body: JSON.stringify({
//           "likes": more
//         })
//       })
//       .then(res => res.json())
//       .then((like_obj => {
//         e.target.previousElementSibling.innerText = `${more} likes`;
//       }))
//   }






cityForm.addEventListener("submit", citySubmit)

function citySubmit(){
    event.preventDefault()
    showMeTheInput()
    cityFetcher()
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


function cityFetcher(){
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
        wishList.setAttribute('class', 'addToWishlist')
        wishList.innerText = "Add to Wishlist"
        favoritedBrewery.innerText = "Add to Favorites"
        favoritedBrewery.setAttribute('class', 'addToFavoritelist')
        p.appendChild(wishList)
        p.appendChild(favoritedBrewery)
    let brewery = new Brewery(records[counter].fields.city, records[counter].fields.state, records[counter].fields.address1, records[counter].fields.country, records[counter].fields.phone, records[counter].fields.name_breweries, records[counter].fields.descript, records[counter].fields.website)
    breweries.push(brewery)
        console.log(brewery)
        p.addEventListener("click", myClick)
        wishList.addEventListener("click", addToWishList)
        favoritedBrewery.addEventListener("click", addToFavorites)
        cityDiv.append(p)
        counter++
    }  
})
}

    

    
            function myClick (e){
                let breweryP = e.target
                let ret = breweryP.innerText.replace('Add to WishlistAdd to Favorites', '')
                let clickedBrewery = breweries.find(brew => brew.name == ret)
               // console.log(breweryP.children.length)
                //console.log(breweryP.innerText)
                //console.log(ret)
                let newP = document.createElement('p')
                if (breweryP.children.length == 2 ){
                    newP.innerText+=(`Address: ${clickedBrewery.address},\n Phone Num: ${clickedBrewery.phoneNum}, \n Website: ${clickedBrewery.website},\n Description: ${clickedBrewery.description}`)
                    newP.className = 'semi-invisible'
                    breweryP.append(newP)} 
                    //console.log(breweryP.children[2])
                    if (breweryP && breweryP.children[2].className == 'semi-invisible'){
                        breweryP.children[2].className = 'brewery-subinfo-class'}
                    
                    else {breweryP.children[2].className = 'semi-invisible' && removePspace(breweryP) }
                    
                // console.log(breweryP)
                // console.log(newP)
                // console.log(breweryP.children)
                }
                
               
               
                function removePspace(){
               
                let p = document.querySelector('p.brewery-subinfo-class')
                let u = document.querySelector('p.undefined')
                if(u){
                  return  u.remove()
                }
                if (p ){
                return p.remove()}
            }
            
    







        function makeVisible(){
            let h4 = document.getElementById('clickInstruct');
            h4.className = 'showMoreInfo'
            console.log(h4)
        }



       
        let structure = function toTitleCase( str ) 
        {
            let nowStr = str.toString()
           return nowStr.split(/\s+/).map( s => s.charAt( 0 ).toUpperCase() + s.substring(1).toLowerCase() ).join( " " );
        }
         
    
   // https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database-breweries%40public-us&rows=20&start=30

  




// function toggle_visibility(id) {
//     var e = document.getElementsByClassName(id);
//     if(e.style.display == 'block')
//        e.style.display = 'none';
//     else
//        e.style.display = 'block';
//  }


