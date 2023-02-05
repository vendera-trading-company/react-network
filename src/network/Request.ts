import { Response } from "./Response";

export class Request {
  requestBuilder: RequestBuilder;

  constructor(requestBuilder: RequestBuilder) {
    this.requestBuilder = requestBuilder;
  }

  static post(url: string): RequestBuilder {
    return new RequestBuilder("POST", url).headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    });
  }

  static get(url: string): RequestBuilder {
    return new RequestBuilder("GET", url);
  }

  static put(url: string): RequestBuilder {
    return new RequestBuilder("PUT", url);
  }

  static delete(url: string): RequestBuilder {
    return new RequestBuilder("DELETE", url);
  }

  async run(): Promise<Response> {
    var response = null;

    try {
      response = await fetch(this.requestBuilder.url, {
        method: this.requestBuilder.method,
        headers: this.requestBuilder.headerData,
        body: this.requestBuilder.body,
      });
    } catch (e) {
      console.log(e);
    }

    return new Response(response);
  }
}

class RequestBuilder {
  method: string;
  body: any;
  headerData: any;
  url: string;

  constructor(method: string, url: string) {
    this.method = method;
    this.url = url;
  }

  json(body: any): RequestBuilder {
    if (typeof body == "string") {
      this.body = JSON.parse(body);
    }

    this.body = body;

    return this;
  }

  headers(headerData: any): RequestBuilder {
    this.headerData = headerData;

    return this;
  }

  async run(): Promise<Response> {
    const request = new Request(this);

    return await request.run();
  }
}
