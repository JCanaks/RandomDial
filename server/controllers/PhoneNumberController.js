import {
  generateReadlineInstance,
  generateRandomPhoneNumbers,
  getPhoneNumberList,
  responseFormat,
  storeRandomPhoneNumbers,
} from '../utils/helpers/PhoneNumberControllerHelper';

class PhoneNumberController {
  static async getPhoneNumbers(req, res) {
    try {
      const phoneBook = {
        total: 0,
        phoneNumbers: [],
      };
      const readLineInstance = await generateReadlineInstance();

      await getPhoneNumberList(readLineInstance, phoneBook);
      readLineInstance.on('close', () => res.status(200).json(
        phoneBook.total < 1
          ? responseFormat('There is currently no phone numbers on the List', phoneBook)
          : responseFormat('Phone Numbers Fetched Successfully', phoneBook),
      ));
    } catch (error) {
      throw error;
    }
  }

  static async generatePhoneNumbers(req, res) {
    try {
      const { amount } = req.body;

      if (!amount || amount < 1) {
        return res.status(200).json(
          responseFormat('No number(s) generated please specify an ammount greater than or equal to 1', []),
        );
      }

      const generatedDetails = await generateRandomPhoneNumbers(amount);
      storeRandomPhoneNumbers(generatedDetails.phoneNumbers);

      return res.status(200).json(
        responseFormat(`${generatedDetails.total} phone number(s) successfully generated`, generatedDetails),
      );
    } catch (error) {
      throw error;
    }
  }
}

export default PhoneNumberController;
