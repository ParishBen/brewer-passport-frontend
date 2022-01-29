
const userURL = 'http://localhost:3000/users/'
let userForm = document.getElementById('user-form')
userForm.addEventListener("submit", userSubmit)

function showLogout(){
  document.getElementById('logout').style.display = 'inline'
}

function greetUser(){
  let usersName = document.getElementById('users-name')
   let userName = document.getElementById('username')
    let userDiv = document.getElementById("welcome")
      if(!document.getElementById('welcoming')){
        let h4 = document.createElement('h4')
         h4.id = 'welcoming'
        h4.innerText =  `Welcome, ${userName.value}`
       userDiv.appendChild(h4)
      }
   return [usersName, userName]
}

function userSubmit(e){
  e.preventDefault()
  greetUser()
  fetch(userURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name":  greetUser()[0].value,
      "username":  greetUser()[1].value
    })
  })
  .then(resp=> resp.json())
  .then(json=> {
    window.localStorage.setItem('token', json["token"]['jwt'])
  })
   .then(()=> {showLogout()})
    .catch(err=> console.log(err))
    userForm.remove()
}

 
(function fetchUser(){
   const token = localStorage.getItem('token')
  if (token != null){
  fetch('http://localhost:3000/get_current_user', {
    headers: {
      'Authorization': token,
    }
})
.then(res => res.json())
.then(resp=> { 
  if(resp.error){
    alert(resp.error)
  } else {
      userForm.remove()
       showLogout()
        let userDiv = document.getElementById("welcome")
         let h4 = document.createElement('h4')
           h4.style.color = 'Brown'
          h4.id = 'welcoming'
        h4.innerText =  `Welcome, ${resp.user.username}`
      userDiv.appendChild(h4)
  }})
  .catch(err=>console.log)    
  }
 })();
   
(function anotherPic(){
    let surc = document.querySelector('img#unlogged')
      surc.id = 'UserLanding-img'
       surc.setAttribute('src', "https://images.unsplash.com/photo-1436076863939-06870fe779c2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmVlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60")
      surc.style.width = '300px'
    surc.style.height = '250px'   
})();