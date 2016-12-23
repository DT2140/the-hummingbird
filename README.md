# Hummingbird

> An interactive story about the life of a hummingbird controlled by speech

## The application

The application uses [Phaser](http://phaser.io) for handling story graphics. All pages can be found in [src/state/pages](src/state/pages). To add a new page, duplicate [src/state/pages/.template.js](src/state/pages/.template.js) and give it a proper name. Add the page to the page index found in [src/state/pages/index.js](src/state/pages/index.js) and add a page to all language files in [src/manuscript](src/manuscript).

## Setup

Ensure that you have the latest version (> 6) of node [Node.js](https://nodejs.org) installed. When building the application a language must be supplied as an environment variable. Languages are stored in [src/manuscript](src/manuscript) and are specified without file extension.

### Dependencies

First install all application dependencies

```bash
$ npm install
```

On first setup, always build before starting development server.

### Build

```bash
# On UNIX/macOS
$ STORY_LANG=en-US npm run build

# On Windows
$ set STORY_LANG=en-US&&npm run build
```

### Development

During development the state is printed to the console on every change and to simulate  reading the script into the microphone keep the space key pressed down and then press the `x` key.

You can also jump to a specific page by calling `STORY.send('page', 3)` in the browser console.

To fire up the development server, run the following command

```bash
# On UNIX/macOS
$ STORY_LANG=en-US NODE_ENV=development npm run dev

# On Windows
$ set STORY_LANG=en-US&&set NODE_ENV=development&&npm run dev
```

### Serve production

TODO: Add static server for production
