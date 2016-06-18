'use strict';

const CONFIG = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 1337,
  SLACK_TOKEN: process.env.LIANDRIN_SLACK_API_TOKEN,
  ICON_EMOJI: ':liadrin:'
};

module.exports = (key) => {
  if (!key) return CONFIG;

  return CONFIG[key];
};
