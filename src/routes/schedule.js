const express = require('express');
const { nanoid } = require('nanoid');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('schedule/list', { title: 'Schedule', items: req.db.data.schedule });
});

router.get('/new', (req, res) => {
  res.render('schedule/form', { title: 'New Schedule', item: {} });
});

router.post('/', async (req, res) => {
  const { title, date, time, location, note } = req.body;
  req.db.data.schedule.push({ id: nanoid(), title, date, time, location, note, createdAt: Date.now() });
  await req.db.write();
  res.redirect('/schedule');
});

router.get('/:id/edit', (req, res) => {
  const item = req.db.data.schedule.find(i => i.id === req.params.id);
  if (!item) return res.redirect('/schedule');
  res.render('schedule/form', { title: 'Edit Schedule', item });
});

router.post('/:id', async (req, res) => {
  const item = req.db.data.schedule.find(i => i.id === req.params.id);
  if (item) {
    item.title = req.body.title;
    item.date = req.body.date;
    item.time = req.body.time;
    item.location = req.body.location;
    item.note = req.body.note;
    await req.db.write();
  }
  res.redirect('/schedule');
});

router.post('/:id/delete', async (req, res) => {
  req.db.data.schedule = req.db.data.schedule.filter(i => i.id !== req.params.id);
  await req.db.write();
  res.redirect('/schedule');
});

module.exports = router;


