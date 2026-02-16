import { execute } from "../jest.setup";

type CountriesResponse = {
  countries: {
    code: string;
    name: string;
    emoji: string;
  }[];
};

describe("Countries query", () => {
  it("should return list of countries", async () => {
    await execute(`
      mutation {
        createCountry(code: "BE", name: "Belgique", emoji: "🇧🇪") {
          code
        }
      }
    `);

    const response = await execute(`
      query {
        countries {
          code
          name
          emoji
        }
      }
    `);

    expect(response.body.kind).toBe("single");

    if (response.body.kind === "single") {
      expect(response.body.singleResult.errors).toBeUndefined();

      const data = response.body.singleResult.data as CountriesResponse;

      expect(data.countries).toBeDefined();
      expect(data.countries.length).toBeGreaterThan(0);

      const codes = data.countries.map((c) => c.code);
      expect(codes).toContain("BE");
    }
  });
});
