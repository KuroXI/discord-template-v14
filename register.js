const { Client, Routes, REST } = require('discord.js');
const fs = require('fs');
const { SLASH_GLOBAL, GUILD, TOKEN } = require('./config');

/**
 * 
 * @param {Client} client 
 */
module.exports = async (client) => {
    const commands = [];
    
    fs.readdirSync('./source/commands/').filter((file) => file.endsWith('.js')).forEach((file) => {
        const command = require(`./source/commands/${file}`);
        commands.push(command.config.data.toJSON());
    });

    const rest = new REST({ version: '10' }).setToken(TOKEN);

    if (SLASH_GLOBAL) {
        try {
            await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
            console.log(`[SLASH COMMAND] : Successfully registered ${commands.length} command(s) globally!`)
        } catch (error) { console.error(error) }
    } else {
        try {
            await rest.put(Routes.applicationGuildCommands(client.user.id, GUILD), { body: commands });
            console.log(`[SLASH COMMAND] : Successfully registered ${commands.length} command(s) in private server!`);
        } catch (error) { console.error(error) }
    }
}