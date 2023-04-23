const os = require('os')
const path = require('path')
const keytar = require('keytar')
const bs = require('@signalapp/better-sqlite3') // https://github.com/signalapp/better-sqlite3

let db

async function getPassword() {
  const key = await keytar.getPassword('com.kishanbagaria.jack', 'etilqs_key')
  const keyBuffer = Buffer.from(key, 'base64')
  const keyHex = keyBuffer.toString('hex')
  return keyHex
}

async function getUnlockedDb() {
  if (db) return db

  const keyHex = await getPassword()

  const dbPath = path.join(os.homedir(), 'Library/Application Support/jack/.index.db')
  db = bs(dbPath)

  const pragmaKeySql = `PRAGMA key = "x'${keyHex}'";`
  db.exec(pragmaKeySql)

  return db
}

async function findMessagesCount() {
  const db = await getUnlockedDb()

  const count = db.prepare('select count(*) from messages').pluck().get()
  console.log({ count })
}

findMessagesCount()
