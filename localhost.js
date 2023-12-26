const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    const apiEndpoint = 'https://public-api.birdeye.so/public/multi_price';
    const apiKey = 'e5188e513cc5414c817aba0174427681';
    const listAddress = 'CzLWmvjtj5bp9YEWkzzBnuWovVtogeuchFu5GeFh68hB';
    const chain = 'solana';

    // Configuração do Axios para fazer a requisição para a API
    const options = {
      method: 'GET',
      url: apiEndpoint,
      params: { list_address: listAddress },
      headers: { 'x-chain': chain, 'X-API-KEY': apiKey }
    };

    // Faz a requisição para a API usando axios com as opções configuradas
    const response = await axios(options);

    // Verifica se a resposta da API tem a estrutura esperada
    if (response.data && response.data.data && response.data.data[listAddress] !== undefined) {
      // Extrai os dados necessários da resposta
      const rawTokenValue = response.data.data[listAddress].value;
      const rawPriceChange24h = response.data.data[listAddress].priceChange24h;

      // Arredonda para 4 casas decimais e converte para string
      const roundedTokenValue = parseFloat(rawTokenValue).toFixed(6);
      const roundedPriceChange24h = parseFloat(rawPriceChange24h).toFixed(4);

      // Envia a resposta com os dados
      res.send({
        tokenValue: roundedTokenValue,
        priceChange24h: roundedPriceChange24h
      });
    } else {
      console.log('Resposta da API não contém os dados esperados.');
      res.status(500).send('Erro ao obter os dados do token.');
    }
  } catch (error) {
    console.error('Erro durante a requisição para a API:', error.message);
    res.status(500).send('Erro ao obter os dados do token.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
