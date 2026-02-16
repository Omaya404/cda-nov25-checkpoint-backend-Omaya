import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import db from "./db/index";
import CountryResolver from "./resolvers/CountryResolver";
import env from "./env";


export async function createServer() {
  if (!db.isInitialized) {
    await db.initialize();
  }

  const schema = await buildSchema({
    resolvers: [CountryResolver],
    validate: true,
  });

  return new ApolloServer({ schema });
}

async function start() {
  const server = await createServer();

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(env.PORT) },
  });

  console.log(`Ready at ${url}`);
}

// ✅ démarre en dev, pas pendant les tests
if (process.env.NODE_ENV !== "test") {
  start().catch(console.error);
}

