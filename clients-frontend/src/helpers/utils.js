export const isInObject = (data, object) => {
  return Object.values(object).includes(data);
};
export const isEmailExist = (data, arr) => {
  return arr.some((el) => el.email === data);
};
export const isProviderExist = (data, arr) => {
  return arr.some((el) => el.name === data);
};
export const checkData = (name, email, phone, object) => {
  const errors = {};
  if (name === "") {
    errors.name = "*name is required";
  }
  if (email === "") {
    errors.email = "*email is required";
  }
  if (phone === "") {
    errors.phone = "*phone is required";
  }
};
