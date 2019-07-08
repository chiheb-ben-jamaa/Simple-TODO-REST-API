const express = require('express');
 //using the router :
const router = express.Router();

// default route
router.get('/', function (req, res) {
    console.log('testing The API !')
    return res.send({ error: true, message: 'Texting The API ' })
});


module.exports = router;
