#include <WiFi.h>

const char* wifi_network_ssid = "NET Lab";
const char* wifi_network_password = "enterthenetlab";

const char* soft_ap_ssid = "ESP32_AP";
const char* soft_ap_password = "testpassword";

void setup() {
  Serial.begin(115200);

  WiFi.mode(WIFI_MODE_APSTA);

  WiFi.softAP(soft_ap_ssid, soft_ap_password);
  WiFi.begin(wifi_network_ssid, wifi_network_password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }

  Serial.print("Esp32 IP as soft AP: ");
  Serial.println(WiFi.softAPIP());

  Serial.print("ESP32 IP on the WiFi network: ");
  Serial.println(WiFi.localIP());
}


void loop() {}
