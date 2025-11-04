const express = require('express');
const { nanoid } = require('nanoid');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('notes/list', { title: 'Notes', notes: req.db.data.notes });
});

router.get('/new', (req, res) => {
  res.render('notes/form', { title: 'New Note', note: {} });
});

router.post('/', async (req, res) => {
  const { title, content, tags } = req.body;
  req.db.data.notes.push({ id: nanoid(), title, content, tags: tags || '', createdAt: Date.now() });
  await req.db.write();
  res.redirect('/notes');
});

router.get('/:id/edit', (req, res) => {
  const note = req.db.data.notes.find(n => n.id === req.params.id);
  if (!note) return res.redirect('/notes');
  res.render('notes/form', { title: 'Edit Note', note });
});

router.post('/:id', async (req, res) => {
  const note = req.db.data.notes.find(n => n.id === req.params.id);
  if (note) {
    note.title = req.body.title;
    note.content = req.body.content;
    note.tags = req.body.tags || '';
    await req.db.write();
  }
  res.redirect('/notes');
});

router.post('/:id/delete', async (req, res) => {
  req.db.data.notes = req.db.data.notes.filter(n => n.id !== req.params.id);
  await req.db.write();
  res.redirect('/notes');
});

module.exports = router;


