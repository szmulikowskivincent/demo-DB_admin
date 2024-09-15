const defaultEmail = "vszmulikowski@gmail.com";
const defaultPassword = "Moi1971moi";

export const loginAdmin = async (
  email = defaultEmail,
  password = defaultPassword
) => {
  return new Promise((resolve, reject) => {
    if (email === defaultEmail && password === defaultPassword) {
      resolve({ status: 200, message: "Connexion réussie" });
    } else {
      reject({ response: { status: 401, message: "Identifiants incorrects" } });
    }
  });
};
