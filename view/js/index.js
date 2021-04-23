//opretter en funktion der kan oprette en user i vores db

var form = document.getElementById("create")

form.addEventListener('submit', function(e) {
    e.preventDefault()

    var name = document.getElementById("name").value
    var birthday = document.getElementById("birthday").value
    var email = document.getElementById("email").value
    var gender = document.getElementById("gender").value
    var country = document.getElementById("country").value
    var hashedPassword = document.getElementById("hashedPassword").value
  

    fetch("http://localhost:7071/api/createUser", {
        mode: 'no-cors',
        method: 'POST',
        body: JSON.stringify({
            name: name,
            birthday: birthday,
            email: email,
            gender: gender, 
            country: country,
            hashedPassword: hashedPassword,
           
        }), 
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
    }).catch((err) =>{
        console.log(err)
    })
})

//laver en funktion der kan kalde en user tilbage, ved brug af et navn som værdi
var getButton = document.getElementById("getUsers")

getButton.addEventListener("click", function(){
    var name1 = document.getElementById("name").value
    fetch(`http://localhost:7071/api/createUser?name=${name1}`)
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("Noget gik galt" + response.status);
                    return;
                }

                response.json().then(function (data) {
                    console.log(data);
                });
            }
        )
        .catch(function (err){
            console.log(err);
        });
})


var login = document.getElementById("login")

login.addEventListener('login1', function(e) {
    e.preventDefault()

    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
  

    fetch("http://localhost:7071/api/login", {
        mode: 'no-cors',
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
           
        }), 
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
    }).catch((err) =>{
        console.log(err)
    })
})
