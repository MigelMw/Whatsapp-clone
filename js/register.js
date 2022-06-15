document.getElementById("Signup").onclick = function(){

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let username = document.getElementById("name").value;

    firebase.auth().createUserWithEmailAndPassword(email,password).then((userCred)=>{
        let userId = userCred.user.uid;

        firebase.firestore().collection("users").doc(userId).set({

            email:email,
            username:username,
            userId:userId
        }).then((doc)=>{
            window.location.href = "home.html";
        })
    })
}