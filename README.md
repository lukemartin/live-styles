# live-styles

Live reloading of stylesheets when they're modified.

## Installation

Requires node.js

Clone/download the repo and put inside your scripts folder eg `site_root/js/live-styles`

Add the following line to the bottom of your html page/template

    <script type="text/javascript" src="js/live-styles/client.js"></script>

## Usage

    node PATH_TO_LIVE_STYLES/app.js [STYLESHEETS, ]

eg

    node js/live-styles/app.js css/styles.css css/morestyles.css