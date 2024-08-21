import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

export const sqlite = new Database("exercises.db");
export const db = drizzle(sqlite);
