export const checkValidData = (
  { name, email, password, phoneNumber },
  isRegistering
) => {
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const phoneRegex = /^[0-9]{10}$/; // Assuming phone number should be 10 digits
  const nameRegex = /^[a-zA-Z][a-zA-Z\s]{4,}$/;

  if (isRegistering) {
    if (!nameRegex.test(name)) {
      return "Name should contain a minimum of 5 letters";
    }

    if (!emailRegex.test(email)) {
      return "Email is not valid";
    }

    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 , least one letter and one number, one special character";
    }

    if (!phoneRegex.test(phoneNumber)) {
      return "Phone number is not valid (should be 10 digits)";
    }
  } else {
    // validate for login
    if (!emailRegex.test(email)) {
      return "Email is not valid";
    }

    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 , least one letter and one number";
    }
  }

  return null; // Return null for no error
};

export const checkValidPassword = (password) => {
  console.log("first checking password");
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return "Password must be at least 8 , least one letter and one number";
  }
  return null;
};
