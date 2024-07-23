const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const CLIENT_ID = '585815660266-4lclfucl7blqtpthi9otjuuk7jfcg37o.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';
const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const slides = google.slides({ version: 'v1', auth: oAuth2Client });

// app.get('/', (req, res) => {
//     res.send('Welcome to the Google Slides API Integration!');
// });

app.get('/', async (req, res) => {
    try {
        const presentationId = '1lcbj4kx2qyHYonAXcdVomj0egWVuRHwuAAFzMbBSSrw';
        const response = await slides.presentations.get({
            presentationId: presentationId,
        });

        const slidesData = response.data.slides.map(slide => {
            return {
                title: slide.pageElements
                    .filter(element => element.shape && element.shape.text)
                    .map(element => element.shape.text.textElements.map(te => te.textRun ? te.textRun.content : '').join(''))
                    .join(''),
                content: slide.pageElements
                    .filter(element => element.shape && element.shape.text)
                    .map(element => element.shape.text.textElements.map(te => te.textRun ? te.textRun.content : '').join(''))
                    .join('\n')
            };
        });

        res.json(slidesData);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
