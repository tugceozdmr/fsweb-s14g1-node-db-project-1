const router = require("express").Router();

const md = require("./accounts-middleware");
const Account = require("./accounts-model");

router.get("/", async (req, res, next) => {
  // KODLAR BURAYA

  try {
    const accounts = await Account.getAll();
    res.json(accounts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", md.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    res.json(req.account);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  md.checkAccountPayload,
  md.checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const newAccount = await Account.create({
        name: req.body.name.trim(),
        budget: req.body.budget,
      });
      res.status(201).json(newAccount);
    } catch (error) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  md.checkAccountId,
  md.checkAccountPayload,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      const updatedAccount = await Account.updateById(req.params.id, req.body);
      res.json(updatedAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", md.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    await Account.deleteById(req.params.id);
    res.json(req.account);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // KODLAR BURAYA
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
