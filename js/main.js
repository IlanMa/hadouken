var ryu = new Object();  //ryu character
ryu.lifePoints = 100;    //ryu's lifepoints
ryu.name = "Ryu"

var ken = new Object();  //ken character
ken.lifePoints = 100;    //ken's lifepoints
ken.name = "Ken"

var game = new Object();
game.whosTurn = true;     
game.chargeBar = 0;
game.startTimer = true;
game.opponentHealth = 100;

function resetGame(){
    game.whosTurn = true;
    ryu.lifePoints = 100;
    ken.lifePoints = 100;
    document.getElementById("lifeContainer2").style.width = "100%";
    document.getElementById("lifeContainer1").style.width = "100%";
    document.getElementById("clickMe2").disabled = true;
    document.getElementById("clickReset").style.visibility="hidden"; 
    document.getElementById("tellWinner").innerHTML = ""; 
    document.getElementById("fighter1Image").src = "images/ryu.gif";  
    document.getElementById("fighter2Image").src = "images/ken.gif";  
    document.getElementById("lifeContainer1").style.backgroundColor = "green";      
    document.getElementById("lifeContainer2").style.backgroundColor = "green";
    document.getElementById("tellWinner").style.color = "orange";
    animate()      
}

function animate(){
    setTimeout(function(){document.getElementById("tellWinner").innerHTML = "Ready?";},1000)
    setTimeout(function(){document.getElementById("tellWinner").style.color = "red";},3000) 
    setTimeout(function(){document.getElementById("tellWinner").innerHTML = "FIGHT!";},3000)
    setTimeout(function(){document.getElementById("tellWinner").innerHTML = "";},4000)
    setTimeout(function(){document.getElementById("clickMe").disabled = false;},4000)
}

function charge(whosBar, buttonID, containerID, timer, fighterImage, opponent){
    if (game.startTimer){
        game.startTimer = false;
        setTimeout(function(){
            attack(whosBar, buttonID, containerID, timer, fighterImage, opponent)
            $('#'+whosBar+'Bar').css('width', '0%') 
        },5000)   
    }
    game.chargeBar += 2
    var currentRed = 0 + game.chargeBar*3
    var currentGreen = 255 - game.chargeBar*3
    $('#'+whosBar+'Bar').css('width', game.chargeBar +'%')
    $('#'+whosBar+'Bar').css('background-color', 'rgb('+currentRed+','+currentGreen+',0)')
}
function attack(whosBar, buttonID, containerID, timer, fighterImage, opponent){       //triggered every turn
    game.startTimer = true;
    var hitPoints = Math.ceil(Math.random() *game.chargeBar/3) + 5 //damage dealt
    game.chargeBar = 0;        
    
    document.getElementById(buttonID).disabled = true; //disables ryu's button after attack
    document.getElementById(fighterImage).src = "images/"+whosBar+"_hadouken.gif"; //switches to another ryu gif
    setTimeout
        (function(){document.getElementById(fighterImage).src = "images/"+whosBar+".gif"; //switches to original gif after 1.4s
        
        if(game.whosTurn){
            ken.lifePoints -= hitPoints; //determines ken's new lifepoints
            game.opponentHealth = ken.lifePoints
            currentName = ryu.name
        }else{
            ryu.lifePoints -= hitPoints;  
            game.opponentHealth = ryu.lifePoints
            currentName = ken.name
        }
        
        if (game.opponentHealth <= 50 && game.opponentHealth >= 20) {
            document.getElementById(containerID).style.backgroundColor = "yellow";
        } else if (game.opponentHealth < 20){
            document.getElementById(containerID).style.backgroundColor = "red"; 
        }
        
        if (game.opponentHealth <= 0){ //determines if ken is dead or not
            game.opponentHealth = 0; //changes lifepoints to 0 when negative
            document.getElementById(containerID).style.width = game.opponentHealth + "%";  //changes width of lifebar depending on lifepoints
            setTimeout(function(){document.getElementById("clickReset").style.visibility="visible";},2000);  
            document.getElementById("tellWinner").innerHTML = currentName + " Wins!";
            setTimeout(function(){document.getElementById("tellWinner").innerHTML = "";},2000);
            document.getElementById(fighterImage).src = "images/"+whosBar+"_wins.gif";
            
        } else { 
            document.getElementById(opponent).disabled = false; //enables ken's button because the game is not over
            document.getElementById(containerID).style.width = game.opponentHealth + "%";  //changes width of lifebar depending on lifepoints   
        }
    },timer);

    game.whosTurn = !game.whosTurn;
    
}

    
    