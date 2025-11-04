const express = require('express');
const { nanoid } = require('nanoid');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('study/list', { title: 'Study Notes', items: req.db.data.study });
});

router.get('/new', (req, res) => {
  res.render('study/form', { title: 'New Study Note', item: {} });
});

router.post('/', async (req, res) => {
  const { subject, topic, content, resources } = req.body;
  req.db.data.study.push({ id: nanoid(), subject, topic, content, resources: resources || '', createdAt: Date.now() });
  await req.db.write();
  res.redirect('/study');
});

router.get('/:id/edit', (req, res) => {
  const item = req.db.data.study.find(i => i.id === req.params.id);
  if (!item) return res.redirect('/study');
  res.render('study/form', { title: 'Edit Study Note', item });
});

router.post('/:id', async (req, res) => {
  const item = req.db.data.study.find(i => i.id === req.params.id);
  if (item) {
    item.subject = req.body.subject;
    item.topic = req.body.topic;
    item.content = req.body.content;
    item.resources = req.body.resources || '';
    await req.db.write();
  }
  res.redirect('/study');
});

router.post('/:id/delete', async (req, res) => {
  req.db.data.study = req.db.data.study.filter(i => i.id !== req.params.id);
  await req.db.write();
  res.redirect('/study');
});

module.exports = router;


