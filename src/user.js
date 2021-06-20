let userForm = document.getElementById('user-form')
console.log('scripting from user.js')
const userURL = 'http://localhost:3000/users/'
userForm.addEventListener("submit", userSubmit)

function showLogout(){
  console.log('showing logout btn!')
  document.getElementById('logout').style.display = 'inline'
}

// function logoutFn(){
//   localStorage.removeItem('token')
// }

function userSubmit(e){
  //document.getElementById('logout').style.display = 'inline'
  e.preventDefault()
  console.log('What the heck starting post to user now')
  let usersName = document.getElementById('users-name')
  let userName = document.getElementById('username')
  let userDiv = document.getElementById("welcome")
  let h4 = document.createElement('h4')
  h4.style.color = 'Brown'
  h4.id = 'welcoming'
  h4.innerText =  `Welcome, ${userName.value}`
  userDiv.appendChild(h4)
  //console.log(userName.value, usersName.value)
  fetch(userURL, {
    method: 'POST',
    //mode: 'no-cors',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name":  usersName.value,
      "username":  userName.value
    })
  })
  .then(resp=> resp.json())
  .then(json=> {
    console.log(json)
    //window.localStorage.setItem('name', json["token"]["user"]['name'])
    //window.localStorage.setItem('username', json["token"]["user"]['username'])
    window.localStorage.setItem('token', json["token"]['jwt'])
    window.localStorage.setItem('session', true)
  })
   .then(()=> showLogout())
    .catch(err=> console.log(err))
    userForm.remove()
}

 
function fetchUser(){
  console.log('fetching user')
   const token = localStorage.getItem('token')
  if (token != null){
  console.log(token)
  fetch('http://localhost:3000/get_current_user', {
    credentials: "include",
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
    // }}})
    // fetch('http://localhost:3000/get_session_user', {
    //   method: 'GET',
    //   credentials:'include',
    //   headers: {
    //     'Content-type': 'application/json',
    //     'Accept': 'application/json'
    //   }
    // })
    // .then(resp => resp.json())
    // .then(user=> {
    //     if(user.error){
    //       alert(user.error)
    //     } else{
    //       userForm.remove()
    //       showLogout()
    //       let userDiv = document.getElementById("welcome");
    //       let h4 = document.createElement('h4');
    //        h4.style.color = 'Brown';
    //        h4.id = 'welcoming';
    //       h4.innerText =  `Welcome, ${user.user.username}`;
    //        userDiv.appendChild(h4);
    //   console.log(user.user.username);
    //   }
    // }) 
   
  
  
  

//   const token = localStorage.getItem('token')
//   if (token != null){
//   console.log(token)
//   fetch('http://localhost:3000/get_current_user', {
//     credentials: "include",
//     headers: {
//       'Authorization': token,
//     }
// })
// .then(res => res.json())
// .then(resp=> { 
//   if(resp.error){
//     alert(resp.error)
//   } else {
//       userForm.remove()
//       showLogout()
//       let userDiv = document.getElementById("welcome")
//       let h4 = document.createElement('h4')
//       h4.style.color = 'Brown'
//       h4.id = 'welcoming'
//       h4.innerText =  `Welcome, ${resp.user.username}`
//       userDiv.appendChild(h4)
//   console.log(resp.user.username)}})
//   .catch(err=>console.log)
//   }

  fetchUser()

  //function postToy(toy_data) {
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
    //         console.log("obj_toy: "+ obj_toy.name)
    //         console.log("obj_toy_name: "+obj_toy.image)
    //       })
    //   }