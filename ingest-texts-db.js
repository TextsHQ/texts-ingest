const os = require('os')
const path = require('path')
const keytar = require('/Applications/Texts.app/Contents/Resources/app/node_modules/keytar')
const bs = require('/Applications/Texts.app/Contents/Resources/app/node_modules/better-sqlite') // https://github.com/signalapp/better-sqlite3

async function main() {
  const key = await keytar.getPassword('com.kishanbagaria.jack', 'etilqs_key')
  const keyBuffer = Buffer.from(key, 'base64')
  const keyHex = keyBuffer.toString('hex')

  const db = bs(path.join(os.homedir(), 'Library/Application Support/jack/.index.db'))
  const pragmaKeySql = `PRAGMA key = "x'${keyHex}'";`
  db.exec(pragmaKeySql)

  const count = db.prepare('select count(*) from messages').pluck().get()
  console.log({ count })
}
main()
