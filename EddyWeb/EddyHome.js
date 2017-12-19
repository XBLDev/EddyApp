const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

// connect to the database and load models
require('./server/models').connect(config.dbUri);

const app = express();
// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));


app.use(bodyParser.urlencoded({ extended: false }));

// routes
// const authRoutes = require('./server/routes/auth');
// const apiRoutes = require('./server/routes/api');
// const newsRoutes = require('./server/routes/news');
const EddyStoriesRoutes = require('./server/routes/EddyStories');
const EddyStoriesWithImagesRoutes = require('./server/routes/EddyStoriesWithImages');

// app.use('/auth', authRoutes);
// app.use('/api', apiRoutes);
// app.use('/news', newsRoutes);
app.use('/EddyStories', EddyStoriesRoutes);
app.use('/EddyStoriesWithImages', EddyStoriesWithImagesRoutes);


// start the server
app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080 or http://127.0.0.1:8080');
});