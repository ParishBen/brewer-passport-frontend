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
 
function grabUserName(){
    let usersName = document.getElementById('welcoming')
    let username= usersName.innerText.toString()
    let runame = username.split(' ').slice(1).join('')
    return runame
}


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
               breweryP.style.color = "green"})
       .then(function(){
           let divList = document.querySelector('div.wishList-show')
           if(divList && divList.children.length >= 1){
               fetchWishList()
               fetchWishList()
           } else {
               fetchWishList()
           }
       })
       .catch(err=> console.log(err))
    }
   
function deleteBrewWish(e){
    let breweryP = e.target.parentElement
    console.log(breweryP)
    let cutBrewery = breweryP.innerText.toString().split(' ').slice(1).join(' ')
    console.log(cutBrewery)

    let brewName = cutBrewery.substring(0, cutBrewery.indexOf(' - Address'))
    if(brewName.match(/[#]/))
    console.log(brewName.match(/[#]/))
    brewName = brewName.replace('#', '%23')
    
    // let usersName = document.getElementById('welcoming')
    // let username= usersName.innerText.toString()
    // let runame = username.split(' ').slice(1).join('')
    //console.log(runame, brewName)
    return fetch(wishlistURL+grabUserName()+'/'+brewName.toString(), {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
            Accept:'application/json'
            
           },
    })
    .then(fetchWishList())
    .then(fetchWishList())
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





wishbutton.addEventListener("click", fetchWishList)

function fetchWishList(){
    // let usersName = document.getElementById('welcoming')
    // let username= usersName.innerText.toString()
    // let runame = username.split(' ').slice(1).join('')
    return fetch(wishlistURL+grabUserName())
    .then(resp=> resp.json())
    .then(json=> renderWishList(json))

}



function renderWishList(theCurrentUser){
    // let wishListDiv = document.querySelector('div#wishListDiv')
    let wishListDiv = document.querySelector('div#wishListDiv')
    //wishListDiv.className = 'semi-invisible'
    console.log(wishListDiv)
    
    let ol = document.createElement('ol')
    ol.id = 'wishlistOL'
    let counter = 0;
    theCurrentUser.forEach(function(brewery){ 
        let li = document.createElement('li')
        li.setAttribute('id', `wishlistLI-${counter}`)
        let delBtn = document.createElement('button')
        delBtn.innerHTML = "Delete"
        delBtn.addEventListener('click',deleteBrewWish)
        let switchBtn = document.createElement('button')
        switchBtn.innerHTML = "Send => Favorites"
        switchBtn.addEventListener('click', switchToFaves)
        li.innerHTML += `Brewery: ${brewery.name} - Address: ${brewery.address ? brewery.address : "Not Listed"} - City: ${brewery.city} - Phone Num: ${brewery.phoneNum ? brewery.phoneNum : "Not Listed"} - Website: ${brewery.website ? brewery.website : "Not Listed"} - State: ${brewery.state ? brewery.state : "Not Listed"} - Description: ${brewery.description ? brewery.description : "Not Listed"} - Country: ${brewery.country ? brewery.country : "Not Listed"}`
        li.append(' ', delBtn, ' ', switchBtn)
        ol.append(li)
        ol.className = 'semi-invisible'
        counter++
    })
    if (ol.firstChild.innerHTML != ''){
        let banner = document.createElement('h3')
         banner.id = 'wishListHeader'
         banner.innerText = 'WISHLIST:'
        wishListDiv.append(banner, ol)
        
    }
    console.log(wishListDiv.children.length, wishListDiv.className, ol.children.length, ol.className)
    if ( wishListDiv.children.length <=2 && ol.className == 'semi-invisible'){ wishListDiv.className = 'wishList-show';
    ol.className = 'ordered-list-show';
} if(wishListDiv.children.length > 2 ) { 
    ol.className = 'ordered-list-show';
    wishListDiv.className = 'wishList-show';
    while (wishListDiv.firstChild){
        wishListDiv.removeChild(wishListDiv.firstChild)
    }
}

console.log(ol.className, wishListDiv.className)
}


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
               fetchFavoriteList()
           } else {
               fetchFavoriteList()
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







  