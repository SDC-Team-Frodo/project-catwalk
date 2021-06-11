const isEmail = (email) => {
  if (
    email.length > 2
    && email.indexOf('@') > -1
    && email.indexOf('.') > -1
    && email.indexOf(' ') === -1
    && email.slice(email.indexOf('.'), email.length).length === 4
    && email.slice(email.indexOf('@'), email.indexOf('.')).length > 1
  ) {
    return true;
  }
  return false;
};

export default isEmail;
