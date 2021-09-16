
/**** ESTABLISHING Server Route URLs to conduct CRUD actions ****/
let wishlistURL = 'http://localhost:3000/wishlists/'
let favoritelistURL = 'http://localhost:3000/favoritelists/'

// Constructs a class of Breweries
class Brewery{
    constructor(city = null, state = null, address1 = null, country = null, phone = null, name_breweries, descript = null, website = null ){
        this.city = city
        this.state = state
        this.address = address1
        this.name = name_breweries // name_breweries is name of brewery coming from API
        this.country = country
        this.phoneNum = phone
        this.description = descript
        this.website = website

    }
}

let breweries = [];  // Breweries starts as empty array


// ******Setting up Nav Bar with wishlist & favorite list buttons********
let nav = document.querySelector('nav');   // NAVBAR
let wishbutton = document.createElement('button'); // Create the Navbar button to render Wishlist
let favoritebutton = document.createElement("button"); // Create the Navbar button to render Favorites
let logOutButton = document.getElementById('logout'); // LogoutButton that's established on index.html in Navbar
wishbutton.innerText = "Your Wish List";
wishbutton.id = "wishbutton";
wishbutton.className = "wishlist-button-class";
favoritebutton.innerText = "Favorited List";
favoritebutton.id = "favoritebutton";
favoritebutton.className = "favorite-button-class";

nav.append(wishbutton, favoritebutton) /******NAVBAR now holds wishlist & favorite buttons  */

 
// function used in many Fetch requests to grab the username
function grabUserName(){
    let usersData = document.getElementById('welcoming') // Form that holds the data input from User
    let userNames = usersData.innerText.toString()   // Username & Family name of User
    let theUsername = userNames.split(' ').slice(1).join('')  // The Username sliced from two name array
    return theUsername
}

// Adding a fetched Brewery from the search to the User's Wishlist
function addToWishList(e) {
    let breweryP = e.target.parentElement // The clicked button's Parent element (Brewery Name) 

  //**To Grab Name of Clicked Brewery: ** breweryP.innerText.toString().substring(0,breweryP.innerText.indexOf('Add to Wishlist'))
      let breweryName = breweryP.innerText.toString().substring(0,breweryP.innerText.indexOf('Add to Wishlist'))
      let clickedBrewery = breweries.find(brew => brew.name == breweryName)  //finds the correctly clicked brewery
      
    return fetch(wishlistURL, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            Accept:'application/json' 
        },
        body: JSON.stringify({
            "name": clickedBrewery.name,
            "city": clickedBrewery.city,
            "address": clickedBrewery.address,
            "phoneNum": clickedBrewery.phoneNum,
            "website": clickedBrewery.website,
            "description": clickedBrewery.description,
            "country": clickedBrewery.country,
            "state": clickedBrewery.state,
            "user_id": '',
            "username": grabUserName()  
           })
        })
        .then(resp => resp.json())
        .then(parsedresp=> {
            if(parsedresp.error)
            alert(parsedresp.error)
        })
        .then(function(){
            breweryP.style.color = "green"})
        .then(function(){
          let divList = document.querySelector('div.wishList-show')
            if(divList && divList.children.length >= 1){
              // function to rerender the new wishlist if it's displayed to the DOM
                 fetchWishList()
                 fetchWishList()
         } else { // Render the Wishlist to the DOM since it wasn't currently rendered
              fetchWishList()
             }
           })
    .catch(err=> console.log(err))
}

// Deletes a Brewery from the User's wishlist
function deleteBrewWish(e){
  let breweryP = e.target.parentElement //Clicked button's Parent Element (Brewery's info)
  let cutBrewery = breweryP.innerText.toString()  // This gets the Brewery Name + other text in Element
  let brewName = cutBrewery.substring(0, cutBrewery.indexOf(' - Address'))

  if(brewName.match(/[#]/))
    brewName = brewName.replace('#', '%23')

// sending Delete fetch request to remove brewery from this user's wishlist
  return fetch(wishlistURL+grabUserName()+'/'+brewName.toString(), {  //wishlists/:username/:breweryName
    method: 'DELETE',
    headers: {
        'Content-Type':'application/json',
        Accept:'application/json'
        }
     })
      .then(fetchWishList()) // This will rerender the wishlist that's been updated
      .then(fetchWishList())
    // this will circle through the displayed brewery titles in CityDiv & then change the color back to black if it was green
      .then(function(){
           let ps = document.querySelectorAll('p.brewery-info-class')
            for (p of ps){
              let titlep = p.innerText.replace('Add to WishlistAdd to Favorites', '') 
              brewName === titlep ? p.style.color = "black" : ''
            }
        })
   .catch(err=> console.log(err))
 }

 
 function logoutFn(){
     if(window.localStorage.getItem('token')){
         window.localStorage.removeItem('token')
        }
     return fetch('http://localhost:3000/logout')
          .then(resp=> resp.json())
          .then(ressy=> console.log(ressy.text))
          .then(()=> location.reload())
          .catch(err=>console.log(err)) 
   }
    
    // fetches the user's wishlist on click
    wishbutton.addEventListener("click", fetchWishList)
    logOutButton.addEventListener("click", logoutFn)
    

//fetch request to backend to grab the user's wishlist
function fetchWishList(){
    
    return fetch(wishlistURL+grabUserName())
        .then(resp=> resp.json())
        .then(json=> renderWishList(json)) // Fetches Wishlist & renderWishlist() persists data to DOM
 }

function breweryLiContent(brew){
    return `${brew.name} - Address: ${brew.address ? brew.address : "Not Listed"} - City: ${brew.city} - Phone Num: ${brew.phoneNum ? brew.phoneNum : "Not Listed"} - Website: ${brew.website ? brew.website : "Not Listed"} - State: ${brew.state ? brew.state : "Not Listed"} - Description: ${brew.description ? brew.description : "Not Listed"} - Country: ${brew.country ? brew.country : "Not Listed"}`
}

// function that makes DOM elements to display the returned promise from the fetch request above
function renderWishList(theCurrentUserList){
    // let wishListDiv = document.querySelector('div#wishListDiv')
    let wishListDiv = document.querySelector('div#wishListDiv')
    let ol = document.createElement('ol')
    ol.id = 'wishlistOL'
    
    theCurrentUserList.sort(function(a, b){ // Alphabetizing the Wishlist by Brewery Name.
             
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        // names must be equal
        return 0;
      });

    let counter = 0;
    // will go through the current user's array of wishlist breweries & creates a li for each Brewery and then sets unique id's to each Brewery Li.
    // Then adding a delete button and a send->to->favorites button
    theCurrentUserList.forEach(function(brewery){ 
        let li = document.createElement('li')
        li.setAttribute('id', `wishlistLI-${counter}`)
        let delBtn = document.createElement('button')
        delBtn.innerHTML = "Delete"
        delBtn.addEventListener('click',deleteBrewWish)
        let switchBtn = document.createElement('button')
        switchBtn.innerHTML = "Send => Favorites"
        switchBtn.addEventListener('click', switchToFaves)
        // added event listeners to the buttons to perform functionality upon click
        // adding innerHTML for each Brewery Li. 
        li.innerHTML += breweryLiContent(brewery)
        li.append(' ', delBtn, ' ', switchBtn)
        ol.append(li)
        ol.className = 'semi-invisible'
        counter++
    })
    // if there's a brewery in the list then we'll make the banner and append the entire OL
    if (ol.firstChild.innerHTML != ''){
        let banner = document.createElement('h3')
         banner.id = 'wishListHeader'
         banner.innerText = 'WISHLIST:'
         wishListDiv.append(banner, ol)     
    }
    // At first OL has class of semi-invisble and the wishlist only has OL & banner as children. If this is the case then upon a click we're changing the class to show the entire wishlist.
    if ( wishListDiv.children.length <=2 && ol.className == 'semi-invisible'){ wishListDiv.className = 'wishList-show';
    ol.className = 'ordered-list-show';
  } if(wishListDiv.children.length > 2 ) {  // if it's displayed then the wishlist has more than 2 children (the brewery Li's) so we will go through each childElement and delete it from the WishListDiv
    ol.className = 'ordered-list-show';
    wishListDiv.className = 'wishList-show';
    while (wishListDiv.firstChild){
        wishListDiv.removeChild(wishListDiv.firstChild)
    }
  }
}

// refactored to conduct a delete of the Brewery in wishlist first and then send to favorites
function switchToFaves(e){
    addFaveFromWishList(e)
    deleteBrewWish(e)
}

// Since I chose to delete the Brewery from Wishlist first I had to manually parse through the paragraph of Brewery info & assign values from segments of the paragraph
function addFaveFromWishList(e){
    let breweryP = e.target.parentElement  //The Brewery Name left of button clicked
    let realBrewery = breweryP.innerText.toString()
    clickedBreweryName = realBrewery.substring(0, realBrewery.indexOf(' - Address'))

      fetch(`http://localhost:3000/wishlists/${grabUserName()}/${clickedBreweryName}`, {
        headers: {
            'Authorization': grabUserName()
        }
    })
    .then(resp => resp.json())
    .then(jsonResp => {
        postToFavorites(jsonResp.brewery)
     })
    .catch(err=> console.log(err))
}

function addToFavorites(e) {
     
     let breweryP = e.target.parentElement
     let breweryName = breweryP.innerText.toString().substring(0,breweryP.innerText.toString().indexOf('Add to Wishlist'))
     let clickedBrewery = breweries.find(brew => brew.name == breweryName)     
   
    return fetch(favoritelistURL, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            Accept:'application/json'
            
           },
        body: JSON.stringify({
            "name": clickedBrewery.name,
            "city": clickedBrewery.city,
            "address": clickedBrewery.address,
            "phoneNum": clickedBrewery.phoneNum,
            "website": clickedBrewery.website,
            "description": clickedBrewery.description,
            "country": clickedBrewery.country,
            "state": clickedBrewery.state,
            "user_id": '',
            "username": grabUserName()
           })
        })
           .then(res => res.json())
           .then(jsonResp => {
               if (jsonResp.error)
               alert(jsonResp.error)
           })
           .then(function(){ 
               breweryP.style.color = 'goldenrod'   
         })
       .then(function(){
           let divList = document.querySelector('div.favoriteList-show')
           if(divList && divList.children.length >= 2){
               fetchFavoriteList()
               fetchFavoriteList()
           } else {
               fetchFavoriteList()
           }
       })
       .catch(err=> console.log(err))
    }


    function postToFavorites(brewery) {        
       
        return fetch(favoritelistURL, {
            method: 'POST',

            headers: {
                'Content-Type':'application/json',
                Accept:'application/json'     
               },

            body: JSON.stringify({
                "name": brewery.name,
                "city": brewery.city,
                "address": brewery.address,
                "phoneNum": brewery.phoneNum,
                "website": brewery.website,
                "description": brewery.description,
                "country": brewery.country,
                "state": brewery.state,
                "user_id": brewery.user_id,
                "username": grabUserName()
               })
            })
               .then(res => res.json())
               .then(jsonResp => {
                   if (jsonResp.error)
                   alert(jsonResp.error)
               })
           .then(function(){
               let divList = document.querySelector('div.favoriteList-show')
               if(divList && divList.children.length >= 2){
                   fetchFavoriteList()
                   fetchFavoriteList()
               } else {
                   fetchFavoriteList()
               }
           })
           .catch(err=> console.log(err))
        }

favoritebutton.addEventListener("click", fetchFavoriteList)

function fetchFavoriteList(){

    return fetch(favoritelistURL+grabUserName())
    .then(resp=> resp.json())
    .then(json=> renderFavoriteList(json))
}



function renderFavoriteList(theCurrentUserList){
    let favoriteListDiv = document.querySelector('div#favoriteListDiv')
      
     let ol = document.createElement('ol')
     ol.id = 'favoritelistOL'
     // Live Coding -> Sort Breweries Alphabetically By Name
     
     theCurrentUserList.sort(function(a, b){
             
             if (a.name < b.name) {
               return -1;
             }
             if (a.name > b.name) {
               return 1;
             }
             // names must be equal
             return 0;
           });

     let counter = 0;
     theCurrentUserList.forEach(function(brewery){ 
         let li = document.createElement('li')
         li.setAttribute('id', `favListLI-${counter}`)
         let delBtn = document.createElement('button')
         delBtn.innerHTML = "Delete"
         delBtn.addEventListener('click', deleteBrewFave)
         li.innerHTML += `${brewery.name} - Address: ${brewery.address ? brewery.address : "Not Listed"} - City: ${brewery.city} - Phone Num: ${brewery.phoneNum ? brewery.phoneNum : "Not Listed"} - Website: ${brewery.website ? brewery.website : "Not Listed"} - State: ${brewery.state ? brewery.state : "Not Listed"} - Description: ${brewery.description ? brewery.description : "Not Listed"} - Country: ${brewery.country ? brewery.country : "Not Listed"}`
         li.append(' ', delBtn)
         ol.append(li)
         ol.className = 'semi-invisible'

     counter++
   })
     if (ol.firstChild.innerHTML != ''){
         let banner = document.createElement('h3')
         banner.id = 'favoriteListHeader'
         banner.innerText = 'FAVORITES:'
         favoriteListDiv.append(banner, ol)
         
     }
         
     if ( favoriteListDiv.children.length <=2 && ol.className == 'semi-invisible'){ 
         favoriteListDiv.className = 'favoriteList-show';
         ol.className = 'ordered-list-show';
   } 
     if(favoriteListDiv.children.length > 2 ) { 
      ol.className = 'ordered-list-show';
      favoriteListDiv.className = 'favoriteList-show';
     while (favoriteListDiv.firstChild){
         favoriteListDiv.removeChild(favoriteListDiv.firstChild)
     }
   }
 }

 function deleteBrewFave(e){
    let breweryParent = e.target.parentElement
    let cutBrewery = breweryParent.innerText.toString()
    let brewName = cutBrewery.substring(0, cutBrewery.indexOf(' - Address'))
   
        if(brewName.match(/[#]/))
           brewName = brewName.replace('#', '%23')
    
    return fetch(favoritelistURL+grabUserName()+'/'+brewName.toString(), { //
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
            Accept:'application/json'  
           },
    })
    .then(()=>fetchFavoriteList())
    .then(()=>fetchFavoriteList())
    .then(function(){
        let ps = document.querySelectorAll('p.brewery-info-class')
        for (p of ps){
            let titlep = p.innerText.replace('Add to WishlistAdd to Favorites', '')
            brewName == titlep ? p.style.color = "black" : ''
        }
    })
    .catch(err=> console.log(err))
} 