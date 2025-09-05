function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function validatePhone(phone) {
  const regex = /^07\d{8}$/; // Kenyan format e.g. 0712345678
  return regex.test(phone);
}

module.exports = {
  validateEmail,
  validatePassword,
  validatePhone
};
