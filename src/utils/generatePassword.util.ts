const generatePassword = () => {
  let password = "";
  const alphaCode = "kamlesh1233@tyuipew@erkwerjnfsdfsflezxcm@";
  while (password.length < 8) {
    const pos = Math.floor(Math.random() * alphaCode.length);
    password += alphaCode.at(pos);
  }
  console.log("generated passoword",password);
  return  password;
};

export default generatePassword;
