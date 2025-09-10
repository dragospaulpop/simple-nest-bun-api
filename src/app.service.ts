import { Injectable, Logger } from "@nestjs/common";

const links = [
  {
    href: "/users",
    rel: "users",
    method: "GET",
    description: "Get all users",
    query: {
      page: { type: "number" },
      limit: { type: "number" },
    },
  },
  {
    href: "/users",
    rel: "users",
    method: "POST",
    description: "Create a new user",
    body: {
      type: "object",
      properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        age: { type: "number" },
      },
    },
  },
  {
    href: "/users/:id",
    rel: "users",
    method: "GET",
    description: "Get a user by id",
  },
];

@Injectable()
export class AppService {
  constructor() {}

  private readonly logger = new Logger(AppService.name);

  async index(): Promise<string> {
    this.logger.log("Index page");
    return `
    <html>
      <body>
        <h1>How to use the API</h1>
        <table>
          <thead>
            <tr>
              <th>Link</th>
              <th>Method</th>
              <th>Description</th>
              <th>Query</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            ${links
              .map(
                (link) => `
              <tr>
                <td>${link.href}</td>
                <td>${link.method}</td>
                <td>${link.description}</td>
                <td>${link.query ? JSON.stringify(link.query) : ""}</td>
                <td>${link.body ? JSON.stringify(link.body) : ""}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </body>
    </html>
    `;
  }
}
