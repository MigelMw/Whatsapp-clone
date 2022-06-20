firebase.auth().onAuthStateChanged((user)=>{

    if(user){
        
        //getting the userid
        let userid = user.uid;
        //pulling all users
        firebase.firestore().collection("users").doc(userid).get().then((doc) =>{
            let username =  doc.data().username;
            
            

            document.getElementById("theuser").innerText = username;
            
            
        })
        firebase.firestore().collection("users").get().then((querySnapshot)=>{

            let content = '';

            querySnapshot.forEach((doc)=>{

                let userName = doc.data().username;
                let theUserId = doc.data().userId;
                let currentTime= new Date();
                let userId = doc.data().userId

                content += '<div style = "border-bottom:1px solid grey;" onclick="viewUser(\''+userId+'\')">';
                    content +='<div style = "justify-content:space-between; display:flex; top:0;">';
                        
                        content += '<h5 style = "padding-bottom:10px; padding-top:0;">'+userName+'</h5>';
                        content += '<h6 style = "text-align:right;" >'+currentTime+'</h6>'
                       
                        
                    content += '</div>'
                    
                content += '</div>';
            })
            $("#allusers").append(content);
        })

        //viewing user
        window.viewUser = function(value){
            //getting user info
            firebase.firestore().collection("users").doc(value).get().then((doc)=>{
                let name = doc.data().username;

                document.getElementById("name").innerText = name;
                console.log(name)
            })
            //sending messages
            document.getElementById("button-addon2").onclick = function(){
                let messageinp = document.getElementById("messageinp").value;

                let sendMessages = firebase.firestore().collection("messages").doc();
                sendMessages.set({
                    messageTo:value,
                    messageFrom:userid,
                    docId:sendMessages.id,
                    isRead:"false",
                    message:messageinp
                }).then(()=>{
                    window.location.href ="home.html" +"?" + value;
                })
            }
        }
        //view messages
        let readMsgUserId = decodeURIComponent(window.location.search);
        let readMsgUserIdRcd = readMsgUserId.substring(1);

        firebase.firestore().collection("users").doc(readMsgUserIdRcd).get().then((doc)=>{
            let name = doc.data().username;

            document.getElementById("messageview").innerText = name;
        })
        //read messages
        firebase.firestore().collection("messages").get().then((querySnapshot)=>{
            let content = ''
            querySnapshot.forEach((doc)=>{
                let message = doc.data().message;
                let messageTo = doc.data().messageTo;
                let messageFrom = doc.data().messageFrom;

                if(messageFrom == userid && messageTo == readMsgUserIdRcd){
                    content += '<div class="myMsgSent">'
                        content += '<p>' + message+'</p>'
                    content += '</div>'

                }else if(messageTo == userid && messageFrom == readMsgUserIdRcd ){
                    content += '<div class="myMsgReceived">'
                        content += '<p>' + message+'</p>'
                    content += '</div>'
                }
            })
            console.log(content)
            $("#allmessages").append(content);
        })




    }else{
        window.location.href = "index.html";
    }

})