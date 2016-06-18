'use strict'

const SLACK = require('slack')
const HDB = require('hearthstone-db');
const _ = require('lodash')
const CONFIG = require('./config')

const BOT = SLACK.rtm.client()

BOT.started((payload) => {
  this.self = payload.self
})

BOT.message((msg) => {
  let msgPost = 'We must cleanse the Sunwell';
  if (!msg.user) return
  if (!_.includes(msg.text.match(/<@([A-Z0-9])+>/igm), `<@${this.self.id}>`)) return

  const slackMessage = msg.text.split(':')[1].trim();
  const command = slackMessage.split(' ')[0];
  let cardName = [];

  if (command == 'card') {
    cardName = slackMessage.split(' ').slice(1).join(' ');
    msgPost = fetchCardImage(cardName);
  }

  SLACK.chat.postMessage({
    token: CONFIG('SLACK_TOKEN'),
    icon_emoji: CONFIG('ICON_EMOJI'),
    channel: msg.channel,
    username: 'Lady Liandrin',
    text: msgPost
  }, (err, data) => {
    if (err) throw err

    let txt = _.truncate(data.message.text)

    console.log(`🤖  Listen, young one: I responded with "${txt}"`)
  })
})

function fetchCardImage(cardName) {
  const cardInfo = _.find(HDB.allCards, (card) => {
    return card.name === cardName
  })

  return cardInfo.image_url
}

module.exports = BOT
