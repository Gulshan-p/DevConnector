const express = require('express');
const router = express.Router();
//test
router.get('/test', (req,res) => res.json({msg: 'post works.'}));
//export
module.exports = router;