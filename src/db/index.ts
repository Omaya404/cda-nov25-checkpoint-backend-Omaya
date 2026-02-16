import { DataSource } from "typeorm";
import env from "../env";
import { Country } from "../entities/Country";

const db = new DataSource({
  type: "sqlite",
  database: env.DB_NAME,
  entities: [Country],
  synchronize: true,
});

export default db;

export async function clearDB() {
  if (!db.isInitialized) return;

  for (const meta of db.entityMetadatas) {
    const repo = db.getRepository(meta.target as any);
    await repo.clear();
  }
}
