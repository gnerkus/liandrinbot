'use strict';

const express = require('express')
const bodyParser = require('body-parser')

const CONFIG = require('./config')
const COMMANDS = require('./commands')

const BOT = require('./bot')

const APP = express()

APP.use(bodyParser.json())
APP.use(bodyParser.urlencoded({ extended: true }))

APP.get('/', (req, res) => { res.send('\n 👋 🌍 \n') })

APP.listen(CONFIG('PORT'), (err) => {
  if (err) throw err

  console.log(`\n🚀  Lady Liadrin LIVES on PORT ${CONFIG('PORT')} 🚀`)

  if (CONFIG('SLACK_TOKEN')) {
    console.log(`🤖  @liandrinbot is real-time\n`)
    BOT.listen({ token: CONFIG('SLACK_TOKEN') })
  }
})
