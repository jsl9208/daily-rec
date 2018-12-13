const router = require("express").Router();
const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  diet: Boolean,
  sports: Boolean
});

const Settings = mongoose.model("settings", settingsSchema);

router.get('/settings', (req, res) => {
  const {
    username
  } = req.decoded;

  Settings.findOne({
    username
  }, (err, doc) => {
    if (err) {
      res.status(400).send("Unknown error: " + err);
      return
    }

    if (!doc) {
      const initial = {
        username,
        diet: false,
        sports: false
      };

      new Settings(initial).save(err => {
        if (err) {
          res.status(400).send("Unknown error: " + err);

        } else {
          res.json(initial);
        }
      });

      return;
    }

    res.json(doc);
  });
});

module.exports = router;