export const validateForm = (data) => {
  const errors = {};

  if (!data.firstName || data.firstName.length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (!data.lastName) {
    errors.lastName = 'Last name is required';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please provide a valid email';
  }

  if (!data.phone || !/^\d{10}$/.test(data.phone)) {
    errors.phone = 'Phone must be 10 digits';
  }

  if (data.age && data.age < 18) {
    errors.age = 'Age must be at least 18';
  }

  if (!data.gender) {
    errors.gender = 'Please select a gender';
  }

  return errors;
};

export const getFullName = (firstName, lastName) => {
  return `${firstName} ${lastName}`.trim();
};
