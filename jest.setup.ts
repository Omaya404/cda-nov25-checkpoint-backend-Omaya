import { ApolloServer } from "@apollo/server";
import { createServer } from "./src/index";
import db, { clearDB } from "./src/db";

let server: ApolloServer;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  server = await createServer();
  await server.start();
});

beforeEach(async () => {
  await clearDB();
});

afterAll(async () => {
  await server.stop();
  await db.destroy();
});

export async function execute(query: string, variables?: any) {
  return server.executeOperation({ query, variables });
}
