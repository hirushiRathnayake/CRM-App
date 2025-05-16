const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // min 6 chars, at least one letter and one number
const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/; // 3-15 chars, letters, numbers, underscore
const nameRegex = /^[a-zA-Z ]{2,}$/; // letters and spaces only, min 2 chars
const phoneRegex = /^[0-9]{7,15}$/; // digits only, length 7-15

type ValidationErrors = Record<string, string>;

export function validateUsername(username: string): string | null {
  if (!username) return 'Username is required';
  if (!usernameRegex.test(username))
    return 'Username must be 3-15 characters, letters, numbers, or underscores only';
  return null;
}

export function validateEmail(email: string): string | null {
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Email is invalid';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required';
  if (!passwordRegex.test(password))
    return 'Password must be at least 6 characters, include at least one letter and one number';
  return null;
}

export function validateConfirmPassword(password: string, confirmPassword: string): string | null {
  if (!confirmPassword) return 'Confirm password is required';
  if (password !== confirmPassword) return 'Passwords do not match';
  return null;
}

export function validateName(name: string): string | null {
  if (!name) return 'Full name is required';
  if (!nameRegex.test(name)) return 'Name must contain only letters and spaces, at least 2 characters';
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone) return null; // optional, so no error if empty
  if (!phoneRegex.test(phone)) return 'Phone number is invalid';
  return null;
}

// Validate all registration fields in one call
export function validateRegister(fields: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone?: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  const usernameError = validateUsername(fields.username);
  if (usernameError) errors.username = usernameError;

  const emailError = validateEmail(fields.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(fields.password);
  if (passwordError) errors.password = passwordError;

  const confirmPasswordError = validateConfirmPassword(fields.password, fields.confirmPassword);
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

  const nameError = validateName(fields.fullName);
  if (nameError) errors.fullName = nameError;

  const phoneError = validatePhone(fields.phone || '');
  if (phoneError) errors.phone = phoneError;

  return errors;
}
