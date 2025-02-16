const express = require('express'); const app = express(); app.set('json spaces', 2); const port = 3000; const { GetCode } = require('./scr/fcm');

app.get('/', async (req, res) => { const rest = await GetCode(); res.json(rest); });

app.listen(port);