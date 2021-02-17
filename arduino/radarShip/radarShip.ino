#include <SPI.h>
#include <WiFiNINA.h>
#include <Servo.h>
#include "arduino_secrets.h"
///////please enter your sensitive data in the Secret tab/arduino_secrets.h
char ssid[] = SECRET_SSID;        // your network SSID (name)
char pass[] = SECRET_PASS;    // your network password (use for WPA, or use as key for WEP)
int keyIndex = 0;                // your network key Index number (needed only for WEP)
long duration;
int distance;
int status = WL_IDLE_STATUS;
Servo myServo;
#define trigPin 6
#define echoPin 7

WiFiServer server(80);

void setup() {
  
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  myServo.attach(5);
  Serial.begin(9600);
  while (!Serial);
  Serial.println("Access Point Web Server");
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communication with WiFi module failed!");
    while (true);
  }
  String fv = WiFi.firmwareVersion();
  if (fv < WIFI_FIRMWARE_LATEST_VERSION) {
    Serial.println("Please upgrade the firmware");
  }
  Serial.print("Creating access point named: ");
  Serial.println(ssid);
  status = WiFi.beginAP(ssid, pass);
  if (status != WL_AP_LISTENING) {
    Serial.println("Creating access point failed");
    while (true);
  }
  delay(10000);
  server.begin();
  printWiFiStatus();
}

void loop() {

  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = duration*0.034/2;
  

  if (status != WiFi.status()) {
    status = WiFi.status();
    if (status == WL_AP_CONNECTED) {
      Serial.println("Device connected to AP");
    } else {
      Serial.println("Device disconnected from AP");
    }
  }
  WiFiClient client = server.available();   // listen for incoming clients
  char clientline[BUFSIZ];
  int index = 0;
  if (client) {                             // if you get a client,
    Serial.println("new client");           // print a message out the serial port
    String currentLine = "";                // make a String to hold incoming data from the client
    boolean current_line_is_blank = true;
    index = 0;
    while (client.connected()) {            // loop while the client's connected
      if (client.available()) {             // if there's bytes to read from the client,
        char c = client.read();             // read a byte, then
        //Serial.write(c);                    // print it out the serial monitor
        if (c == '\n') {                    // if the byte is a newline character
          if (currentLine.length() == 0) {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println();
            Serial.println(distance);
            client.print(random(15, 165));
            client.print(",");
            client.print(distance);
            break;
          }
          else {      // if you got a newline, then clear currentLine:
            currentLine = "";
          }
        }
        else if (c != '\r') {    // if you got anything else but a carriage return character,
          currentLine += c;      // add it to the end of the currentLine
         clientline[index] = c;
         index++;
         // are we too big for the buffer? start tossing out data
         if (index >= BUFSIZ)
           index = BUFSIZ -1;
         continue;
        }
        
       clientline[index] = 0;
        /*
        if (currentLine.endsWith("GET /left")) {
          digitalWrite(motorPin, HIGH);               // GET /left turns the gouvernail to the left
        }

        if (currentLine.endsWith("GET /right")) {
          digitalWrite(motorPin, HIGH);               // GET /right turns the gouvernail to the right
        }*/
        if (strstr(clientline, "/left?angle=") != 0) {
          /*char *powerValue;
          powerValue = clientline + 16;
          (strstr(clientline, " HTTP"))[0] = 0;
          Serial.print(F("Power received : "));
          Serial.println(powerValue);
          int powerInt = atoi(powerValue);*/
          myServo.write(30);
          /*Serial.print(F("ATOI power : "));
          Serial.println(powerInt);*/
         
          client.println(F("HTTP/1.1 TMin Ok"));
          client.println(F("Content-Type: text/html"));
          client.println();
        }
        if (strstr(clientline, "/right?angle=") != 0) {
          /*char *powerValue;
          powerValue = clientline + 16;
          (strstr(clientline, " HTTP"))[0] = 0;
          Serial.print(F("Power received : "));
          Serial.println(powerValue);
          int powerInt = atoi(powerValue);*/
          myServo.write(90);
          /*Serial.print(F("ATOI power : "));
          Serial.println(powerInt);*/
         
          client.println(F("HTTP/1.1 TMin Ok"));
          client.println(F("Content-Type: text/html"));
          client.println();
        }
        if (currentLine.endsWith("/sonar")) {
          Serial.println(distance);
          client.print(distance);         
        }
      }
    }

    // close the connection:
    client.stop();
    Serial.println("client disconnected");
  }
}

void printWiFiStatus() {

  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());
  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
  // print where to go in a browser:
  Serial.print("To see this page in action, open a browser to http://");
  Serial.println(ip);
}


void sendData(int distance){
  Serial.println(distance);
  /*if (client.connect(server, 80)) {
    client.println("POST YOUR_RESOURCE_URI HTTP/1.1");
    client.println("Host: SERVER:PORT");
    client.println("Accept: ");
    client.println("Content-Length: " + content.length());
    client.println("Content-Type: application/x-www-form-urlencoded");
    client.println();
    client.println(distance);
  }*/
}
void getData(int distance){
  Serial.println(distance);
  /*if (client.connect(server, 80)) {
    client.println("POST YOUR_RESOURCE_URI HTTP/1.1");
    client.println("Host: SERVER:PORT");
    client.println("Accept: ");
    client.println("Content-Length: " + content.length());
    client.println("Content-Type: application/x-www-form-urlencoded");
    client.println();
    client.println(distance);
  }*/
}
