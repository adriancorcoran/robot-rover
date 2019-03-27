/* 

Robot rover / turtle problem
Description
Create a command line that prompts for commands and moves a rover around a 2D plane.

The robot should point in a direction, turn to face different directions, and take a step in the direcion it is facing.

Demo
Hello! Robot coming online.
Command the robot with:
  L - turn left
  R - turn right
  S - step forward
  ? - this message
  Q - quit
> S
Robot at (0, 1) facing North
> L
Robot at (0, 1) facing West
> S
Robot at (-1, 1) facing West
> S
Robot at (-2, 1) facing West
> R
Robot at (-2, 1) facing North
> R
Robot at (-2, 1) facing East
> S
Robot at (-1, 1) facing East
> ?
Command the robot with:
  L - turn left
  R - turn right
  S - step forward
  ? - this message
  Q - quit
> Q
Robot shutting down.
 */
 
 var readline = require('readline');
var log = console.log;

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var recursiveAsyncReadLine = function () {
  rl.question('Command: ', function (answer) {    

    switch (answer) {
      case 'L':
      case 'R':
        Rover._turn(answer);
        break;
        
      case 'S':
        Rover._move();
        break;
        
      case 'Q':
        console.log(`Robot shutting down...goodbye!`);
        rl.close(); //closing RL and returning from function.
        process.exit(0);
        return;
        break;            
      
      case '?':
        log(`Command the robot with:
  L - turn left
  R - turn right
  S - step forward
  ? - this message
  Q - quit`);
        break;        
      //
      default:
        log(`Please use one of the supported commands, type '?' to see a list of available commands :)`);
        break;
    }
    
    recursiveAsyncReadLine(); //Calling this function again to ask new question
  });
};

// map to hold th erelationship between the directions
const directionMap = ['North', 'East', 'South', 'West'];

const Rover = {
//   track the direction we are facing
  _facing: 'North',
  
//   track our current position
  _position: {
    x: 0,
    y: 0
  },
  
  _whereAmI: function() {
    console.log(`Robot at (${this._position.x}, ${this._position.y}) facing ${this._facing}`);
  },
  
  _move: function() {
//     move the rover, update the position
//     dictates which coordinate to change and in what way
    
    //     get the current position
    let currPos = this._position;
    //     get the current direction
    let currDir = this._facing;
    
//     use a switch to change the position depending on the direction we are facing    
    switch (currDir) {
      case 'North':
        currPos.y++;
        break;
      case 'South':
        currPos.y--;
        break;
      case 'East':
        currPos.x++;
        break;
      case 'West':
        currPos.x--;
        break;
      //
      default:
        console.log(`error, no direction found!`);
        break;
    }
//     display position
    this._whereAmI();
  },
  
  _turn: function(dir = 'L') {
//     turn the rover, log the new direction
    
//     get the current direction
    let currDir = this._facing;
    let currDirKey = directionMap.indexOf(currDir);
    let changeDir;
    //     switch on the new direction to get the new direction
    if (dir == 'L') {
      changeDir = -1;
    }
    else {
      changeDir = 1;
    }
    let newDirKey = currDirKey + changeDir;
//     check if below 0 and go to end of array
    if (newDirKey < 0) {
      newDirKey = directionMap.length - 1
    }
//     check if below above max length and go to start of array
    if (newDirKey > (directionMap.length-1)) {
      newDirKey = 0
    }
//     get new direction
    let newDir = directionMap[newDirKey];
//     update our facing direction
    this._facing = newDir;
    
//     display position
    this._whereAmI();
  }
}


// loaded

// start application

console.log(`Hello! Robot coming online...`);
console.log(`Command the robot with:
  L - turn left
  R - turn right
  S - step forward
  ? - this message
  Q - quit`);

recursiveAsyncReadLine(); //we have to actually start our recursion somehow

