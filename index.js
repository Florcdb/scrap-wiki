const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

const url = 'https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap';

app.get('/', (req, res) => {
    axios.get(url).then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);

            const pagetitle = $('title').text();
            const images = []; // Fix: Change imgs to images
            const texts = [];

            $('img').each((index, element) => {
                const img = $(element).attr('src');
                images.push(img);
            });

            $('a').each((index, element) => {
                const text = $(element).attr('href');
                texts.push(text);
            });

            console.log(images); // Log the images array for verification

            res.send(`
                <h1>${pagetitle}</h1>
                <h2>Images</h2>
                <ul>
                    ${images.map(img => `<li><a href="${url}${img}">${img}</a></li>`).join('')}
                </ul>
                <h2>Texts</h2>
                <ul> 
                    ${texts.map(text => `<li><a href="${url}${text}">${text}</a></li>`).join('')}
                </ul>
            `);
        }
    });
});

app.listen(3000, () => {
    console.log('Express está escuchando en el puerto http://localhost:3000');
});
