const Accounts = require("./accounts-model");
const db = require("../../data/db-config");

exports.checkAccountPayload = (req, res, next) => {
  // KODLAR BURAYA
  // Not: Validasyon için Yup(şu an yüklü değil!) kullanabilirsiniz veya kendiniz manuel yazabilirsiniz.

  const error = { status: 400 };
  const { name, budget } = req.body;

  if (name === undefined || budget === undefined) {
    error.message = "name and budget are required";
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    error.message = "name of account must be between 3 and 100";
  } else if (typeof budget !== "number" || isNaN(budget)) {
    error.message = "budget of account must be a number";
  } else if (budget < 0 || budget > 1000000) {
    error.message = "budget of account is too large or too small";
  }

  if (error.message) {
    next(error);
  } else {
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const present = await db("accounts")
      .where("name", req.body.name.trim())
      .first();
    if (present) {
      next({ status: 400, message: "name is taken" });
    } else {
      next();
    }
  } catch (error) {
    nect(error);
  }
};

exports.checkAccountId = async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const account = await Accounts.getById(req.params.id);
    if (!account) {
      next({ status: 404, message: "account not found" });
    } else {
      req.account = account;
      next();
    }
  } catch (error) {
    next(error);
  }
};