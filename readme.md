# texts-ingest 

Scripts to read local Texts.app data.

### Usage

```
git clone https://github.com/KishanBagaria/texts-ingest
yarn
node db.js
```

Alternative ways:

1. Electron: `electron ingest-texts-db.js` runs standalone when Texts.app is installed on macOS.
2. Texts plugin: `example-plugin.js` is a plugin for Texts.app. To install it, include its path in `~/.texts-conf.json` like:
```json
{
  "plugins": [
    "/absolute/path/to/example.js"
  ]
}
```
and run Texts normally or in Terminal like `/Applications/Texts.app/Contents/MacOS/Texts --log-level=dev`

