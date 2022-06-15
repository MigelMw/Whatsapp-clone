firebase.auth().onAuthStateChanged((user)=>{

    if(user){
        
        //getting the userid
        let userid = user.uid;
        //pulling all users
        firebase.firestore().collection("users").get().then((querySnapshot)=>{

            let content = '';

            querySnapshot.forEach((doc)=>{

                let userName = doc.data().username;
                let theUserId = doc.data().userId;

                content += '<div>';
                content += '<h6>'+userName+'</h6>';
                content += '</div>';
            })
            $("#allusers").append(content);

        })



    }else{
        window.location.href = "index.html";
    }

})