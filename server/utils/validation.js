/**
 * Validates a password against specific criteria.
 * - Minimum 6 characters
 * - At least one uppercase letter (A-Z)
 * - At least one lowercase letter (a-z)
 * - At least one number (0-9)
 * - At least one special character (e.g., !@#$%^&*)
 *
 * @param {string} password The password string to validate.
 * @returns {string|null} An error message if the password is invalid, otherwise null.
 */
const validatePassword = (password) => {
  // Regex for password validation:
  // ^                 - start of string
  // (?=.*[a-z])       - At least one lowercase letter
  // (?=.*[A-Z])       - At least one uppercase letter
  // (?=.*\d)          - At least one digit
  // (?=.*[!@#$%^&*()_+]) - At least one special character from the specified set
  // [A-Za-z\d!@#$%^&*()_+]{6,} - Minimum 6 characters (using the allowed characters)
  // $                 - end of string
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+.])[A-Za-z\d!@#$%^&*()_+.]{6,}$/;

  if (!password) {
    return 'Password cannot be empty.';
  }

  if (!passwordRegex.test(password)) {
    return 'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., !@#$%^&*()_+).';
  }

  return null; // Password is valid
};

module.exports = {
  validatePassword,
};
