const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.json({'title': 'titulo perron'});
});

module.exports = router;