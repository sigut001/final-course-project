function createUserSession(req, user, action) {
  req.session.uid = user._id.toString();
  req.session.save(action);
  req.session.isAdmin = user.isAdmin;
}

function deleteAuthInSession(req, action) {
  req.session.uid = null;
  req.session.isAdmin = null;
  req.session.save(action);
}

function signUpDataToSession(req, action) {
  req.session.signUpData = {
    email: req.body.email,
    confirmEmail: req.body.confirmEmail,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    street: req.body.street,
    houseNumber: req.body.houseNumber,
    city: req.body.city,
    plz: req.body.plz,
  };
}

function logInDataToSession(req) {
  req.session.logInData = {
    email: req.body.email,
  };
}

async function messageToSession(req, errorArray, singleMessage) {
  if (errorArray) {
    for (let i = 0; i < errorArray.length; i++) {
      if (req.session.message) {
        req.session.message.push(errorArray[i].msg);
      } else {
        req.session.message = [errorArray[i].msg];
      }
    }
  }
  if (singleMessage) {
    if (req.session.message) {
      req.session.message.push(singleMessage);
    } else {
      req.session.message = [singleMessage];
    }
  }
}

module.exports = {
  createUserSession: createUserSession,
  deleteAuthInSession: deleteAuthInSession,
  signUpDataToSession: signUpDataToSession,
  logInDataToSession: logInDataToSession,
  messageToSession: messageToSession,
};
