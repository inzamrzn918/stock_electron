
const {ipcRenderer, app} = require("electron")
let $ = require("jquery");

$(document).ready( function() { 
    var isLogin = (localStorage.user!=null)?true:false;

    console.log(isLogin);
    if(isLogin){
        ipcRenderer.send("redirect","dashboard");
    }
// Gouravmehra1857@gmail.com //8952893431
    $("#result").html("");
    // Wait until document is fully parsed
    $("#login-form").on('submit', function(e){
       e.preventDefault();
       var username =  $("#username").val();
       var password =  $("#password").val();
       var role = $("#role").val();

        var data = {username ,password,role}
        console.log(data);
        ipcRenderer.send("login",data);
        ipcRenderer.on("login",(event, ...args)=>{
            if(args[0]['login']){
                localStorage.setItem("user", args[0]['mobile'])
                localStorage.setItem("role", args[0]['role'])
                event.sender.send("login_success",args[0])
                $("#result").html(`<p class="alert alert-success alert-sm">Login Success ! Redirecting to Dashboard</p>`)
            }else{
                $("#result").html(`<p class="alert alert-danger alert-sm">${args['0']['msg']}</p>`)
            }
        })
      
    });
});
