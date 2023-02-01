require('./db')

// const nmc = require('node-mac-contacts')
// console.log(nmc.getAllContacts())

function processMessage(accountID, threadID, message, platformName, isNew) {
  // console.log({ accountID, threadID, message, platformName, isNew })
}

const plugin = {
  type: 'output',
  hooks: {
    getThreads(platformName, accountID, args, result) {
      const threads = result.items
      threads.forEach(thread => {
        thread.messages.items.forEach(message => {
          processMessage(accountID, thread.id, message, platformName)
        })
      })
      return result
    },
    getMessages(platformName, accountID, args, result) {
      const threadID = args[0]
      result.items.forEach(message => {
        processMessage(accountID, threadID, message, platformName, !args[1]?.cursor)
      })
      return result
    },
    getThread(platformName, accountID, args, thread) {
      if (typeof thread === 'object') {
        thread.messages.items.forEach(message => {
          processMessage(accountID, thread.id, message, platformName)
        })
      }
      return thread
    },
    getMessage(platformName, accountID, args, message) {
      const threadID = args[0]
      if (typeof message === 'object') processMessage(accountID, threadID, message, platformName)
      return message
    },
    sendMessage(platformName, accountID, args, result) {
      const threadID = args[0]
      if (Array.isArray(result)) {
        result.forEach(message => {
          processMessage(accountID, threadID, message, platformName)
        })
      }
      return result
    },
    subscribeToEvents(platformName, accountID, args, events) {
      events?.forEach(se => {
        if (se?.type !== 'state_sync') return
        if (se.objectName === 'message') {
          switch (se.mutationType) {
            case 'upsert':
              se.entries.forEach(entry => {
                processMessage(accountID, se.objectIDs.threadID, entry, platformName, true)
              })
              break
            case 'update':
              se.entries.forEach(entry => {
                processMessage(accountID, se.objectIDs.threadID, entry, platformName)
              })
              break
          }
        }
        if (se.objectName === 'thread' && se.mutationType === 'upsert') {
          se.entries.forEach(entry => {
            const thread = entry
            thread.messages?.items?.forEach(message => {
              processMessage(accountID, thread.id, message, platformName, true)
            })
          })
        }
      })
      return events
    },
  },
}

module.exports = plugin
