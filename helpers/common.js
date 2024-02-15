export const validateString = (value) => {
  return value?.length < 3 || value === null
    ? "Must have atleat 3 characters"
    : null;
};
