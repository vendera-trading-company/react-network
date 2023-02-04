export class Response {
  response: any;

  constructor(response: any) {
    this.response = response;
  }

  async json() {
    if (!this.response) {
      return null;
    }

    try {
      return await this.response.json();
    } catch (e) {
      console.log(e);
    }

    return null;
  }
}
