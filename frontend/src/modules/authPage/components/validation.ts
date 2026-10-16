const PASSWORD_MIN = 8;


export function validateEmail(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required.";
  // simple shape check — the backend does the authoritative deliverable check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Enter a valid email address.";
  return "";
}

export function validatePassword(value: string): string {
  if (!value) return "Password is required.";
  if (value.length < PASSWORD_MIN) return `Password must be at least ${PASSWORD_MIN} characters.`;
  if (value.length > 128) return "Password is too long.";
  if (!/[A-Za-z]/.test(value)) return "Password must include at least one letter.";
  if (!/[0-9]/.test(value)) return "Password must include at least one number.";
  return "";
}

export function validateConfirmPassword(password: string, confirm: string): string {
  if (!confirm) return "Please confirm your password.";
  if (password !== confirm) return "Passwords do not match.";
  return "";
}
