const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODBURI).then(db => console.log('DB is connected')).catch(err => console.error(err));