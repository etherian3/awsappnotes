const path = require('path');
const express = require('express');
const layouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(layouts);
app.set('layout', 'layout');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Database
const { getDb } = require('./utils/db');

// Routes
const indexRouter = require('./routes/index');
const notesRouter = require('./routes/notes');
const financeRouter = require('./routes/finance');
const scheduleRouter = require('./routes/schedule');
const remindersRouter = require('./routes/reminders');
const studyRouter = require('./routes/study');

app.use(async (req, res, next) => {
  req.db = await getDb();
  next();
});

app.use('/', indexRouter);
app.use('/notes', notesRouter);
app.use('/finance', financeRouter);
app.use('/schedule', scheduleRouter);
app.use('/reminders', remindersRouter);
app.use('/study', studyRouter);

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Not Found' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${PORT}`);
});


