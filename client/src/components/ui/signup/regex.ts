// regex.ts
export const emailRegex = new RegExp(
  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
);
export const mobileRegex = new RegExp("^[0-9]{10}$");

export const pwRegex = new RegExp("^[0-9]+$");

export const userNameRegex = new RegExp("^[a-zA-Z.@+-]+$");
