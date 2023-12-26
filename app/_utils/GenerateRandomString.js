const GenerateRandomString = () => {
  const character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += character.charAt(Math.floor(Math.random() * character.length));
  }
  return result;
};
export default GenerateRandomString;
