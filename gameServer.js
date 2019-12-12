const express = require("express");
const path = require("path");
const app1 = express();
//const app2 = express();
const axios = require('axios').default;

let WIDTH = 700;
let HEIGHT = 600;

let player1 ={
    
    width: 20,
    height: 100,

    x: 4,
    y: 250,
}

let player2 ={
    
    width: 20,
    height: 100,

    x: (WIDTH - 20 - 4),
    y: 250,
}

let ball = {
    x: WIDTH/2,
    y: HEIGHT/2,
    direction: 1.5,
    speed: .5,
    rad: 5,
}

let vel = {
    x: ball.speed,
    y: ball.speed,
}

function  collidePlayer1()
{
    //let leftX, rightX, topY, bottomY;

    let disX, disY;

    disX = Math.abs(ball.x - player1.x-player1.width/2);
    disY = Math.abs(ball.y = player1.y - player1.height/2);

    if(disX <= (player1.width/2)) {return true;}
    if(disY <= (player1.height/2)) {return true;}
    
    return false;

    //disX = Math.abs()

    //Getting parameters the range of the first pannel
    /*leftX = player1.width/2 - player1.x;
    rightX = player1.width/2 + player1.x;
    topY = Math.abs(player1.y - player1.height/2);
    bottomY = player1.height/2 + player1.y;

    let radLeft, radRight, radTop, radBottom;

    radLeft = ball.x - ball.rad;
    console.log('It got into the collider');

    if(radLeft >= leftX && radLeft <= rightX && ball.y >= topY && ball.y <= bottomY)
    {
        
        return true;
    }
    else{
        return false;
    }
    */
}
//Recieving Data for player one
console.log("Loading Player 1");
app1.get("/", (req, res) => {
     res.sendFile(path.join(__dirname, "/player1.html"));
})



//Recieving Data for player two
console.log("Loading Player 2");
app1.get("/p2", (req, res) => {
    res.sendFile(path.join(__dirname, "/player2.html"));
}) 


/*
app1.get("/player", (req, res) => {
    var newPar = 'This is from the javascript';
    res.send(newPar);
})*/

/*app1.use("/player1", (req, res) => {
    console.log('This is from the server');
    console.log()
})*/

app1.get('/player1UP', (req, res) =>{
    player1.y -= 7;
    res.send(true);
})

app1.get('/player1Down', (req, res) =>{
    console.log("In player 1 down");
    player1.y += 7;
    console.log(player1.y);
    res.send(true);

})

app1.get('/player1CurrentPosX', (req, res) => {
    var x = '' + player1.x;

    res.send(x);
    //res.sendStatus(player1.x);
})

app1.get('/player1CurrentPosY', (req, res) => {
    //console.log(player1.y);
    var y = '' + player1.y;
    res.send(y);
})

app1.get('/player2UP', (req, res) =>{
    player2.y -= 7;
    res.send(true);
})

app1.get('/player2Down', (req, res) =>{
    console.log("In player 1 down");
    player2.y += 7;
    console.log(player1.y);
    res.send(true);

})

app1.get('/player2CurrentPosX', (req, res) => {
    var x = '' + player2.x;

    res.send(x);
    //res.sendStatus(player1.x);
})

app1.get('/player2CurrentPosY', (req, res) => {
    //console.log(player2.y);
    var y = '' + player2.y;
    res.send(y);
})


app1.get('/ballUpdateX', (req, res) => {
    if(ball.x > WIDTH)
    {
        vel.x = vel.x * -1;
    }
    if(ball.x < 0)
    {
        vel.x = vel.x * -1;
    }
    ball.x += vel.x;
    //console.log(ball.x);
    var x =  '' + ball.x;
    res.send(x);
})



app1.get('/ballUpdateY', (req, res) => {

    if(ball.y > HEIGHT)
    {
        vel.y = vel.y * -1;
    }
    if(ball.y < 0)
    {
        vel.y = vel.y * -1;
    }
    ball.y += vel.y;
    console.log(ball.y);
    var y =  '' + ball.y;
    res.send(y);
})

app1.get('/getColliderPlayer1', (req, res) => {
    
    var collision = false;

    let leftX, rightX, topY, bottomY;
    leftX = Math.abs(player1.x);
    rightX = Math.abs(player1.width + player1.x);
    topY = Math.abs(player1.y);
    bottomY = player1.height + player1.y;

    let radLeft, radRight, radTop, radBottom;

    radLeft = Math.abs(ball.x - ball.rad);
    console.log(rightX);
    console.log(radLeft);

    console.log('It got into the collider');

    /*
    if(radLeft >= leftX && radLeft <= rightX && ball.y >= topY && ball.y <= bottomY)
    {
        
        collision = true;
    }
    */
    
    if(radLeft <= rightX)
    {
        collision = true;
    }

    //collision = collidePlayer1();
        /*
        let angle, length;

        angle = Math.atan(ball.y, ball.x);
        length = Math.sqrt(ball.x * ball.x + ball.y*ball.y);

        ball.x = Math.cos(angle) * length;
        ball.y = Math.sin(angle)*length;
        /*
        vel.x = vel.x * -1;
        ball.x += vel.x;
        //console.log(ball.x);
    }

    var x =  '' + ball.x;
    res.send(x);
})



app1.get('/getColliderPlayer2', (req, res) => {
    
    var collision = false;

    let leftX, rightX, topY, bottomY;
    leftX = Math.abs(player2.x);
    rightX = Math.abs(player2.width + player2.x);
    topY = Math.abs(player2.y);
    bottomY = player2.height + player2.y;

    let radLeft, radRight, radTop, radBottom;

    radRight = Math.abs(ball.x + ball.rad);
    console.log(leftX);
    console.log(radRight);

    console.log('It got into the collider');

    /*
    if(radLeft >= leftX && radLeft <= rightX && ball.y >= topY && ball.y <= bottomY)
    {
        
        collision = true;
    }
    */
    
    if(radRight >= leftX)
    {
        collision = true;
    }

    //collision = collidePlayer1();
    if(collision == true)
    {
        vel.x = vel.x * -1;
        ball.x += vel.x;
        //console.log(ball.x);
    }

    var x =  '' + ball.x;
    res.send(x);
})



//Retries data from player1 of position of player1
/*
app1.get('/player1/:playerPos', (req, res) =>{
    //playerPos = req.params["playerPros"];
    console.log(playerPos.x);
    console.log(playerPos.y);
    //console.log(JSON.stringify(req.params["playerPos"]));
})
*/

app1.listen(7000, function(err){
    if(err)
        return console.log("Err" + err);
})


app1.listen(7001, function (err){
    if(err)
        return console.log("Err" + err);
})

