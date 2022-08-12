#include <Uri.h>
#include <WebServer.h>
#include <HTTP_Method.h>

#include <WiFi.h>

//net lab ssid and password
const char* wifi_network_ssid = "NET Lab";
const char* wifi_network_password = "enterthenetlab";

//home ssid and password
//const char* wifi_network_ssid = "BARON86";
//const char* wifi_network_password = "1F34333C25C3E850";

//ap ssid and password
const char* soft_ap_ssid = "ESP32";
const char* soft_ap_password = "password";

//create a webserver
WebServer server(80);

void setup() {
  Serial.begin(115200);

  WiFi.mode(WIFI_MODE_APSTA);
  
  //set up wifi
  WiFi.softAP(soft_ap_ssid, soft_ap_password);
  WiFi.begin(wifi_network_ssid, wifi_network_password);

  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.println("Connecting to WiFI...");
  }

  Serial.print("ESP32 ssid: ");
  Serial.println(soft_ap_ssid);
  Serial.print("ESP32 password: ");
  Serial.println(soft_ap_password);

  Serial.print("ESP32 IP as soft AP: ");
  Serial.println(WiFi.softAPIP());

  Serial.print("ESP32 IP on the WiFi network: ");
  Serial.println(WiFi.localIP());

  //set up server
  server.on("/", handle_root);
//  server.enableCORS(true);

  server.begin();
//  server.sendHeader(F("Access-Control-Allow-Origin"), F("*"));
   
  Serial.println("HTTP server started");
  Serial.println("CORS is enabled");
  delay(100);
}

void loop() {
  server.handleClient();
}

String HTML = "<!DOCTYPE html>\
<html>\
<body>\
<h1>Arduino ESP32 Web Server &#9729;</h1>\
</body>\
</html>";

void handle_root(){
  server.send(200, "text/html", HTML);
}
