import readline from 'readline';
import path from 'path';
import fs from 'fs';

export const generateReadlineInstance = () => {
  const filePath = '../../database/storage/phoneNumbers.txt';
  const readLineInstance = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, filePath),
      { flags: 'a+' }),
  });
  return readLineInstance;
};

export const getPhoneNumberList = (readLineInstance, phoneBook) => {
  try {
    readLineInstance.on('line', (line) => {
      // eslint-disable-next-line no-param-reassign
      phoneBook.total += 1;
      phoneBook.phoneNumbers.push(line);
    });
  } catch (error) {
    throw error;
  }
};

export const responseFormat = (message, data = {}) => ({
  message,
  data,
});

export const generateRandomPhoneNumbers = (amount) => {
  const phoneNumbers = [];
  for (let i = 0; i < amount; i += 1) {
    const randomPhoneNumber = `0${Math.floor(Math.random() * 900000000) + 100000000}`;
    phoneNumbers.push(randomPhoneNumber);
  }
  const generatedDetails = {
    total: phoneNumbers.length,
    phoneNumbers,
  };
  return generatedDetails;
};

export const storeRandomPhoneNumbers = (phoneNumbers) => {
  const filePath = '../../database/storage/phoneNumbers.txt';
  const writeStream = fs.createWriteStream(path.join(__dirname, filePath),
    { flags: 'a+' });
  phoneNumbers.forEach((element) => {
    writeStream.write(`${element}\n`);
  });
  writeStream.end();
};
