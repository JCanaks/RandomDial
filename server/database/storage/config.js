const isTest = process.env.NODE_ENV === 'test';
const filePath = isTest ? '../../database/storage/phoneNumbers_test.txt'
  : '../../database/storage/phoneNumbers.txt';

export default filePath;