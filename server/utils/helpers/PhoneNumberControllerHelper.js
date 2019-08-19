/* eslint-disable no-param-reassign */
import readline from 'readline';
import path from 'path';
import fs from 'fs';
import filePath from '../../database/storage/config';

export const generateReadlineInstance = () => {
  const input = fs.createReadStream(path.join(__dirname, filePath),
    { flags: 'a+' });
  const readLineInstance = readline.createInterface({
    input,
  });
  return readLineInstance;
};

export const getPhoneNumberList = (readLineInstance, phoneBook) => {
  readLineInstance.on('line', (line) => {
    // eslint-disable-next-line no-param-reassign
    phoneBook.total += 1;
    phoneBook.phoneNumbers.push(line);
  });
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
  const writeStream = fs.createWriteStream(path.join(__dirname, filePath),
    { flags: 'a+' });
  phoneNumbers.forEach((element) => {
    writeStream.write(`${element}\n`);
  });
  writeStream.end();
};

export const getMaxAndMinNumbers = (readLineInstance, phoneBook) => {
  readLineInstance.on('line', (number) => {
    const phoneNumber = parseInt(number, 10);

    if (phoneBook.total === 0) {
      phoneBook.min = number;
    }
    phoneBook.min = phoneNumber < parseInt(phoneBook.min, 10) ? number : phoneBook.min;
    phoneBook.max = phoneNumber > parseInt(phoneBook.max, 10) ? number : phoneBook.max;
    phoneBook.total += 1;
    phoneBook.phoneNumbers.push(number);
  });
};

export const sortAscending = (phoneNumbers) => {
  phoneNumbers.sort((a, b) => a - b);
};

export const sortDescending = (phoneNumbers) => {
  phoneNumbers.sort((a, b) => b - a);
};

export const clearFile = () => {
  fs.writeFile(path.join(__dirname, filePath), '', { flag: 'w+' }, () => {});
};
