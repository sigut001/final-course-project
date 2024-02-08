const checkEqualityPassword = (value, { req }) => {
  if (value !== req.body.confirmPassword) {
    throw new Error("Die Passwörter stimmen nicht überein");
  }
  return true;
};

const checkEqualityEmail = (value, { req }) => {
  if (value !== req.body.confirmEmail) {
    throw new Error("Die Emailadressen stimmen nicht überein");
  }
  return true;
};

const checkPriceMin = (value, { req }) => {
  if (value <= 0) {
    throw new Error("Preis muss größer 0€ sein");
  }
  return true;
};

const checkDiscount = (value, { req }) => {
  if (
    !(
      value === "keinRabatt" ||
      value === "5" ||
      value === "10" ||
      value === "15" ||
      value === "20" ||
      value === "25" ||
      value === "50"
    )
  ) {
    throw new Error("Preis muss größer 0€ sein");
  }
  return true;
};

const checkSale = (value, { req }) => {
  if (!(value === "true" || value === "false")) {
    throw new Error("Preis muss größer 0€ sein");
  }
  return true;
};

module.exports = {
  checkEqualityPassword: checkEqualityPassword,
  checkEqualityEmail: checkEqualityEmail,
  checkPriceMin: checkPriceMin,
  checkDiscount: checkDiscount,
  checkSale: checkSale,
};
