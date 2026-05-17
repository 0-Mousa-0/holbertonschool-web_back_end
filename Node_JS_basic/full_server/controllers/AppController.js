export default class AppController {
  /**
   * Generates the root home resource response body.
   */
  static getHomepage(request, response) {
    return response.status(200).send('Hello Holberton School!');
  }
}