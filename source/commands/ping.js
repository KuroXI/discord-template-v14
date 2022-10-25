const { Client, CommandInteraction, SlashCommandBuilder } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
module.exports = (client, interaction) => {
    return interaction.reply({ content: `Ping: ${client.ws.ping}ms` });
}

module.exports.config = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Ping!')
}