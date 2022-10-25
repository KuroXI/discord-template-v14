const { Client, Collection } = require('discord.js');
const client = new Client({ intents: ['Guilds', 'GuildMembers'] });

const fs = require('fs');
const config = require('./config');

client.command = new Collection();

fs.readdirSync('./source/events/').filter((file) => file.endsWith('.js')).forEach((file) => {
    const event = require(`./source/events/${file}`);

    try {
        (event.config.once)
            ? client.once(event.config.name, (...args) => event(client, ...args))
            : client.on(event.config.name, (...args) => event(client, ...args));
    } catch (error) { console.log(error) };
});

fs.readdirSync('./source/commands/').filter((file) => file.endsWith('.js')).forEach((file) => {
    const command = require(`./source/commands/${file}`);
    if (command.config) client.command.set(command.config.data.name, command);
});

client.login(config.TOKEN);