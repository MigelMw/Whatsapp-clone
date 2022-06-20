//signing in existing user
document.getElementById("Signin").onclick = function(){
    //getting value input
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email,password).then((userCred)=>{
        //if sign in is successful user is directed to home page
        window.location.href = "home.html";
    })
}