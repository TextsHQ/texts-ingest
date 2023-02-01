# texts-ingest 

`ingest-texts-db.js` runs standalone (`electron ingest-texts-db.js`) when Texts.app is installed and can read the encrypted Texts DB.


`example-plugin.js` is a plugin for Texts.app. To install it, include its path in `~/.texts-conf.json` like:
```json
{
  "plugins": [
    "/absolute/path/to/example.js"
  ]
}
```
and run Texts normally or in Terminal with `/Applications/Texts.app/Contents/MacOS/Texts --log-level=dev`