import { buildSchema } from "type-graphql"; 
import CountryResolver from "./resolvers/CountryResolver";

export async function getSchema() {
return buildSchema({
    resolvers: [CountryResolver],
    validate: true
});
}