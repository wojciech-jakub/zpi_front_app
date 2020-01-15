import Cookies from "js-cookie";

const storeValue = (name, value, expires) => {
  Cookies.set(name, value, { expires: expires || 1 });
};

const getValue = name => {
  return Cookies.getJSON(name);
};

const removeValue = name => {
  Cookies.remove(name);
};

export default {
  storeValue,
  getValue,
  removeValue
};
