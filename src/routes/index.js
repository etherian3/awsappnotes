const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const db = req.db;
  const { notes, finance, schedule, reminders, study } = db.data;
  res.render("dashboard", {
    title: "Dashboard",
    stats: {
      notes: notes.length,
      finance: finance.length,
      schedule: schedule.length,
      reminders: reminders.length,
      study: study.length,
    },
    recent: {
      notes: [...notes].slice(-5).reverse(),
      finance: [...finance].slice(-5).reverse(),
      schedule: [...schedule].slice(-5).reverse(),
      reminders: [...reminders].slice(-5).reverse(),
      study: [...study].slice(-5).reverse(),
    },
  });
});

module.exports = router;
