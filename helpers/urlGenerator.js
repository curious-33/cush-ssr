const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
  ""
);
const generateLetters = (length = 1) =>
  Array(length)
    .fill()
    .map((_) => letters[Math.floor(Math.random() * 52)])
    .join("");

const numbers = "0123456789".split("");
const generateDigits = (length = 1) =>
  Array(length)
    .fill()
    .map((_) => numbers[Math.floor(Math.random() * 10)])
    .join("");

function urlGenerator(
  url,
  existingUrls = [],
  lettersLength = 3,
  numbersLength = 3
) {
  if (typeof url === "string") {
    let uniqueUrl =
      generateLetters(lettersLength) + generateDigits(numbersLength);

    while (existingUrls.includes(uniqueUrl)) {
      uniqueUrl =
        generateLetters(lettersLength) + generateDigits(numbersLength);
    }

    return uniqueUrl;
  }

  return null;
}

module.exports = urlGenerator;
