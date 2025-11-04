const express = require('express');
const { nanoid } = require('nanoid');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('finance/list', { title: 'Finance', items: req.db.data.finance });
});

router.get('/new', (req, res) => {
  res.render('finance/form', { title: 'Add Finance', item: {} });
});

router.post('/', async (req, res) => {
  const { type, amount, category, note, date } = req.body;
  req.db.data.finance.push({ id: nanoid(), type, amount: parseFloat(amount) || 0, category, note, date: date || new Date().toISOString().slice(0,10), createdAt: Date.now() });
  await req.db.write();
  res.redirect('/finance');
});

router.get('/:id/edit', (req, res) => {
  const item = req.db.data.finance.find(i => i.id === req.params.id);
  if (!item) return res.redirect('/finance');
  res.render('finance/form', { title: 'Edit Finance', item });
});

router.post('/:id', async (req, res) => {
  const item = req.db.data.finance.find(i => i.id === req.params.id);
  if (item) {
    item.type = req.body.type;
    item.amount = parseFloat(req.body.amount) || 0;
    item.category = req.body.category;
    item.note = req.body.note;
    item.date = req.body.date || item.date;
    await req.db.write();
  }
  res.redirect('/finance');
});

router.post('/:id/delete', async (req, res) => {
  req.db.data.finance = req.db.data.finance.filter(i => i.id !== req.params.id);
  await req.db.write();
  res.redirect('/finance');
});

module.exports = router;


