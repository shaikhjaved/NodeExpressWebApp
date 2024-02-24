const index = (req, res) => {
    res.render('home', { layout: 'default' });
}

module.exports = { index };