# Welcome !

This is my Home Automation Repository.
Currently it represents the root of my home assistant installation.
In the future this may be migrated from home assistant to home assistant core and seperate deployments on kubernetes.

## Software

This is my Home Assistant installation. Some statistics about my installation:

Description | value
-- | --
Number of entities | 2122
Number of sensors | 913

It is built using the following components:

- card_mod
- layout_card
- auto-entities
- browser_mod
- lovelace_gen
- magic_areas
- alarmo
- adaptive_lighting
- esphome
- frigate
- music assistant
  
Inspiration from:

- mushroom
- dwains dashboard
- homekit infused

Currently in the midst of refactoring the lovelace_gen global vars in `lovelace_rooms.yaml`.

### Lovelace / Frontend

The main idea is that there is just a single dashboard, with 3 types of views:

1. The main view in `lovelace/0_main.yaml`
1. Per room from `lovelace_rooms.yaml` a view in `lovelace/rooms.yaml`
1. Per view from `lovelace_views.yaml` a subview in `lovelace/views.yaml`

The 'scaffolding' or build-up of each view is exactly the same:

```yaml
type: panel
cards:
  - type: custom:mod_card
    card_mod:
      class: invisible  # remove borders/background/corners/margin/padding
      style: |
        ha-card { <logic here for background based on entity_picture of media_player> }
    card:
      type: custom:state-switch
      entity: mediaquery
      states:
        '(orientation: landscape)':
          type: vertical-stack
          cards:
            - !include
              - .cards/sticky.yaml
              - view: <viewname>
                position: both
            - type: custom:layout-card
              layout_type: custom:grid-layout
              layout: !include .cards/layout.yaml
              cards: !include
                - .cards/<viewname>.yaml
                - orientation: landscape
        `(orientation: portrait)':
          type: vertical-stack
          cards:
            - !include
              - .cards/sticky.yaml
              - view: <viewname>
                position: header
            - type: custom:layout-card
              layout_type: custom:grid-layout
              layout: !include .cards/layout.yaml
              cards: !include
                - .cards/<viewname>.yaml
                - orientation: portrait
            - !include
              - .cards/sticky.yaml
              - view: <viewname>
                position: footer
```

#### Lovelace_gen

- `configuration.yaml`
- `ui-lovelace.yaml`
- `resources.yaml`
- `lovelace_rooms.yaml`
- `lovelace_views.yaml`
- `lovelace/**/*`

#### Sticky bar(s)

- `themes/transparent.yaml`
- `lovelace/.cards/sticky.yaml`

#### Masonry for layout_card grid layout

- `www/style.js`
- `lovelace/.cards/layout.yaml`

#### HACS Lovelace cards
- [Alarmo Card](https://github.com/nielsfaber/alarmo-card)
- [Auto Entities](https://github.com/thomasloven/lovelace-auto-entities)
- [Auto Generating Mushroom Dashboard Strategy](https://github.com/AalianKhan/mushroom-strategy)
- [Bar Card](https://github.com/custom-cards/bar-card)
- [Better Thermostat Ui](https://github.com/KartoffelToby/better-thermostat-ui-card)
- [Bubble Card](https://github.com/Clooos/Bubble-Card)
- [Card Mod](https://github.com/thomasloven/lovelace-card-mod)
- [Card Tools](https://github.com/thomasloven/lovelace-card-tools)
- [Clock Weather Card](https://github.com/pkissling/clock-weather-card)
- [Config Editor Card](https://github.com/htmltiger/config-editor-card)
- [Custom Brand Icons](https://github.com/elax46/custom-brand-icons)
- [Custom Icons](https://github.com/Mariusthvdb/custom-icons)
- [Custom More Info](https://github.com/Mariusthvdb/custom-more-info)
- [Custom Ui](https://github.com/Mariusthvdb/custom-ui)
- [Dual Gauge Card](https://github.com/custom-cards/dual-gauge-card)
- [Expander Card](https://github.com/Alia5/lovelace-expander-card)
- [Flower Card](https://github.com/Olen/lovelace-flower-card)
- [Formula One Card](https://github.com/marcokreeft87/formulaone-card)
- [Frigate Card](https://github.com/dermotduffy/frigate-hass-card)
- [Google Home Timers Card](https://github.com/DurgNomis-drol/google_home_timers_card)
- [Hass Hue Icons](https://github.com/arallsopp/hass-hue-icons)
- [Header Cards](https://github.com/gadgetchnnel/lovelace-header-cards)
- [History Explorer Card](https://github.com/alexarch21/history-explorer-card)
- [Hourly Weather Card](https://github.com/decompil3d/lovelace-hourly-weather)
- [Kiosk Mode](https://github.com/NemesisRE/kiosk-mode)
- [Layout Card](https://github.com/thomasloven/lovelace-layout-card)
- [Light Entity Card](https://github.com/ljmerza/light-entity-card)
- [Linked Lovelace](https://github.com/daredoes/linked-lovelace-ui)
- [Lovelace Animated Background](https://github.com/Villhellm/lovelace-animated-background)
- [Lovelace Grocy Chores Card](https://github.com/isabellaalstrom/lovelace-grocy-chores-card)
- [Lovelace Home Feed Card](https://github.com/gadgetchnnel/lovelace-home-feed-card)
- [Mini Graph Card](https://github.com/kalkih/mini-graph-card)
- [Mini Media Player](https://github.com/kalkih/mini-media-player)
- [More Info Card](https://github.com/thomasloven/lovelace-more-info-card)
- [Mushroom](https://github.com/piitaya/lovelace-mushroom)
- [Sankey Chart Card](https://github.com/MindFreeze/ha-sankey-chart)
- [Scheduler Card](https://github.com/nielsfaber/scheduler-card)
- [Search Card](https://github.com/postlund/search-card)
- [Sip Card](https://github.com/TECH7Fox/sip-hass-card)
- [Spotify Lovelace Card](https://github.com/custom-cards/spotify-card)
- [Stack In Card](https://github.com/custom-cards/stack-in-card)
- [State Switch](https://github.com/thomasloven/lovelace-state-switch)
- [Swipe Card](https://github.com/bramkragten/swipe-card)
- [Thermal Comfort Icons](https://github.com/rautesamtr/thermal_comfort_icons)
- [Threedy](https://github.com/dangreco/threedy)
- [Time Picker Card](https://github.com/GeorgeSG/lovelace-time-picker-card)
- [Timer Bar Card](https://github.com/rianadon/timer-bar-card)
- [Vertical Stack In Card](https://github.com/ofekashery/vertical-stack-in-card)
- [Xiaomi Vacuum Map Card](https://github.com/PiotrMachowski/lovelace-xiaomi-vacuum-map-card)
- [Zigbee2Mqtt Networkmap Card](https://github.com/azuwis/zigbee2mqtt-networkmap)

#### Themes
- `themes/transparent.yaml`

### Backend

The main thing I need to do to make life easier is to template a package with jinja2 so that I can
use info from my `lovelace_gen` vars to create home-assistant configuration.
This will make it easier to create any needed helpers/groups/universalmediaplayers/etc.

For now the main 'trick' I use is for example that the entity_id of the main/universal media_player in each
room matches the room name.

#### Add-ons / Containers
- AdGuard Home
- AppDaemon
- Assist Microphone
- Asterisk
- Cloudflared
- ESPHome
- ESPHome (beta)
- File editor
- Firefox (Edge)
- Frigate (Full Access) Beta (0.13.0)
- gpt4free
- Grocy
- Icecast
- JupyterLab
- Matter Server
- Mosquitto broker
- Music Assistant BETA
- OpenThread Border Router
- openWakeWord
- Piper
- porcupine1
- PS5 MQTT
- Ring-MQTT with Video Streaming
- Samba share
- snowboy
- SQLite Web
- Squeezelite
- Studio Code Server
- Terminal & SSH
- UniFi Network Application
- vosk
- Whisper
- Z-Wave JS
- Zigbee2MQTT
- ZigStar TI CC2652P/P7 FW Flasher
### [Google Home](https://github.com/leikoilja/ha-google-home)

### [OpenAI Response](https://github.com/Hassassistant/openai_response)

### [Scheduler](https://github.com/nielsfaber/scheduler-component)

### [HACS](https://hacs.xyz/docs/configuration/start)

### [Config Editor](https://github.com/htmltiger/config-editor-card)

### [Lovelace Gen]()

### [Pirate Weather](https://github.com/alexander0042/pirate-weather-ha)

### [Home Assistant Registry](https://github.com/amosyuen/ha-registry)

### [Browser mod](https://github.com/thomasloven/hass-browser_mod/blob/master/README.md)

### [Lightener](https://github.com/fredck/lightener/blob/master/README.md)

### [OpenPlantbook](https://github.com/Olen/home-assistant-openplantbook/)

### [Expose Camera Stream Source](https://github.com/felipecrs/hass-expose-camera-stream-source)

### [bunq](https://github.com/ben8p/home-assistant-bunq-balance-sensors/)

### [Custom Templates](https://github.com/PiotrMachowski/Home-Assistant-custom-components-Custom-Templates)

### [LocalTuya integration](https://github.com/rospogrigio/localtuya/)

### [Sleep As Android](https://github.com/IATkachenko/HA-SleepAsAndroid/wiki)

### [Nespresso](https://www.home-assistant.io/integrations/nespresso)

### [Magic Areas](https://github.com/jseidl/hass-magic_areas/wiki)

### [Frank Energie](https://github.com/bajansen/home-assistant-frank_energie)

### [Plant Monitor](https://github.com/Olen/homeassistant-plant/)

### [BrasserAI Conversation](https://linux.garden)

### [Music Assistant (BETA)](https://github.com/music-assistant/hass-music-assistant)

### [KNMI](https://github.com/golles/ha-knmi/blob/main/README.md)

### [Adaptive Lighting](https://github.com/basnijholt/adaptive-lighting#readme)

### [Alexa Media Player](https://github.com/alandtse/alexa_media_player/wiki)

### [Bermuda BLE Trilateration](https://github.com/agittins/bermuda)

### [Watchman](https://github.com/dummylabs/thewatchman)

### [Afvalwijzer](https://github.com/xirixiz/homeassistant-afvalwijzer/blob/master/README.md)

### [Haier hOn](https://github.com/Andre0512/hon/)

### [Spook](https://spook.frenck.dev)

### [Asterisk](https://github.com/TECH7Fox/Asterisk-integration)

### [ical Sensor](https://www.home-assistant.io/integrations/ical)

### [Neerslag App (Buienalarm / Buienradar)](https://github.com/aex351/home-assistant-neerslag-app)

### [Thermal Comfort](https://github.com/dolezsa/thermal_comfort/blob/master/README.md)

### [Battery Notes](https://github.com/andrew-codechimp/ha-battery-notes)

### [Generate readme](https://github.com/custom-components/readme)

_Generates this awesome readme file._

### [Frigate](https://github.com/blakeblackshear/frigate)

### [SmartThinQ LGE Sensors](https://github.com/ollo69/ha-smartthinq-sensors)

### [Alarmo](https://github.com/nielsfaber/alarmo)

### [Roborock](https://github.com/humbertogontijo/homeassistant-roborock)

### [DashCast](https://github.com/AlexxIT/DashCast)

### [Stream Assist](https://github.com/AlexxIT/StreamAssist)
#### HACS Custom integrations
- [Adaptive Lighting](https://github.com/basnijholt/adaptive-lighting)
- [Afvalwijzer](https://github.com/xirixiz/homeassistant-afvalwijzer)
- [Alarmo](https://github.com/nielsfaber/alarmo)
- [Alexa Media Player](https://github.com/alandtse/alexa_media_player)
- [Asterisk Hass Integration](https://github.com/TECH7Fox/asterisk-hass-integration)
- [Average Sensor](https://github.com/Limych/ha-average)
- [Battery Notes](https://github.com/andrew-codechimp/HA-Battery-Notes)
- [Battery Sim](https://github.com/hif2k1/battery_sim)
- [Bermuda Ble Trilateration](https://github.com/agittins/bermuda)
- [Better Thermostat](https://github.com/KartoffelToby/better_thermostat)
- [Browser Mod](https://github.com/thomasloven/hass-browser_mod)
- [Bunq Balance Sensor](https://github.com/ben8p/home-assistant-bunq-balance-sensors)
- [Chime Tts](https://github.com/nimroddolev/chime_tts)
- [Config Editor](https://github.com/htmltiger/config-editor)
- [Crypto Tracker](https://github.com/BigNocciolino/CryptoTracker)
- [Custom Templates](https://github.com/PiotrMachowski/Home-Assistant-custom-components-Custom-Templates)
- [Dashcast](https://github.com/AlexxIT/DashCast)
- [Expose Camera Stream Source](https://github.com/felipecrs/hass-expose-camera-stream-source)
- [Frank Energie](https://github.com/bajansen/home-assistant-frank_energie)
- [Frigate](https://github.com/blakeblackshear/frigate-hass-integration)
- [Generate Readme](https://github.com/custom-components/readme)
- [Google Fit](https://github.com/YorkshireIoT/ha-google-fit)
- [Google Home](https://github.com/leikoilja/ha-google-home)
- [Grocy Custom Component](https://github.com/custom-components/grocy)
- [HACS](https://github.com/hacs/integration)
- [Haier Hon](https://github.com/Andre0512/hon)
- [Holidays](https://github.com/bruxy70/Holidays)
- [Home Assistant Plant](https://github.com/Olen/homeassistant-plant)
- [Home Assistant Registry](https://github.com/amosyuen/ha-registry)
- [Ical Sensor](https://github.com/tybritten/ical-sensor-homeassistant)
- [KNMI](https://github.com/golles/ha-knmi)
- [Lightener](https://github.com/fredck/lightener)
- [Local Tuya](https://github.com/rospogrigio/localtuya)
- [Lovelace Gen](https://github.com/thomasloven/hass-lovelace_gen)
- [Magic Areas](https://github.com/jseidl/hass-magic_areas)
- [Mail And Packages](https://github.com/moralmunky/Home-Assistant-Mail-And-Packages)
- [Mijntuin](https://github.com/myTselection/MijnTuin)
- [Moonraker](https://github.com/marcolivierarsenault/moonraker-home-assistant)
- [Music Assistant](https://github.com/music-assistant/hass-music-assistant)
- [Neerslag App](https://github.com/aex351/home-assistant-neerslag-app)
- [Openai Response](https://github.com/Hassassistant/openai_response)
- [Openaiconversationenhanced](https://github.com/qui3xote/OpenAIConversationEnhanced)
- [Openplantbook](https://github.com/Olen/home-assistant-openplantbook)
- [Opnsense Integration For Home Assistant](https://github.com/travisghansen/hass-opnsense)
- [Pid Controller](https://github.com/soloam/ha-pid-controller)
- [Pirate Weather](https://github.com/Pirate-Weather/pirate-weather-ha)
- [Roborock](https://github.com/humbertogontijo/homeassistant-roborock)
- [Schedule State](https://github.com/aneeshd/schedule_state)
- [Scheduler Component](https://github.com/nielsfaber/scheduler-component)
- [Shopping List With Grocy](https://github.com/Anrolosia/Shopping-List-with-Grocy)
- [Simpleicons](https://github.com/vigonotion/hass-simpleicons)
- [Sleep As Android](https://github.com/IATkachenko/HA-SleepAsAndroid)
- [Smart Thermostat (Pid)](https://github.com/ScratMan/HASmartThermostat)
- [Smartthinq Lge Sensors](https://github.com/ollo69/ha-smartthinq-sensors)
- [Spook 👻 Not Your Homie](https://github.com/frenck/spook)
- [Spotcast](https://github.com/fondberg/spotcast)
- [Stream Assist](https://github.com/asmsaifs/StreamAssist)
- [Thermal Comfort](https://github.com/dolezsa/thermal_comfort)
- [Upnp Availability](https://github.com/rytilahti/homeassistant-upnp-availability)
- [Versatile Thermostat](https://github.com/jmcollin78/versatile_thermostat)
- [Watchman](https://github.com/dummylabs/thewatchman)
- [Webrtc Camera](https://github.com/AlexxIT/WebRTC)
- [Xiaomi Cloud Map Extractor](https://github.com/PiotrMachowski/Home-Assistant-custom-components-Xiaomi-Cloud-Map-Extractor)
- [Xiaomi Miot Auto](https://github.com/al-one/hass-xiaomi-miot)

## Hardware

### Network

- 2x Ubiquity Switch Lite PoE
- 2x Ubiquity Switch Lite
- 1x Ubiquity AP-AC-LR
- 1x Ubiquity AP-AC6-Lite

### Nodes

- 3x Old Boxes
  - OPNSense
  - Home Assistant (ha ingress / cloudflared)
  - Docker Compose (webhost / cloudflared)

### Zigbee

- 3x Aqara Motion
- 3x Aqara Contact
- Ikea Tradfri 10W Strip Driver
- Niko Switch
- Hue in-wall Switch
- 2x Hue White Bulb
- 1x Hue Plafonniere with Hue Wall Remote

### Relays / Plugs / Switches

### Household / Pets

- 1x tuya pet fountain
- 1x Roborock Robot Vacuum

### Media

- 1x Google Nest Hub (dashcast)
- 1x Google Nest Mini
- 1x Google Home
- 2x Amazon Fire HD10+ (fire toolkit / fully kiosk / airreceiver / tasker)
- 1x Amazon Fire HD8 (fire toolkit / fully kiosk)
- 2x Google Chromecast 4K with Google TV (adb enabled)

***

Generated by the [custom readme integration](https://github.com/custom-components/readme)
