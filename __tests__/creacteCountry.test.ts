import { execute } from "../jest.setup";

type CreateCountryResponse = {
  createCountry: {
    code: string;
    name: string;
  };
};

describe("Create country mutation", () => {
  it("should create a country", async () => {

    const response = await execute(`
      mutation {
        createCountry(code: "FR", name: "France", emoji: "🇫🇷") {
          code
          name
        }
      }
    `);

    expect(response.body.kind).toBe("single");

    if (response.body.kind === "single") {

      expect(response.body.singleResult.errors).toBeUndefined();

      const data = response.body.singleResult.data as CreateCountryResponse;

      expect(data.createCountry.code).toBe("FR");
      expect(data.createCountry.name).toBe("France");
    }
  });
});
