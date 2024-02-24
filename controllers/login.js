const loginIndex = (req, res) => {
    res.render('login', { layout: 'default' });
}

module.exports = { loginIndex };