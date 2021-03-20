const express = require("express");
const router = express.Router();

router.get('/chat', function(req, res) {
    res.render('index', {
        username: "What is your name?"
    });
});

module.exports = router;