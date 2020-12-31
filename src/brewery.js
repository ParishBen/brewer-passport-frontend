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
 



function addToWishList(e) {
     
    let breweryP = e.target.parentElement
    let usersName = document.getElementById('welcoming')
    let username= usersName.innerText.toString()
    let runame = username.split(' ').slice(1).join('')
    console.log(runame.value)
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
            "username": runame
            
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
    //    .then(fetchWishList())
       
    //    .catch(err=> console.log(err))


//  FINISH FUNCTIONALITY OF DELETE
function deleteBrewWish(e){
    let breweryP = e.target.parentElement
    console.log(breweryP)
    let cutBrewery = breweryP.innerText.toString().split(' ').slice(1).join(' ')
    console.log(cutBrewery)

    let brewName = cutBrewery.substring(0, cutBrewery.indexOf(' - Address'))
    
    let usersName = document.getElementById('welcoming')
    let username= usersName.innerText.toString()
    let runame = username.split(' ').slice(1).join('')
    console.log(runame, brewName)
    return fetch(wishlistURL+runame+'/'+brewName, {
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



function addToFavorites(e){
   let breweryP = e.target.parentElement
   console.log(breweryP.innerText.toString().substring(0,breweryP.innerText.indexOf('Add to Wishlist')))
    let ret = breweryP.innerText.toString().substring(0,breweryP.innerText.indexOf('Add to Wishlist'))
    let clickedBrewery = breweries.find(brew => brew.name == ret)
       console.log(ret)
       console.log(clickedBrewery)
    return fetch('https://localhost:3000/breweries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json'
            
           },
           body: JSON.stringify({
            "name": clickedBrewery.name,
            "city": clickedBrewery.city,
            "address": clickedBrewery.address,
            "phoneNum": clickedBrewery.phoneNum,
            "website": clickedBrewery.website,
            "description": clickedBrewery.description,
            "country": clickedBrewery.country,
            "state": clickedBrewery.state

           })
    })    
}



//CONSTRUCTING CLASSES
// class Star{
//     constructor(x, y){
//       this.x = x
//       this.y = y
//       this.numParticles = Math.floor(random(3, 7))
//       this.particles = []
//       this.color = Math.floor(random(0, 3))
//       }
  
//       createParticles(){
//         for(let i = 0; i < this.numParticles; i++){
//           let newParticle = new Particle(this.x, this.y, random(5,10), random(0, 2 * PI), this.color)
//           this.particles.push(newParticle)
//       }
//     }
  
//     checkParticles(){
//       this.particles.forEach(particle => {
//         if(particle.alpha < 0){
//           this.particles.splice(this.particles.indexOf(particle), 1)
//         }
//       })
//     }
//   }


//   NEXT EX:
//   class Ball{
//     constructor(x, y, radius, speed, direction, note = null, waveType = null, delayTime = null, releaseTime = null){
//       this.x = x
//       this.y = y
//       this.radius = radius
//       this.speed = speed
//       this.direction = direction
//       if (note === null) {
//         this.note = notes[noteSel.value()]
//         this.waveType = waveSel.value()
//         this.delayTime = delaySlider.value()
//         this.releaseTime = releaseSlider.value()
//     } else {
//         this.note = note
//         this.waveType = waveType
//         this.delayTime = delayTime
//         this.releaseTime = releaseTime
//       }
//       this.sound = createSound(this.note, this.waveType, this.delayTime, this.releaseTime)
//     }
//


wishbutton.addEventListener("click", fetchWishList)

function fetchWishList(){
    let usersName = document.getElementById('welcoming')
    let username= usersName.innerText.toString()
    let runame = username.split(' ').slice(1).join('')
    return fetch(wishlistURL+runame)
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
        li.innerHTML += `Brewery: ${brewery.name} - Address: ${brewery.address ? brewery.address : "Not Listed"} - City: ${brewery.city} - Phone Num: ${brewery.phoneNum ? brewery.phoneNum : "Not Listed"} - Website: ${brewery.website ? brewery.website : "Not Listed"} State: ${brewery.state ? brewery.state : "Not Listed"} - Description: ${brewery.description ? brewery.description : "Not Listed"} - Country: ${brewery.country ? brewery.country : "Not Listed"}`
        li.append(' ', delBtn)
        ol.append(li)
    counter++
})
    if (ol.firstChild.innerHTML != ''){
        wishListDiv.appendChild(ol)
        ol.className = 'semi-invisible'
        
    }
        console.log(wishListDiv.children.length, wishListDiv.className, ol.children.length, ol.className)
    if ( wishListDiv.children.length <=1 && ol.className == 'semi-invisible'){ wishListDiv.className = 'wishList-show';
    ol.className = 'ordered-list-show';
} if(wishListDiv.children.length > 1 ) { 
    ol.className = 'ordered-list-show';
     wishListDiv.className = 'wishList-show';
    while (wishListDiv.firstChild){
        wishListDiv.removeChild(wishListDiv.firstChild)
    }
}
     //removeWishList()}
     //ol.className = 'semi-invisible';
    //if(wishListDiv.className == 'semi-invisible'){
        //wishListDiv.className = "wishList-Class"
 // wishListDiv.className = "wishList-Div"}
    console.log(ol.className, wishListDiv.className)
}
   


// function removeWishList(){
//     let wl = document.querySelector('div.wishList-show')
//     let ol = document.querySelector('ol.ordered-list-show')
//     let unol = document.querySelector('ol.undefined')
    
//     if (ol){
//     ol.remove()
//     }
//     if (unol){
//         unol.remove()
//     }

  