import { generateReadlineInstance, getPhoneNumberList, responseFormat } from '../utils/helpers/PhoneNumberControllerHelper';

class PhoneNumberController {
  static async getPhoneNumbers(req, res) {
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
  }
}

export default PhoneNumberController;
