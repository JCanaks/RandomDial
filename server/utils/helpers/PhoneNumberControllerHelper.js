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

export const generatePhoneNumbers = () => { };
