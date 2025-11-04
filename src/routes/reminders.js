const express = require('express');
const { nanoid } = require('nanoid');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('reminders/list', { title: 'Reminders', items: req.db.data.reminders });
});

router.get('/new', (req, res) => {
  res.render('reminders/form', { title: 'New Reminder', item: {} });
});

router.post('/', async (req, res) => {
  const { title, dueDate, dueTime, note, priority } = req.body;
  req.db.data.reminders.push({ id: nanoid(), title, dueDate, dueTime, note, priority: priority || 'normal', done: false, createdAt: Date.now() });
  await req.db.write();
  res.redirect('/reminders');
});

router.post('/:id/toggle', async (req, res) => {
  const item = req.db.data.reminders.find(i => i.id === req.params.id);
  if (item) {
    item.done = !item.done;
    await req.db.write();
  }
  res.redirect('/reminders');
});

router.get('/:id/edit', (req, res) => {
  const item = req.db.data.reminders.find(i => i.id === req.params.id);
  if (!item) return res.redirect('/reminders');
  res.render('reminders/form', { title: 'Edit Reminder', item });
});

router.post('/:id', async (req, res) => {
  const item = req.db.data.reminders.find(i => i.id === req.params.id);
  if (item) {
    item.title = req.body.title;
    item.dueDate = req.body.dueDate;
    item.dueTime = req.body.dueTime;
    item.note = req.body.note;
    item.priority = req.body.priority || 'normal';
    await req.db.write();
  }
  res.redirect('/reminders');
});

router.post('/:id/delete', async (req, res) => {
  req.db.data.reminders = req.db.data.reminders.filter(i => i.id !== req.params.id);
  await req.db.write();
  res.redirect('/reminders');
});

module.exports = router;


