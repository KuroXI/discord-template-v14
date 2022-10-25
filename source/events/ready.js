const { Client } = require('discord.js');
const { AUTO_REGISTER } = require('../../config')

/**
 * 
 * @param {Client} client 
 */
module.exports = (client) => {
    if (AUTO_REGISTER) require('../../register')(client);

    console.log('Discord Bot Online!');
};

module.exports.config = {
    name: 'ready',
    once: true
};