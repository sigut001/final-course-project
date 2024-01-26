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

module.exports = {
  checkEqualityPassword: checkEqualityPassword,
  checkEqualityEmail: checkEqualityEmail,
  checkPriceMin: checkPriceMin,
};
