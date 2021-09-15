
let userForm = document.getElementById('user-form')
const userURL = 'http://localhost:3000/users/'
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
    window.localStorage.setItem('session', true)
  })
   .then(()=> {showLogout()})
    .catch(err=> console.log(err))
    userForm.remove()
}

 
function fetchUser(){
  console.log('fetching user')
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
  console.log(resp.user.username)}})
  .catch(err=>console.log)    
} else {
      if(localStorage.getItem('session') === 'true'){
       fetch('http://localhost:3000/get_session_user')
      .then(resp => resp.json())
      .then(user=> {
          if(user.error){
            alert(user.error)
        } else{
          userForm.remove()
          showLogout()
          let userDiv = document.getElementById("welcome");
          let h4 = document.createElement('h4');
           h4.style.color = 'Brown';
           h4.id = 'welcoming';
          h4.innerText =  `Welcome, ${user.user.username}`;
           userDiv.appendChild(h4);
      console.log(user.user.username);
      }
    }) 
   }  
  }
}
   
  fetchUser()