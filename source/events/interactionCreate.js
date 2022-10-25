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

        try {
            await commands(client, interaction);
        } catch (err) {
            console.error(err);

            return interaction.reply({ embeds: [ new MessageEmbed().setColor('RED')
                .setDescription(`Error occur while executing the command. Contact an admin to check the console!`)
            ]});
        };
    }
};

module.exports.config = {
    name: 'interactionCreate',
    once: false
}