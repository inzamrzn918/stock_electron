const {app, BrowserWindow, ipcMain} = require('electron');
const db = require('./db/dboperations.js');
let mainWin;


app.on("ready",(event)=>{
    mainWin = new BrowserWindow({
        height:800,
        width:1200,
        show:false,
        webPreferences : {
            nodeIntegration: true,
            contextIsolation: false
            
        }
    })

    mainWin.webContents.openDevTools();
    mainWin.maximize();
    mainWin.loadURL(`file://${__dirname}/ui/login/login.html`);
    mainWin.on("ready-to-show",(event)=>{
        mainWin.show();
    })


    ipcMain.on("redirect",(event,path)=>{
        switch(path){
            case "dashboard":
                mainWin.loadURL(`file://${__dirname}/ui/index.html`)
                break;
            case "login":
                mainWin.loadURL(`file://${__dirname}/ui/login/login.html`)  
        }
    })




    // Login


    ipcMain.on("login",(event, ...args)=>{
        var username = args[0]['username'];
        var password = args[0]['password'];
        var role = args[0]['role'];
        db.get(`SELECT * FROM user WHERE mobile = '${username}'`,(err, row)=>{
        //   AND password = '${password}'
        //   AND role = '${parseInt(role)}'
        // `, 
        if(!err && row!=null){
            if(row['password']===String(password)){
                if(row['role']==role){
                event.sender.send("login",{
                    login : true,
                    ...row,
                    msg:"login success"
                })
              }else{
                event.sender.send("login",{login:false,...err,msg:"Invalid User"}) 
              }
            }else{
                event.sender.send("login",{login:false,...err,msg:"Authorization Failed"}) 
            }
            
        }else{
                event.sender.send("login",{login:false,...err,msg:"No User found with this information"})
        }
        })

        
    })


    ipcMain.on("login_success",(event, ...args)=>{
        if(mainWin!==null)
            mainWin.loadURL(`file://${__dirname}/ui/index.html`)
    })

   

})


