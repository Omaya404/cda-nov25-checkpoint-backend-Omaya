import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country } from "../entities/Country";

@Resolver(() => Country)
export default class CountryResolver {
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return Country.find({ order: { name: "ASC" } });
  }

  @Query(() => Country, { nullable: true })
  async countryByCode(@Arg("code") code: string): Promise<Country | null> {
    return Country.findOne({ where: { code: code.trim().toUpperCase() } });
  }

  @Mutation(() => Country)
  async createCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
  ): Promise<Country> {
    const normalizedCode = code.trim().toUpperCase();

    const existing = await Country.findOne({ where: { code: normalizedCode } });
    if (existing) {
      throw new Error(`Country with code "${normalizedCode}" already exists`);
    }

    const country = Country.create({
      code: normalizedCode,
      name: name.trim(),
      emoji: emoji.trim(),
    });

    return country.save();
  }
}
