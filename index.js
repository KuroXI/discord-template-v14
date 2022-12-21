const { Client, Collection } = require('discord.js');
const client = new Client({ intents: ['Guilds', 'GuildMembers'] });

const fs = require('fs');
const config = require('./config');

client.command = new Collection();

fs.readdirSync(`${__dirname}/source/events`).filter((file) => file.endsWith('.js')).forEach((file) => {
    const event = require(`${__dirname}/source/events/${file}`);

    try {
        (event.config.once)
            ? client.once(event.config.name, (...args) => event(client, ...args))
            : client.on(event.config.name, (...args) => event(client, ...args));
    } catch (error) { console.log(error) };
});

fs.readdirSync(`${__dirname}/source/commands`).filter((file) => file.endsWith('.js')).forEach((file) => {
    const command = require(`${__dirname}/source/commands/${file}`);
    if (command.config) client.command.set(command.config.data.name, command);
});

client.login(config.TOKEN);