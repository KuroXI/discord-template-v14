const { Client, Interaction } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */
module.exports = async (client, interaction) => {
    if (interaction.isCommand()) {
        const commands = client.slash.get(interaction.commandName);
        if (!commands) return;

        await commands(client, interaction);
    }
};

module.exports.config = {
    name: 'interactionCreate',
    once: false
}