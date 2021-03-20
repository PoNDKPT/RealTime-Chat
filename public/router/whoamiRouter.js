const express = require("express");
const router = express.Router();

router.get('/', function(req, res) {
    res.render('whoami', {
        title: "What is your name?"
    });
});

module.exports = router;