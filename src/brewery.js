// Constructs a class of Breweries
class Brewery{
    constructor(city = null, state = null, address1 = null, country = null, phone = null, name_breweries, descript = null, website = null ){
        this.city = city
        this.state = state
        this.address = address1
        this.name = name_breweries
        this.country = country
        this.phoneNum = phone
        this.description = descript
        this.website = website

    }
}
let breweries = [];
// Setting up Nav Bar with wishlist & favorite list buttons
let nav = document.querySelector('nav')
let wishbutton = document.createElement('button')
wishbutton.innerText = "Your Wish List"
wishbutton.id = "wishbutton"
wishbutton.className = "wishlist-button-class"
let favoritebutton = document.createElement("button")
favoritebutton.innerText = "Favorited List"
favoritebutton.id = "favoritebutton"
favoritebutton.className = "favorite-button-class"
nav.append(wishbutton, favoritebutton)
let wishlistURL = 'http://localhost:3000/wishlists/'
let favoritelistURL = 'http://localhost:3000/favoritelists/'
 
// function used in many Fetch requests to grab the username
function grabUserName(){
    let usersName = document.getElementById('welcoming')
    let username= usersName.innerText.toString()
    let runame = username.split(' ').slice(1).join('')
    return runame
}

// Adding a fetched Brewery to the User's Wishlist
function addToWishList(e) {
     //grabUserName()
    let breweryP = e.target.parentElement
    // let usersName = document.getElementById('welcoming')
    // let username= usersName.innerText.toString()
    // let runame = username.split(' ').slice(1).join('')
    //console.log(runame.value)
   console.log(breweryP.innerText.toString().substring(0,breweryP.innerText.indexOf('Add to Wishlist')))
    let ret = breweryP.innerText.toString().substring(0,breweryP.innerText.indexOf('Add to Wishlist'))
    let clickedBrewery = breweries.find(brew => brew.name == ret)
       console.log(ret)
       console.log(clickedBrewery)
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
           .then(function(){
               // function to change the title & brewery info to green upon adding to wishlist
               breweryP.style.color = "green"})
       .then(function(){
           let divList = document.querySelector('div.wishList-show')
           if(divList && divList.children.length >= 1){
               // function to show the wishlist if it's displayed to the DOM or not already
               fetchWishList()
               fetchWishList()
           } else {
               fetchWishList()
           }
       })
       .catch(err=> console.log(err))
    }
   
    // function that deletes a Brewery from the user's wishlist
function deleteBrewWish(e){
    let breweryP = e.target.parentElement
    console.log(breweryP)
    let cutBrewery = breweryP.innerText.toString().split(' ').slice(1).join(' ')
    console.log(cutBrewery)

    let brewName = cutBrewery.substring(0, cutBrewery.indexOf(' - Address'))
    if(brewName.match(/[#]/))
    console.log(brewName.match(/[#]/))
    brewName = brewName.replace('#', '%23')
    
    // fetching the brewery to delete from this user's wishlist
    return fetch(wishlistURL+grabUserName()+'/'+brewName.toString(), {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
            Accept:'application/json'
            
           },
    })
    .then(fetchWishList()) // This will redisplay the wishlist that's been updated
    .then(fetchWishList())
    .then(function(){
        // this will circle through the displayed brewery titles in CityDiv & then change the color back to black if it was green
        let ps = document.querySelectorAll('p.brewery-info-class')
        for (p of ps){
            let titlep = p.innerText.replace('Add to WishlistAdd to Favorites', '')
            brewName == titlep ? p.style.color = "black" : ''
            console.log(brewName,titlep)
        }
    })
    .catch(err=> console.log(err))
}




// fetches the user's wishlist on click
wishbutton.addEventListener("click", fetchWishList)


//fetch request to backend to grab the user's wishlist
function fetchWishList(){
    
    return fetch(wishlistURL+grabUserName())
    .then(resp=> resp.json())
    .then(json=> renderWishList(json))

}


// function that makes DOM elements to display the returned promise from the fetch request above
function renderWishList(theCurrentUser){
    // let wishListDiv = document.querySelector('div#wishListDiv')
    let wishListDiv = document.querySelector('div#wishListDiv')
    //wishListDiv.className = 'semi-invisible'
    console.log(wishListDiv)
    
    let ol = document.createElement('ol')
    ol.id = 'wishlistOL'
    let counter = 0;
    // will go through the current user's array of wishlist breweries & creates a li for each Brewery and then sets unique id's to each Brewery Li.
    // Then adding a delete button and a send to favorites button
    theCurrentUser.forEach(function(brewery){ 
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
        li.innerHTML += `Brewery: ${brewery.name} - Address: ${brewery.address ? brewery.address : "Not Listed"} - City: ${brewery.city} - Phone Num: ${brewery.phoneNum ? brewery.phoneNum : "Not Listed"} - Website: ${brewery.website ? brewery.website : "Not Listed"} - State: ${brewery.state ? brewery.state : "Not Listed"} - Description: ${brewery.description ? brewery.description : "Not Listed"} - Country: ${brewery.country ? brewery.country : "Not Listed"}`
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
    console.log(wishListDiv.children.length, wishListDiv.className, ol.children.length, ol.className)
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

console.log(ol.className, wishListDiv.className)
}

// refactored to conduct a delete of the Brewery in wishlist first and then send to favorites
function switchToFaves(e){
    deleteBrewWish(e)
// console.log(e.target, e.target.parentElement)
// let clickedBrewery= {};
// let switchingBrewery = e.target.parentElement.innerText.toString().split(' ').slice(1).join(' ')
// //console.log(switchingBrewery)
// let brewName = switchingBrewery.substring(0, switchingBrewery.indexOf(' - Address'))
// let usersName = document.getElementById('welcoming')
//     let username= usersName.innerText.toString()
//     let runame = username.split(' ').slice(1).join('')
//     //console.log(runame, brewName)
//     return fetch(wishlistURL+runame+'/'+brewName, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type':'application/json',
//             Accept:'application/json'
            
//            },
//     })
//     .then(fetchWishList())
//     .then(fetchWishList())
//     .then(function(){
//         let ps = document.querySelectorAll('p.brewery-info-class')
//         for (p of ps){
//             let titlep = p.innerText.replace('Add to WishlistAdd to Favorites', '')
//             brewName == titlep ? p.style.color = "black" : ''
//             console.log(brewName,titlep)
//         }
//     })
    .then(addFaveFromWishList(e))
    .catch(err=> console.log(err))
}

// Since I chose to delete the Brewery from Wishlist first I had to manually parse through the paragraph of Brewery info & assign values from segments of the paragraph
function addFaveFromWishList(e){
    let breweryP = e.target.parentElement
    // let usersName = document.getElementById('welcoming')
    // let username= usersName.innerText.toString()
    // let runame = username.split(' ').slice(1).join('')

    let clickedBrewery = {};
    let ret = breweryP.innerText.toString().split(' ').slice(1).join(' ')
    clickedBrewery.name = ret.substring(0, ret.indexOf(' - Address'))
    let addressque = ret.substring(0, ret.indexOf(' - City:')) 
    let addsliceNum= addressque.indexOf('s:')
    clickedBrewery.address = addressque.slice(addsliceNum+3)
    let cityque = ret.substring(0, ret.indexOf(' - Phone Num:'))
    let citysliceNum = cityque.indexOf('y:')
    clickedBrewery.city = cityque.slice(citysliceNum+3)
    let phoneque = ret.substring(0, ret.indexOf(' - Website:'))
    let phonesliceNum = phoneque.indexOf('m:')
    clickedBrewery.phoneNum = phoneque.slice(phonesliceNum+3)
    let webque = ret.substring(0, ret.indexOf(' - State:'))
    let websliceNum = webque.indexOf('e:')
    clickedBrewery.website = webque.slice(websliceNum+3)
    let stateque = ret.substring(0, ret.indexOf(' - Description'))
    let statesliceNum = stateque.indexOf('ate:')
    clickedBrewery.state = stateque.slice(statesliceNum+5)
    let descque = ret.substring(0, ret.indexOf(' - Country:'))
    let dessliceNum = descque.indexOf('n:')
    clickedBrewery.description = descque.slice(dessliceNum+3)
    let countryque = ret.substring(0, ret.indexOf(' Delete'))
    let countsliceNum = countryque.indexOf('ry:')
    clickedBrewery.country = countryque.slice(countsliceNum+4)
    console.log( clickedBrewery)
    
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
           .then(function(){
               // going through the Breweries searched & will change the color to goldenrod if it matches the name
            let ps = document.querySelectorAll('p.brewery-info-class')
            for (p of ps){
                let titlep = p.innerText.replace('Add to WishlistAdd to Favorites', '')
                clickedBrewery.name == titlep ? p.style.color = "goldenrod" : ''
                console.log(clickedBrewery.name, titlep)
            }
           })
       .then(function(){
           let divList = document.querySelector('div.favoriteList-show')
           if(divList && divList.children.length >= 2){
               fetchFavoriteList()
               fetchFavoriteList() // if it's being displayed will rerender the favoritelist
           } else {
               fetchFavoriteList() // else displaying the favorite list now
           }
       })
       .catch(err=> console.log(err))
    }



function addToFavorites(e) {
     
    let breweryP = e.target.parentElement
    // let usersName = document.getElementById('welcoming')
    // let username= usersName.innerText.toString()
    // let runame = username.split(' ').slice(1).join('')
    
   // console.log(runame.value)
   console.log(breweryP)
   console.log(breweryP.innerText.includes('Add to Wishlist'))
    
   
     let ret = breweryP.innerText.toString().substring(0,breweryP.innerText.toString().indexOf('Add to Wishlist'))
     let clickedBrewery = breweries.find(brew => brew.name == ret) 
       console.log(ret)
       console.log(clickedBrewery)
  
       //console.log(clickedBrewery.)
       //clickedBrewery.city = ret.substring('')
    //    let brewery = new Brewery(records[counter].fields.city, records[counter].fields.state, records[counter].fields.address1, records[counter].fields.country, records[counter].fields.phone, records[counter].fields.name_breweries, records[counter].fields.descript, records[counter].fields.website)
    // breweries.push(brewery)
    //     console.log(brewery)
    //    let clickedBrewery = breweries.find(brew => brew.name == retname) 
    //    console.log(ret, retname, clickedBrewery)
    
   
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

favoritebutton.addEventListener("click", fetchFavoriteList)

function fetchFavoriteList(){
    // let usersName = document.getElementById('welcoming')
    // let username= usersName.innerText.toString()
    // let runame = username.split(' ').slice(1).join('')
    return fetch(favoritelistURL+grabUserName())
    .then(resp=> resp.json())
    .then(json=> renderFavoriteList(json))

}

function renderFavoriteList(theCurrentUser){
    // let wishListDiv = document.querySelector('div#wishListDiv')
    let favoriteListDiv = document.querySelector('div#favoriteListDiv')
    //wishListDiv.className = 'semi-invisible'
    console.log(favoriteListDiv)
      
     let ol = document.createElement('ol')
     ol.id = 'favoritelistOL'
     let counter = 0;
     theCurrentUser.forEach(function(brewery){ 
         let li = document.createElement('li')
         li.setAttribute('id', `favListLI-${counter}`)
         let delBtn = document.createElement('button')
         delBtn.innerHTML = "Delete"
         delBtn.addEventListener('click', deleteBrewFave)
         li.innerHTML += `Brewery: ${brewery.name} - Address: ${brewery.address ? brewery.address : "Not Listed"} - City: ${brewery.city} - Phone Num: ${brewery.phoneNum ? brewery.phoneNum : "Not Listed"} - Website: ${brewery.website ? brewery.website : "Not Listed"} - State: ${brewery.state ? brewery.state : "Not Listed"} - Description: ${brewery.description ? brewery.description : "Not Listed"} - Country: ${brewery.country ? brewery.country : "Not Listed"}`
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
         
     if ( favoriteListDiv.children.length <=2 && ol.className == 'semi-invisible'){ favoriteListDiv.className = 'favoriteList-show';
     ol.className = 'ordered-list-show';
 } if(favoriteListDiv.children.length > 2 ) { 
     ol.className = 'ordered-list-show';
      favoriteListDiv.className = 'favoriteList-show';
     while (favoriteListDiv.firstChild){
         favoriteListDiv.removeChild(favoriteListDiv.firstChild)
     }
 }
      
     console.log(ol.className, favoriteListDiv.className)
 }

 function deleteBrewFave(e){
    let breweryParent = e.target.parentElement
    console.log(breweryParent)
    let cutBrewery = breweryParent.innerText.toString().split(' ').slice(1).join(' ')
    console.log(cutBrewery)

    let brewName = cutBrewery.substring(0, cutBrewery.indexOf(' - Address'))
   
    if(brewName.match(/[#]/))
    console.log(brewName.match(/[#]/))
    brewName = brewName.replace('#', '%23')
    // let usersName = document.getElementById('welcoming')
    // let username= usersName.innerText.toString()
    // let runame = username.split(' ').slice(1).join('')
    //console.log(runame, brewName)
    return fetch(favoritelistURL+grabUserName()+'/'+brewName.toString(), {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
            Accept:'application/json'
            
           },
    })
    .then(fetchFavoriteList())
    .then(fetchFavoriteList())
    .then(function(){
        let ps = document.querySelectorAll('p.brewery-info-class')
        for (p of ps){
            let titlep = p.innerText.replace('Add to WishlistAdd to Favorites', '')
            brewName == titlep ? p.style.color = "black" : ''
            console.log(brewName,titlep)
        }
    })
    .catch(err=> console.log(err))
}







  