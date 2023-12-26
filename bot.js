const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const axios = require('axios');

const tokens = {
  PURI: {
    token: 'YOUR-TOKEN-DISCORDdev',
    api: 'puri',
    name: 'PURI',
    client: null // 
  },
};

const getArrow = (percentageChange, roleColor) => {
  if (roleColor === '#00FF00' || percentageChange > 0) {
    return '⬈'; // Seta para cima se a cor for verde ou se a mudança for positiva
  } else if (roleColor === '#FF0000' || percentageChange < 0) {
    return '⬊'; // Seta para baixo se a cor for vermelha ou se a mudança for negativa
  } else {
    return ''; // Vazio se a mudança for 0% ou se a cor não for verde nem vermelha
  }
};
const updateBotActivity = async (token, percentageChange, priceUSD) => {
  const status = `${getFormattedPercentage(percentageChange)}`;
  const arrow = getArrow(percentageChange);
  const guild = token.client.guilds.cache.get('1055535014017769472');   // GROUP 1 
  // Set the presence status
  if (percentageChange > 0) {
    await token.client.user.setPresence({ activities: [{ name: status, type: ActivityType.Playing }], status: 'online' });
  } else if (percentageChange < 0) {
    await token.client.user.setPresence({ activities: [{ name: status, type: ActivityType.Playing }], status: 'dnd' });
  } else {
    await token.client.user.setPresence({ activities: [{ name: status, type: ActivityType.Playing }], status: 'online' });
  }

  let roleName;

  switch (token.name) {
    case 'PURI':
      roleName = 'PURI';
      break
    default:
      console.error('Nome do token não reconhecido:', token.name);
      return;
  }
  
  const role = guild.roles.cache.find((r) => r.name === roleName); // Encontra a Role com o nome correspondente

  // Mudar cor do nome e nick
  if (percentageChange > 0) {
    await role.edit({ color: '#00FF00' }); // Verde - cor para mudança positiva
  } else if (percentageChange < 0) {
    await role.edit({ color: '#FF0000' }); // Vermelho - cor para mudança negativa
  } else {
    await role.edit({ color: '#FFFFFF' }); // Branco - cor para nenhuma mudança (0%)
  }
  
  // Meu grupo
  guild.members.fetch();
  guild.members.me.setNickname(`${token.name} ${arrow} $${priceUSD}`);

};

const fetchCryptoData = async (token) => {
  try {
    const response = await axios.get('http://localhost:3000'); // Modifique a URL conforme necessário
    const data = response.data;

    // Extrai os dados necessários da resposta
    const priceUSD = data.tokenValue;
    const percentageChangeStr = data.priceChange24h;
    const percentageChange = parseFloat(percentageChangeStr.replace('%', '')) / 100;

    await updateBotActivity(token, percentageChange, priceUSD);
  } catch (error) {
    console.error(`Erro ao obter dados de ${token.name} do servidor local:`, error.message);
  }
};

const getFormattedPercentage = (percent) => {
  return `${(percent * 100).toFixed(2)}%`;
};

const startBot = (tokenInfo) => {
  const token = tokenInfo.token;
  const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

  client.on('ready', () => {
    console.log(`O bot ${tokenInfo.name} foi iniciado como ${client.user.tag}!`);
    setInterval(() => fetchCryptoData(tokenInfo), 12000); 
  });
  client.rest.on('rateLimited', rate => {
    console.log(rate);
  });
  client.login(token);
  tokenInfo.client = client;
};

// Start all the bots
for (const tokenInfo of Object.values(tokens)) {
  startBot(tokenInfo);
}
