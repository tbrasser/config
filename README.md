# Welcome !

This is my Home Automation Repository.
Currently it represents the root of my home assistant installation.
In the future this may be migrated from home assistant to home assistant core and seperate deployments on kubernetes.

## Software

This is my Home Assistant installation. Some statistics about my installation:

Description | value
-- | --
Number of entities | 1728
Number of sensors | 749

It is built using the following components:

- card_mod
- layout_card
- browser_mod
- lovelace_gen
- magic_areas
- alarmo
- adaptive_lighting
- esphome (libretuya fork)
- frigate (with webrtc)

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
- [Air Visual Card](https://github.com/dnguyen800/air-visual-card)
- [Alarmo Card](https://github.com/nielsfaber/alarmo-card)
- [Apexcharts Card](https://github.com/RomRider/apexcharts-card)
- [Atomic Calendar Revive](https://github.com/totaldebug/atomic-calendar-revive)
- [Auto Entities](https://github.com/thomasloven/lovelace-auto-entities)
- [Bar Card](https://github.com/custom-cards/bar-card)
- [Battery State Card / Entity Row](https://github.com/maxwroc/battery-state-card)
- [Better Thermostat Ui](https://github.com/KartoffelToby/better-thermostat-ui-card)
- [Card Mod](https://github.com/thomasloven/lovelace-card-mod)
- [Card Tools](https://github.com/thomasloven/lovelace-card-tools)
- [Check Button Card](https://github.com/custom-cards/check-button-card)
- [Clock Weather Card](https://github.com/pkissling/clock-weather-card)
- [Config Editor Card](https://github.com/htmltiger/config-editor-card)
- [Config Template Card](https://github.com/iantrich/config-template-card)
- [Custom Brand Icons](https://github.com/elax46/custom-brand-icons)
- [Custom Icons](https://github.com/Mariusthvdb/custom-icons)
- [Custom Ui](https://github.com/Mariusthvdb/custom-ui)
- [Dual Gauge Card](https://github.com/custom-cards/dual-gauge-card)
- [Expander Card](https://github.com/Alia5/lovelace-expander-card)
- [Flower Card](https://github.com/Olen/lovelace-flower-card)
- [Gallery Card](https://github.com/TarheelGrad1998/gallery-card)
- [Google Home Timers Card](https://github.com/DurgNomis-drol/google_home_timers_card)
- [Hass Hue Icons](https://github.com/arallsopp/hass-hue-icons)
- [Header Cards](https://github.com/gadgetchnnel/lovelace-header-cards)
- [History Explorer Card](https://github.com/alexarch21/history-explorer-card)
- [Home Assistant Swipe Navigation](https://github.com/zanna-37/hass-swipe-navigation)
- [Hourly Weather Card](https://github.com/decompil3d/lovelace-hourly-weather)
- [Kiosk Mode](https://github.com/NemesisRE/kiosk-mode)
- [Last Changed Element](https://github.com/queimadus/last-changed-element)
- [Layout Card](https://github.com/thomasloven/lovelace-layout-card)
- [Light Entity Card](https://github.com/ljmerza/light-entity-card)
- [Lovelace Animated Background](https://github.com/Villhellm/lovelace-animated-background)
- [Lovelace Grocy Chores Card](https://github.com/isabellaalstrom/lovelace-grocy-chores-card)
- [Lovelace Home Feed Card](https://github.com/gadgetchnnel/lovelace-home-feed-card)
- [Media Player Popup Card (Homekit Style)](https://github.com/DBuit/media_player-popup-card)
- [Mini Graph Card](https://github.com/kalkih/mini-graph-card)
- [Mini Media Player](https://github.com/kalkih/mini-media-player)
- [More Info Card](https://github.com/thomasloven/lovelace-more-info-card)
- [Mushroom](https://github.com/piitaya/lovelace-mushroom)
- [Person](https://github.com/gerardag/person-entity-card)
- [Plotly Graph Card](https://github.com/dbuezas/lovelace-plotly-graph-card)
- [Sankey Chart Card](https://github.com/MindFreeze/ha-sankey-chart)
- [Scheduler Card](https://github.com/nielsfaber/scheduler-card)
- [Search Card](https://github.com/postlund/search-card)
- [Simple Weather Card](https://github.com/kalkih/simple-weather-card)
- [Spotify Lovelace Card](https://github.com/custom-cards/spotify-card)
- [Stack In Card](https://github.com/custom-cards/stack-in-card)
- [State Switch](https://github.com/thomasloven/lovelace-state-switch)
- [Surveillance Card](https://github.com/custom-cards/surveillance-card)
- [Swipe Card](https://github.com/bramkragten/swipe-card)
- [Template Entity Row](https://github.com/thomasloven/lovelace-template-entity-row)
- [Thermal Comfort Icons](https://github.com/rautesamtr/thermal_comfort_icons)
- [Thermostat Popup Card](https://github.com/DBuit/thermostat-popup-card)
- [Threedy](https://github.com/dangreco/threedy)
- [Time Picker Card](https://github.com/GeorgeSG/lovelace-time-picker-card)
- [Timer Bar Card](https://github.com/rianadon/timer-bar-card)
- [Vacuum Card](https://github.com/denysdovhan/vacuum-card)
- [Vertical Stack In Card](https://github.com/ofekashery/vertical-stack-in-card)
- [Xiaomi Vacuum Map Card](https://github.com/PiotrMachowski/lovelace-xiaomi-vacuum-map-card)

#### Themes
- `themes/transparent.yaml`

### Backend

The main thing I need to do to make life easier is to template a package with jinja2 so that I can
use info from my `lovelace_gen` vars to create home-assistant configuration.
This will make it easier to create any needed helpers/groups/universalmediaplayers/etc.

For now the main 'trick' I use is for example that the entity_id of the main/universal media_player in each
room matches the room name.

#### Add-ons / Containers
- AppDaemon
- Cloudflared
- Frigate (Full Access) Beta (0.12.0)
- Grocy
- LibreTuya ESPHome
- Mosquitto broker
- Music Assistant BETA
- PS5 MQTT
- Ring-MQTT with Video Streaming
- Studio Code Server
- Terminal & SSH
- UniFi Network Application
- Z-Wave JS
- Zigbee2MQTT

#### HACS Custom integrations
- [Adaptive Lighting](https://github.com/basnijholt/adaptive-lighting)
- [Alarmo](https://github.com/nielsfaber/alarmo)
- [Average Sensor](https://github.com/Limych/ha-average)
- [Better Thermostat](https://github.com/KartoffelToby/better_thermostat)
- [Browser Mod](https://github.com/thomasloven/hass-browser_mod)
- [Bunq Balance Sensor](https://github.com/ben8p/home-assistant-bunq-balance-sensors)
- [Config Editor](https://github.com/htmltiger/config-editor)
- [Crypto Tracker](https://github.com/BigNocciolino/CryptoTracker)
- [Dashcast](https://github.com/AlexxIT/DashCast)
- [Expose Camera Stream Source](https://github.com/felipecrs/hass-expose-camera-stream-source)
- [Frigate](https://github.com/blakeblackshear/frigate-hass-integration)
- [Generate Readme](https://github.com/custom-components/readme)
- [Google Home](https://github.com/leikoilja/ha-google-home)
- [Grocy Custom Component](https://github.com/custom-components/grocy)
- [HACS](https://github.com/hacs/integration)
- [Holidays](https://github.com/bruxy70/Holidays)
- [Home Assistant Plant](https://github.com/Olen/homeassistant-plant)
- [Home Assistant Registry](https://github.com/amosyuen/ha-registry)
- [KNMI](https://github.com/golles/ha-knmi)
- [Lovelace Gen](https://github.com/thomasloven/hass-lovelace_gen)
- [Magic Areas](https://github.com/jseidl/hass-magic_areas)
- [Mail And Packages](https://github.com/moralmunky/Home-Assistant-Mail-And-Packages)
- [Moonraker](https://github.com/marcolivierarsenault/moonraker-home-assistant)
- [Neerslag App](https://github.com/aex351/home-assistant-neerslag-app)
- [Openplantbook](https://github.com/Olen/home-assistant-openplantbook)
- [Opnsense Integration For Home Assistant](https://github.com/travisghansen/hass-opnsense)
- [Pid Controller](https://github.com/soloam/ha-pid-controller)
- [Pyscript](https://github.com/custom-components/pyscript)
- [Schedule State](https://github.com/aneeshd/schedule_state)
- [Scheduler Component](https://github.com/nielsfaber/scheduler-component)
- [Shopping List With Grocy](https://github.com/Anrolosia/Shopping-List-with-Grocy)
- [Simpleicons](https://github.com/vigonotion/hass-simpleicons)
- [Sleep As Android](https://github.com/IATkachenko/HA-SleepAsAndroid)
- [Smart Thermostat (Pid)](https://github.com/ScratMan/HASmartThermostat)
- [Smartthinq Lge Sensors](https://github.com/ollo69/ha-smartthinq-sensors)
- [Spook 👻 Not Your Homie](https://github.com/frenck/spook)
- [Spotcast](https://github.com/fondberg/spotcast)
- [Thermal Comfort](https://github.com/dolezsa/thermal_comfort)
- [Tuya Local](https://github.com/make-all/tuya-local)
- [Upnp Availability](https://github.com/rytilahti/homeassistant-upnp-availability)
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