const BASE_URL = "http://localhost:3000"

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
    cityForm.reset()
    clearSearch()
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
//https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database-breweries%40public-us&facet=city&rows=100&refine.city=${structure(cityInput.value)}`
///api/records/1.0/search/?dataset=open-beer-database-breweries%40public&facet=city&facet=state&facet=country&refine.city=Columbus
///api/records/1.0/search/?dataset=open-beer-database-breweries%40public&facet=city&refine.city=Columbus
// Fetching the City that is submitted 
function cityFetcher(){
return fetch(`https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database-breweries%40public&facet=city&facet=state&facet=country&rows=100&refine.city=${structure(cityInput.value)}`)
.then(resp=> resp.json())
.then(function(objs){ 
    let records = objs.records
    console.log(objs)
    console.log(records)
    let counter = 0
    while (counter < records.length){
        // for each brewery found in database it will create a 'p' with that brewery's name. Then next to the name will be wishlist & favorite list buttons
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
        //Adding each fetched brewery into a Brewery Class in brewery.js file
    let brewery = new Brewery(records[counter].fields.city, records[counter].fields.state, records[counter].fields.address1, records[counter].fields.country, records[counter].fields.phone, records[counter].fields.name_breweries, records[counter].fields.descript, records[counter].fields.website)
    breweries.push(brewery)
        console.log(brewery)
        //Adding click event listener on the brewery name to show more info -- the wishlist button to add to wishlist -- the favoritelist button to add to favorites
        p.addEventListener("click", myClick)
        wishList.addEventListener("click", addToWishList)
        favoritedBrewery.addEventListener("click", addToFavorites)
        cityDiv.append(p)
        counter++
    }  
})
}

    

        // The function to show/hide more info on the fetched Brewery    
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
                    newP.className = 'semi-invisible' // This makes the info invisible at first
                    breweryP.append(newP)} 
                    //if its clicked and the extra info class is semi-invisble then change it to be visible
                    if (breweryP && breweryP.children[2].className == 'semi-invisible'){
                        breweryP.children[2].className = 'brewery-subinfo-class'}
                    // else lets change the class to be semi-invisble & remove the element from the DOM
                    else {breweryP.children[2].className = 'semi-invisible' && removePspace(breweryP) }
            
                }
                
               
               // Function will remove the extra Brewery info from the DOM
                function removePspace(){
               
                let p = document.querySelector('p.brewery-subinfo-class')
                let u = document.querySelector('p.undefined')
                if(u){
                  return  u.remove()
                }
                if (p ){
                return p.remove()}
            }
            
    
            // Function will clear all the searched cities and Brewery info from the DOM with help of event listener on the button
            function clearSearch(){
                let clearBtn = document.createElement('button')
                clearBtn.innerHTML = 'Clear Results'
                clearBtn.className = 'clearing-button'
                if (!document.querySelector('button.clearing-button'))
                cityDiv.append(clearBtn)
                clearBtn.addEventListener('click', clearCityDiv)
            }
            // Actually removes all searched cities and clears elements from DOM
            function clearCityDiv(){
                while (cityDiv.firstChild){
                    cityDiv.removeChild(cityDiv.firstChild)
                }
            }



            // Makes the click on Brewery instructions visible
        function makeVisible(){
            let h4 = document.getElementById('clickInstruct');
            h4.className = 'showMoreInfo'
            console.log(h4)
        }



       // Takes the user's city search input & then makes it Titleized Case ( to match the city's info in the Database)
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


