int incomingByte = 56; //var to store incoming serial data
const int BUTTON1 = 2; //Input pin for the button
const int BUTTON2 = 4; //Input pin for the button
const int BUTTON3 = 7; //Input pin for the button
const int BUTTON4 = 12; //Input pin for the button
//const int LED1 = 3; //Input pin for the button
//const int LED2 = 6; //Input pin for the button
//const int LED3 = 8; //Input pin for the button
//const int LED4 = 13; //Input pin for the button
int buttonValRed = LOW;
int buttonValGreen = LOW;
int buttonValBlue = LOW;
int buttonValYellow = LOW;
int number1 = 1;
int number2 = 2;
int number3 = 3;
int number4 = 4;

void setup() {
  Serial.begin(9600);
  pinMode(BUTTON1, INPUT);  //Tells Arduino that the button is an input
  pinMode(BUTTON2, INPUT);
  pinMode(BUTTON3, INPUT);
  pinMode(BUTTON4, INPUT);
  //pinMode(LED1, OUTPUT);
  //pinMode(LED2, OUTPUT);
  //pinMode(LED3, OUTPUT);
  //pinMode(LED4, OUTPUT);

}

void loop() {
  buttonValRed = digitalRead(BUTTON1); //Read input value and store it
  buttonValGreen = digitalRead(BUTTON2); //Read input value and store it
  buttonValBlue = digitalRead(BUTTON3); //Read input value and store it
  buttonValYellow = digitalRead(BUTTON4); //Read input value and store it
  
  if(buttonValRed == HIGH){
    
    Serial.write(47);
    delay(450);
    
    //digitalWrite(LED1, HIGH);
    
  }
  if(buttonValGreen == HIGH){
    
    Serial.write(45);
    delay(450);
    //digitalWrite(LED2, HIGH);
    
  }
  if(buttonValBlue == HIGH){
    
    Serial.write("H");
    delay(450);
    //digitalWrite(LED3, HIGH);
    
  }
  if(buttonValYellow == HIGH){
    
    Serial.write(46);
    delay(450);
    //digitalWrite(LED4, HIGH);
    
  }
  else{
    //digitalWrite(LED, LOW);
  }
  
}