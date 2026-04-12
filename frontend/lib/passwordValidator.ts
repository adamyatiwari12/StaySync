export const validatePasswordStrength = (password: string) => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("Password must contain at least one special character (!@#$%^&*...)");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const getPasswordStrength = (password: string) => {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;

  return strength;
};

export const getStrengthLabel = (strength: number) => {
  switch (strength) {
    case 0:
    case 1:
      return { label: "Weak", color: "text-red-500" };
    case 2:
      return { label: "Fair", color: "text-orange-500" };
    case 3:
      return { label: "Good", color: "text-yellow-500" };
    case 4:
      return { label: "Strong", color: "text-lime-500" };
    case 5:
      return { label: "Very Strong", color: "text-green-500" };
    default:
      return { label: "Unknown", color: "text-gray-500" };
  }
};
