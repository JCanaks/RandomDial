import {
  generateReadlineInstance,
  generateRandomPhoneNumbers,
  getPhoneNumberList,
  responseFormat,
  storeRandomPhoneNumbers,
  getMaxAndMinNumbers,
  sortAscending,
  sortDescending,
  clearFile,
} from '../utils/helpers/PhoneNumberControllerHelper';

class PhoneNumberController {
  static async getPhoneNumbers(req, res) {
    const phoneBook = {
      total: 0,
      phoneNumbers: [],
    };
    const readLineInstance = await generateReadlineInstance();

    await getPhoneNumberList(readLineInstance, phoneBook);
    return readLineInstance.on('close', () => res.status(200).json(
      phoneBook.total < 1
        ? responseFormat('No phone numbers found. Pls generate new phone numbers', phoneBook)
        : responseFormat('Phone Numbers Fetched Successfully', phoneBook),
    ));
  }

  static async generatePhoneNumbers(req, res) {
    const { amount } = req.body;

    if (!amount || amount < 1) {
      return res.status(400).json(
        responseFormat('No number(s) generated please specify an ammount greater than or equal to 1', []),
      );
    }

    if (amount > 500) {
      return res.status(400).json(
        responseFormat('Cannot Generate more than 500 numbers at a time', []),
      );
    }

    const generatedDetails = await generateRandomPhoneNumbers(amount);
    await storeRandomPhoneNumbers(generatedDetails.phoneNumbers);

    return res.status(201).json(
      responseFormat(`${generatedDetails.total} phone number(s) successfully generated`, generatedDetails),
    );
  }

  static async getSortedPhoneNumbers(req, res) {
    const phoneBook = {
      total: 0,
      min: '0',
      max: '0',
      phoneNumbers: [],
    };
    const readLineInstance = await generateReadlineInstance();

    await getMaxAndMinNumbers(readLineInstance, phoneBook);

    return readLineInstance.on('close', () => {
      if (phoneBook.phoneNumbers.length < 1) {
        return res.status(200).json(
          responseFormat('No phone numbers found. Pls generate new phone numbers', {
            total: phoneBook.total,
            phoneNumbers: phoneBook.phoneNumbers,
          }),
        );
      }

      const { order = '' } = req.query;
      if (order.toLowerCase() === 'asc' || order.toLowerCase() === 'ascending') {
        sortAscending(phoneBook.phoneNumbers);
      }
      if (order.toLowerCase() === 'desc' || order.toLowerCase() === 'descending') {
        sortDescending(phoneBook.phoneNumbers);
      }
      return res.status(200).json(
        responseFormat('Phone Numbers Fetched Successfully', phoneBook),
      );
    });
  }

  static async clearFileStorage(req, res) {
    await clearFile();
    return res.status(200).json(
      responseFormat('Phone Numbers Successfully deleted'),
    );
  }
}
export default PhoneNumberController;
