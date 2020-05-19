//William Daniels
//https://youtu.be/HdCtCC9tXlI
var scene;
var c;
var options = { baudrate: 9600};
var serial;
var portName = 'COM3';
var inData;
var outData = 0;
var j = 0;
var g = 1;
var k = 0;
var amt, startColor, newColor;
var timeLeft;
var startTime = 0;
var amtAdder;
var difficultyTime = 15;
var score = 0;
var gameOverMusic;

var myMelody1 = ["D4", "C4", "A4", "C4", "D4", "C4", "A4", "C4", "D4", "C4", "A4", "C4", "D4", "C4", "A4", ["B4", "D4"] ];
var myMelody2 = ["B3", "D4", "F#4", "A4", "B4", "F#5", "B3", "D4", "F#4", "A4", "B4", "F#5", "B3", "D4", "F#4", "A4", "B4", "F#5", "B3", "D4", "F#4", "A4", "B4", "F#5",
                 "B2", "D3", "F#3", "A3", "B3", "C3", "B2", "D3", "F#3", "A3", "B3", "C4", "B2", "D3", "F#3", "A3", "B3", "C3", "B2", "D3", "F#3", "A3", "B3", "C4",
                 "B3", "D4", "F#4", "A4", "B4", "F#5", "B3", "D4", "F#4", "A4", "B4", "F#5", "B3", "D4", "F#4", "A4", "B4", "F#5", "B3", "D4", "F#4", "A4", "B4", "F#5",
                 //"A2", "B3", "A3", "B4", "A4", "B3", "A2", "B3", "D4", "F3", "A3", "B3", "A2", "B3", "A3", "B4", "A4", "B3" ,"A2", "B3", "D4", "F3", "A3", "B3"
                 "F#5", "B4", "A4", "F#3", "D4", "B3", "F#5", "B4", "A4", "F#4", "D4", "B3", "F#5", "B4", "A4", "F#3", "D4", "B3", "F#5", "B4", "A4", "F#4", "D4", "B3"];
var myMelody3 = ["B", "Em", "Gm"];
var playMelody1, playMelody3;
var seq1, seq2, seq3;
var reverb;
var themeMusicSpeed = .3;
var endMusicSpeed = .3;
var synth;

function preload(){
    scene = 0;
}

function setup() {
    createCanvas(640, 480);
    imageMode(CENTER);
    background(255);

    newColor = color(255);
    amt = 0;


    serial = new p5.SerialPort();
    serial.on('list', printList);       // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen);        // callback for the port opening
    serial.on('data', serialEvent);     // callback for when new data arrives
    serial.on('error', serialError);    // callback for errors
    serial.on('close', portClose);      // callback for the port closing

    serial.list();                      // list the serial ports
    serial.open(portName, options);     // open a serial port

    playMelody1 = new Tone.Synth({
        resonance: 0.9
    }).toMaster();

    seq1 = new Tone.Sequence(function(time, note){
        playMelody1.triggerAttackRelease(note, 0.5, time);
    }, myMelody1, themeMusicSpeed);
    Tone.Transport.start();

    synth = new Tone.Synth({
        oscillator: {
            type: "fatsawtooth"
        }
    }).toMaster();

    seq2 = new Tone.Sequence(function(time, note){
        synth.triggerAttackRelease(note, "16n", time);
    }, myMelody2, "14n");

   Tone.Transport.bpm.value = 100;
}

function draw(){
        if(scene == 0){
            seq1.start();
            c = color(150);
            background(c);

            textSize(12);
            fill(255);
            text("p5.js/Tone.js/Arduino Integration Project", 193, 115);
            textSize(30);
            fill(255);
            text("Color Control", 210, 150);

            textSize(10);
            fill(240);
            text("By wdani12@lsu.edu", 245, 175);
            fill(255);
            textSize(18);
            text("Press to Play!", 240, 230);
            fill(150, 0, 0, 50);
            strokeWeight(1);
            rect(230, 200, 130, 50);

            if(mouseX >= 230 && mouseX <= 360 && mouseY >= 200 && mouseY <=250 && click == true){
                scene = 1.5;
            }

            //scene = Math.floor(Math.random() * 4) + 1;
        }

        if(scene == 1.5){
            c = color(150);
            background(c);

            textSize(12);
            fill(255);
            text("p5.js/Tone.js/Arduino Integration Project", 193, 115);
            textSize(30);
            fill(255);
            text("Color Control", 210, 150);
            textSize(10);
            fill(240);
            text("By wdani12@lsu.edu", 245, 175);

            fill(255);
            textSize(18);
            text("Easy", 135, 280);
            fill(150, 0, 0, 50);
            strokeWeight(1);
            rect(85, 250, 130, 50);

            fill(255);
            textSize(18);
            text("Medium", 260, 280);
            fill(150, 0, 0, 50);
            strokeWeight(1);
            rect(230, 250, 130, 50);

            fill(255);
            textSize(18);
            text("Hard", 420, 280);
            fill(150, 0, 0, 50);
            strokeWeight(1);
            rect(375, 250, 130, 50);

            //Easy
            if(mouseX >= 85 && mouseX <= 215 && mouseY >= 250 && mouseY <= 300 && click == true){
                    difficultyTime = 10;
                    scene = Math.floor(Math.random() * 4) + 1;
                    seq1.stop();
                    seq2.start();

            }

            //Medium
            if(mouseX >= 230 && mouseX <= 360 && mouseY >= 250 && mouseY <= 300 && click == true){
                difficultyTime = 7;
                scene = Math.floor(Math.random() * 4) + 1;
                seq1.stop();
                seq2.start();
            }

            //Hard
            if(mouseX >= 375 && mouseX <= 505 && mouseY >= 250 && mouseY <= 300 && click == true){
                difficultyTime = 3;
                scene = Math.floor(Math.random() * 4) + 1;
                seq1.stop();
                seq2.start();
            }
        }

        if (scene == 1){
            if(k < 1){
                timeLeft = difficultyTime;
                k++;
            }

            if (frameCount % 60 == 0 && timeLeft > 0){
                timeLeft--;
            }

            if (timeLeft > (difficultyTime / 1.25)){
                amtAdder = .005;
            }
            if (timeLeft <= (difficultyTime / 1.25) && timeLeft > (difficultyTime / 1.5)){
                amtAdder = .01;
            }
            if (timeLeft <= (difficultyTime / 1.5) && timeLeft > (difficultyTime / 2)){
                amtAdder = .02;
            }
            if (timeLeft <= (difficultyTime / 2) && timeLeft > (difficultyTime / 3)){
                amtAdder = .03;
            }
            if (timeLeft <= (difficultyTime / 3) && timeLeft > (difficultyTime / 8)){
                amtAdder = .04;
            }
            if (timeLeft <= (difficultyTime / 8)){
                amtAdder = .07;
            }
            startColor = color(255, 0, 0);
            background(lerpColor(startColor, newColor, amt));
            amt += amtAdder;
            if(amt >= 1){
                j++;
                amt = 0.0;
                startColor = newColor;
                if(j % 2 == 0){
                    newColor = color(255);
                }
                else{
                    newColor = color(255, 0, 0);
                }
            }
            fill(120, 200);
            strokeWeight(1);
            rect(215, 47, 200, 33);
            //text(amt, 250, 300);
            //text(amtAdder, 250, 350);
            fill(120, 200);
            strokeWeight(1);
            rect(255, 377, 115, 35);
            fill(30);
            text("Time Left: " + timeLeft, 260, 400);
            fill(30);
            textSize(18);
            text("Press the Red Button!", 228, 70);

            if(timeLeft == 0){
                scene = 5;
            }
            if(inData == 47){
              //boop();
              score++;
              k = 0;
              scene = Math.floor(Math.random() * 4) + 1;
            }
        }

        if (scene == 2){
            if(k < 1){
                timeLeft = difficultyTime;
                k++;
            }

            if (frameCount % 60 == 0 && timeLeft > 0){
                timeLeft--;
            }

            if (timeLeft > (difficultyTime / 1.25)){
                amtAdder = .005;
            }
            if (timeLeft <= (difficultyTime / 1.25) && timeLeft > (difficultyTime / 1.5)){
                amtAdder = .01;
            }
            if (timeLeft <= (difficultyTime / 1.5) && timeLeft > (difficultyTime / 2)){
                amtAdder = .02;
            }
            if (timeLeft <= (difficultyTime / 2) && timeLeft > (difficultyTime / 3)){
                amtAdder = .03;
            }
            if (timeLeft <= (difficultyTime / 3) && timeLeft > (difficultyTime / 8)){
                amtAdder = .04;
            }
            if (timeLeft <= (difficultyTime / 8)){
                amtAdder = .07;
            }
            startColor = color(0, 255, 0);
            background(lerpColor(startColor, newColor, amt));
            amt += amtAdder;
            if(amt >= 1){
                j++;
                amt = 0.0;
                startColor = newColor;
                if(j % 2 == 0){
                    newColor = color(255);
                }
                else{
                    newColor = color(0, 255, 0);
                }
            }
            fill(120, 200);
            strokeWeight(1);
            rect(215, 47, 215, 33);
            //text(amt, 250, 300);
            //text(amtAdder, 250, 350);
            fill(120, 200);
            strokeWeight(1);
            rect(255, 377, 115, 35);
            fill(30);
            text("Time Left: " + timeLeft, 260, 400);
            fill(30);
            textSize(18);
            text("Press the Green Button!", 228, 70);

            if(timeLeft == 0){
                scene = 5;
            }
            if(inData == 45){
              //boop();
              score++;
              k = 0;
              scene = Math.floor(Math.random() * 4) + 1;
            }

        }

        if (scene == 3){
            if(k < 1){
                timeLeft = difficultyTime;
                k++;
            }

            if (frameCount % 60 == 0 && timeLeft > 0){
                timeLeft--;
            }

            if (timeLeft > (difficultyTime / 1.25)){
                amtAdder = .005;
            }
            if (timeLeft <= (difficultyTime / 1.25) && timeLeft > (difficultyTime / 1.5)){
                amtAdder = .01;
            }
            if (timeLeft <= (difficultyTime / 1.5) && timeLeft > (difficultyTime / 2)){
                amtAdder = .02;
            }
            if (timeLeft <= (difficultyTime / 2) && timeLeft > (difficultyTime / 3)){
                amtAdder = .03;
            }
            if (timeLeft <= (difficultyTime / 3) && timeLeft > (difficultyTime / 8)){
                amtAdder = .04;
            }
            if (timeLeft <= (difficultyTime / 8)){
                amtAdder = .07;
            }
            startColor = color(0, 0, 255);
            background(lerpColor(startColor, newColor, amt));
            amt += amtAdder;
            if(amt >= 1){
                j++;
                amt = 0.0;
                startColor = newColor;
                if(j % 2 == 0){
                    newColor = color(255);
                }
                else{
                    newColor = color(0, 0, 255);
                }
            }
            fill(120, 200);
            strokeWeight(1);
            rect(215, 47, 200, 33);
            //text(amt, 250, 300);
            //text(amtAdder, 250, 350);
            fill(120, 200);
            strokeWeight(1);
            rect(255, 377, 115, 35);
            fill(30);
            text("Time Left: " + timeLeft, 260, 400);
            fill(30);
            textSize(18);
            text("Press the Blue Button!", 228, 70);

            if(timeLeft == 0){
                scene = 5;
            }
            if(inData == 72){
              //boop();
              score++;
              k = 0;
              scene = Math.floor(Math.random() * 4) + 1;
            }

        }

        if (scene == 4){
            if(k < 1){
                timeLeft = difficultyTime;
                k++;
            }

            if (frameCount % 60 == 0 && timeLeft > 0){
                timeLeft--;
            }

            if (timeLeft > (difficultyTime / 1.25)){
                amtAdder = .005;
            }
            if (timeLeft <= (difficultyTime / 1.25) && timeLeft > (difficultyTime / 1.5)){
                amtAdder = .01;
            }
            if (timeLeft <= (difficultyTime / 1.5) && timeLeft > (difficultyTime / 2)){
                amtAdder = .02;
            }
            if (timeLeft <= (difficultyTime / 2) && timeLeft > (difficultyTime / 3)){
                amtAdder = .03;
            }
            if (timeLeft <= (difficultyTime / 3) && timeLeft > (difficultyTime / 8)){
                amtAdder = .04;
            }
            if (timeLeft <= (difficultyTime / 8)){
                amtAdder = .07;
            }
            startColor = color(255, 255, 0);
            background(lerpColor(startColor, newColor, amt));
            amt += amtAdder;
            if(amt >= 1){
                j++;
                amt = 0.0;
                startColor = newColor;
                if(j % 2 == 0){
                    newColor = color(255);
                }
                else{
                    newColor = color(255, 255, 0);
                }
            }
            fill(120, 200);
            strokeWeight(1);
            rect(215, 47, 215, 33);
            //text(amt, 250, 300);
            //text(amtAdder, 250, 350);
            fill(120, 200);
            strokeWeight(1);
            rect(255, 377, 115, 35);
            fill(30);
            text("Time Left: " + timeLeft, 260, 400);
            fill(30);
            textSize(18);
            text("Press the Yellow Button!", 228, 70);

            if(timeLeft == 0){
                scene = 5;
            }
            if(inData == 46){
              //boop();
              score++;
              k = 0;
              scene = Math.floor(Math.random() * 4) + 1;
            }
        }

        if(scene == 5){
            seq2.stop();
            c = color(150);
            background(c);

            //textSize(26);
            //fill(255);
            //text("Game Over!", 240, 80);
            //fill(200, 0, 0, 100);
            //strokeWeight(1);
            //rect(255, 250, 105, 45);
            //textSize(16);
            //fill(255);
            //text("Score: " + score, 280, 110);
            //textSize(18);
            //text("Refresh to", 265, 275);

            fill(255);
            textSize(30);
            text("Game Over", 20, 120);
            textSize(22);
            fill(255);
            text("Stages cleared: " + score, 20, 230);
            textSize(15);
            fill(255);
            text("(Refresh to play again)", 230, 20);
        }
    clicked();

}

function clicked(){
    if(mouseIsPressed){
        click = true;
    }
    else{
        click = false;
    }
    return false;
}

function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++)
    {
      // Display the list the console:
      text(i + " " + portList[i]);
    }
}

function serverConnected() {
  text('connected to server.');
}

function portOpen() {
  text('the serial port opened.')
}

function serialEvent() {
  // read a byte from the serial port, convert it to a number:
  	inData = serial.read();
}

function serialError(err) {
  text('Something went wrong with the serial port. ' + err);
}

function portClose() {
  text('The serial port closed.');
}

function setupSynth() {
  window.synth = new Tone.Synth({
    oscillator: {
      type: 'sine',
      modulationFrequency: 0.2
    },
    envelope: {
      attack: 0,
      decay: 0.1,
      sustain: 0,
      release: 0.1,
    }
  }).toMaster();
}

function boop() {
  if (!window.synth) {
    setupSynth();
  }

  window.synth.triggerAttackRelease(440, '8n');
}
