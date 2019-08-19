import fs from 'fs';
import path from 'path';

export const seedNumbers = () => {
  const mockSeedData = '0333333333\n0222222222\n0111111111\n0555555555\n0444444444';
  const filePath = '../../database/storage/phoneNumbers_test.txt';
  fs.writeFile(path.join(__dirname, filePath), mockSeedData, { flag: 'w+' });
};

export default seedNumbers;
