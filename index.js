const express = require('express');
const app = express();
const cors = require('cors');
const exphbs = require('express-handlebars');
const path = require('path');

// to parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// enabling CORS for all requests
app.use(cors());

app.use(express.static('public'))
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css/')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js/')))
app.use('/popperjs', express.static(path.join(__dirname, 'node_modules/@popperjs/core/dist/umd/')))
app.use('/jq', express.static(path.join(__dirname, 'node_modules/jquery/dist/')))

app.set('view engine', 'hbs');
app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: "default"
}));

// defining an endpoint to return all ads
app.use('/', require('./routes/web'));

// defining port
const port = process.env.PORT || 3001

// starting the server
app.listen(port, () => console.log(`listening on http://localhost:${port}`))