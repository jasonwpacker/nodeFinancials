const express = require('express');
const maxima = require('./limits.json');

const app = express();
const port = 3000;

app.get('/contribution/401k/:year', (req, res) => {
    const year = req.params.year;
    res.json(maxima['401k'][year]);
});

app.get('/contribution/SIMPLE/:year', (req, res) => {
    const year = req.params.year;
    res.json(maxima['SIMPLE'][year]);
});

app.get('/contribution/401kCatchUp/:year', (req, res) => {
    const year = req.params.year;
    res.json(maxima['401kCatchUp'][year]);
});

app.get('/contribution/SIMPLECatchUp/:year', (req, res) => {
    const year = req.params.year;
    res.json(maxima['SIMPLECatchUp'][year]);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
