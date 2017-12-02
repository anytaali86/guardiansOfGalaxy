$(document).ready(function(){
var theme = new Audio("assets/sounds/hoka.mp3");
theme.volume = 0.05; 
var character;
var characterChosen;
var enemyChosen = false;
var opponent;
var defeated = false; 
var backgrounds = ["assets/images/tatooine.jpg", "assets/images/endorbg.jpg", "assets/images/hothbg.jpg", "assets/images/background.jpg"];
// theme.addEventListener('ended', function() {
//     this.currentTime = 0;
//     this.play();
// }, false);
theme.play(); 

//Object declarations for characters.
var characters = [
	gamora = {
		name: "Gamora",
		image: "<img src = 'assets/images/gamora3.png' id = 'gamora' height='200px'>",
		defendImage: "<img src = 'assets/images/gamora3.png' height='200px'>",
		baseAttack: 5,
		attack: 5,
		health: 50,
		choseSound: new Audio('assets/sounds/gamora.mp3')
	},

	rocket = {
		name: "Rocket",
		image: "<img src = 'assets/images/rocket.png' id = 'rocket' height='200px'>",
		defendImage: "<img src = 'assets/images/rocket.png' height='200px'>",
		baseAttack: 6,
		attack: 6,
		health: 80,
		choseSound: new Audio('assets/sounds/rocket.mp3')
	},

	drax = {
		name: "Drax",
		image: "<img src = 'assets/images/drax.png' id = 'drax' height='200px'>",
		defendImage: "<img src = 'assets/images/drax.png' height='200px'>",
		baseAttack: 8,
		attack: 8,
		health: 60,
		choseSound: new Audio('assets/sounds/drax.mp3')
	},

	peter = {
		name: "Peter",
		image: "<img src = 'assets/images/peter.png' id = 'peter' height='200px'>",
		defendImage: "<img src = 'assets/images/peter.png'>",
		baseAttack: 10, 
		attack: 10,
		health: 40,
		choseSound: new Audio('assets/sounds/peter.mp3')
	}
];

var enemyCount = (characters.length - 1); 
console.log(enemyCount);

//Title Screen Animations
	$('#bg').append("<img src = 'assets/images/backgrounds.png'");
	$('#middle').append("<button type='button' class='btn btn-outline-warning' id='start'>Start Game</button>");
	$('#bottom').append("<img src = 'assets/images/logo.png'>");
	fadeAllIn();
	console.log(character);
//Start Game on clicking the #start button.
	$('#start').on("click", function(){
		$(document.body).css('background-image', 'url(assets/images/background.jpg)')
			theme.pause(); 
			playGame();
			var saber = new Audio("assets/sounds/saber.mp3");
			saber.play();
		
	});	

//Function declarations---------------------------------------------------------------
	
//Function to fade out all elements
	function fadeAllOut(){
		// $('#bg').empty(); 
		//$('#top').fadeOut("slow");
		$('#top').empty();
		//$('#middle').fadeOut("slow");
		$('#middle').empty();
		//$('#bottom').fadeOut("slow");
		$('#bottom').empty();
		$('#attackerZone').empty();
		//$('#attackerZone').fadeOut("slow");
		$('#attackButton').empty();
		//$('#attackButton').fadeOut("slow");
		$('#defenderZone').empty();
		//$('#defenderZone').fadeOut("slow");
	};

//Functino to fade in all elements
	function fadeAllIn(){
		// $('#bg').fadeIn("slow");
		$('#top').fadeIn("slow");
		$('#middle').fadeIn("slow");
		$('#bottom').fadeIn("slow");
		$('#attackerZone').fadeIn("slow");
		$('#attackButton').fadeIn("slow");
		$('#defenderZone').fadeIn("slow");
	};
//Play Game Function
	function playGame(){
		fadeAllOut();
		$('#bg').hide(); 
		// $('#top').append("<img src = 'assets/images/logo.png' class = 'img-responsive'>");
		$('#middle').append("<h1>Choose your character</h1>");
		$('#bottom').append(gamora.image, rocket.image, drax.image, peter.image);
		fadeAllIn();
			$('#bottom').on("click", "img[id = gamora]", function(){
				chooseChar(gamora);
			});
			$('#top').on("click", "img[id = gamora]", function(){
				if(enemyChosen == false){
					chooseOpponent(gamora);
					$('img[id=gamora]').fadeTo("slow", 0.0);
				}

			});
			$('#bottom').on("click", "img[id = rocket]", function(){
				chooseChar(rocket);
			});
			$('#top').on("click", "img[id = rocket]", function(){
				if(enemyChosen == false){
					chooseOpponent(rocket);
					$('img[id=rocket]').fadeTo("slow", 0.0);
				}
			})
			$('#bottom').on("click", "img[id = drax]", function(){
				chooseChar(drax);
			});
			$('#top').on("click", "img[id = drax]", function(){
				if(enemyChosen == false){
					chooseOpponent(drax);
					$('img[id=drax]').fadeTo("slow", 0.0);
				}
			})
			$('#bottom').on("click", "img[id = peter]", function(){
				chooseChar(peter);
			});
			$('#top').on("click", "img[id = peter]", function(){
				if(enemyChosen == false){
						chooseOpponent(peter);
						$('img[id=peter]').fadeTo("slow", 0.0);
				}
			
			})
			$('#attackButton').on("click", function(){
				if(enemyChosen == true){
					attack(character, opponent)
				}
				else if (enemyCount == 0){
					winner(character);
				}
			});	
		}
//Choose character function
	function chooseChar(char){
		characterChosen = true; 
		var sound = char.choseSound;
		character = char;
		console.log(character);
		sound.play();
		fadeAllOut();
		battle(char);

	}
//Chooses your opponent for the roung
	function chooseOpponent(char){
		char.choseSound.play();
		if(enemyChosen == false){
			opponent = char; 
			enemyChosen = true; 
			$('#defenderZone').empty(); 
			$('#attackButton').empty();
			$('#defenderZone').append("<div id = 'opponent'>"+char.defendImage+"<br><h4>"+char.name+"<br>Attack Power: "+char.attack+"<br>Health: "+char.health+"</h4></div>");
			$('#defenderZone').fadeTo("slow", 1.0);
			$('#attackButton').append("<button class = 'btn btn-danger attackButton'>Attack!</button>");

		}
	}
//Function to set up the battleground. This should onlny be called once to set up the playing field. After a player chooses their character. 
	function battle(char){
		$('#top').append("<div id = 'enemies'></div>");
		$('#middle').append("<div class = 'feedcontainer'><div id = 'feed'><p>Welcome to the battle, Guardian. Choose an enemy above to begin attacking to acquire the ORB.</p></div></div>");
		$("#attackerZone").append("<div id = 'player'>"+char.image+"<br><h4>"+char.name+"<br>Attack Power: "+char.attack+"<br>Health: "+char.health+"</h4></div>");
		//for loop that goes through the enemies and makes sure thta each is added. 
		for(var i = 0; i < characters.length; i++){
			var enemy = "enemy"+i;  
			if(characters[i].name != char.name){
				$('#enemies').append("<div id ="+enemy+">"+characters[i].image+"</div>");
			}
		}
	fadeAllIn();
	}

//Takes the character that was clicked and attacks it. 
	function attack(attacker, defender){
		var saberSounds = ["assets/sounds/saber2.mp3", "assets/sounds/saber3.mp3", "assets/sounds/saber4.mp3"]
		var sound = new Audio (saberSounds[Math.floor(Math.random()*saberSounds.length)]);
		if(defender.health > 0 && attacker.health > 0){
			sound.play(); 
		//Changes the objects values and updates the DOM to show the player. 
			$('#feed').prepend("<p id = 'attacker'>"+attacker.name+" attacks "+defender.name+" for "+attacker.attack+" damage!</p>");
				defender.health = defender.health - attacker.attack; 
			$('#feed').prepend("<p id = 'counter'>"+defender.name+" counters "+attacker.name+" for "+defender.attack+" damage!</p>");
				attacker.health = attacker.health - defender.attack; 
				attacker.attack = attacker.attack + attacker.baseAttack;
			$('#feed').prepend("<p id = 'attackGain'>"+attacker.name+" feels the power!! He gains "+attacker.baseAttack+" attack power, bringing him up to "+attacker.attack+" damage!</p>");
			$('#attackerZone').animate({left: "+=100px"});
			$('#defenderZone').animate({left: "-=100px"});
			$('#attackerZone').animate({left: "-=100px"});
			$('#defenderZone').animate({left: "+=100px"});
		//Updates the DOM to show the values of the players health, attack power etc. 
			$("#attackerZone").html("<div id = 'player'>"+attacker.image+"<br><h4>"+attacker.name+"<br>Attack Power: "+attacker.attack+"<br>Health: "+attacker.health+"</h4></div>");
			$('#defenderZone').html("<div id = 'opponent'>"+defender.image+"<br><h4>"+defender.name+"<br>Attack Power: "+defender.attack+"<br>Health: "+defender.health+"</h4></div>");
			if(defender.health <= 0){
				attack(attacker, defender);
			}
		}
		else if (defender.health <= 0 && attacker.health > 0){
			var dead = new Audio("assets/sounds/scream.mp3");
			dead.play();
			var done = new Audio("assets/sounds/done.mp3");
			done.play();
			$('#attackButton').empty();
			$('#defenderZone').fadeTo('slow', 0.0);
			$('#attackButton').append("<button class = 'btn btn-danger dummyButton'>Attack!</button>");
			$('#feed').prepend("<p id = 'defenderDead'>"+attacker.name+" has defeated "+defender.name+"! Please choose a new opponent, "+attacker.name+".");
			enemyChosen = false; 
			defender.image = defender.deadImage;
			enemyCount--; 
			if(enemyCount == 0){
				winner(attacker);
			}
		}
		
		else if (attacker.health <= 0){
			var dead = new Audio("assets/sounds/scream.mp3");
			dead.play();
			$('#attackButton').html("<button class = 'btn btn-danger' id = 'reset'>Start a New Game</button>");
			$('#feed').prepend("<p id = 'attackerDead'>"+defender.name+" has defeated "+attacker.name+"! Please click the button to start a new game.");
			loser(attacker);
		}
	}
//Win Code
	function winner(char){
		fadeAllOut();
		$('#top').append("<img src = 'assets/images/starwars.png' class = 'img-responsive'>");
		$('#middle').append("<h1>Congratulations, "+char.name+" you have won the ORB!</h1>");
		$('#bottom').append("<button class = 'btn btn-warning' id = 'reset'>Fight Again?</button>");
		fadeAllIn();
		$('#reset').on("click", function(){
				playAgain();
			});
	}
//Loser Code
	function loser(char){
		fadeAllOut();
		$('#top').append("<img src = 'assets/images/starwars.png' class = 'img-responsive'>");
		$('#middle').append("<h1>"+char.name+", the galaxy was not with you. Train harder!</h1>");
		$('#bottom').append("<button class = 'btn btn-warning' id = 'reset'>fight Again?</button>");
		fadeAllIn();
		$('#reset').on("click", function(){
				playAgain();
			});
	}
//Play again 
	function playAgain(){
		console.log("Play again is being pushed.");

		character = "";
		characterChosen = "";
		enemyChosen = false;
		opponent = "";
		defeated = false; 
		enemyCount = (characters.length - 1); 
	characters = [
	gamora = {
		name: "Gamora",
		image: "<img src = 'assets/images/gamora3.png' id = 'gamora' height='200px'>",
		defendImage: "<img src = 'assets/images/gamora3.png'>",
		baseAttack: 5,
		attack: 5,
		health: 50,
		choseSound: new Audio('assets/sounds/gamora.mp3')
	},

	rocket = {
		name: "Rocket",
		image: "<img src = 'assets/images/rocket.png' id = 'rocket' height='200px'>",
		defendImage: "<img src = 'assets/images/rocket.png'>",
		baseAttack: 6,
		attack: 6,
		health: 80,
		choseSound: new Audio('assets/sounds/rocket.mp3')
	},

	drax = {
		name: "Drax",
		image: "<img src = 'assets/images/drax.png' id = 'drax' height='200px'>",
		defendImage: "<img src = 'assets/images/drax.png'>",
		baseAttack: 8,
		attack: 8,
		health: 60,
		choseSound: new Audio('assets/sounds/drax.mp3')
	},

	peter = {
		name: "YPeter",
		image: "<img src = 'assets/images/peter.png' id = 'peter' height='200px'>",
		defendImage: "<img src = 'assets/images/peter.png'>",
		baseAttack: 10, 
		attack: 10,
		health: 40,
		choseSound: new Audio('assets/sounds/peter.mp3')
	}
];
		fadeAllOut();
		playGame();
	}
});