let userForm = document.getElementById('user-form')
const userURL = 'http://localhost:3000/users'
userForm.addEventListener("submit", userSubmit)

function userSubmit(e){
    e.preventDefault()
    let usersName = document.getElementById('users-name')
    let userName = document.getElementById('username')
    let userDiv = document.getElementById("welcome")
    let h4 = document.createElement('h4')
     h4.style.color = 'Brown'
     h4.id = 'welcoming'
    h4.innerText =  `Welcome, ${userName.value}`
    let signout = document.createElement('a');
    signout.href = "/localhost:3000/logout";
    signout.target = '_blank';
    signout.innerHTML = "Log Out";
    let par = document.createElement('p')
    par.id = "signout"
    par.appendChild(signout)
    //par.addEventListener("click", fetchSignOut)
    userDiv.appendChild(h4)
    
    fetch(userURL, {
        method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: "application/json"
            },
            body: JSON.stringify({
              "name": usersName.value,
              "username": userName.value
             })
            })
           
    
    userForm.remove()
}




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