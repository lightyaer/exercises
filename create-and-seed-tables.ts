// npm run build:sqlite <db.name> | 'exercises';

import { createId } from "@paralleldrive/cuid2";
import { EOL } from "os";
import { getDirectories, getExercises } from "./get-exercise";
import type { Exercise } from "./types/exercise";
import { sqlite } from "./db";

const tableName = process.argv[2] || "exercise";

const createSqliteTable = (
  exercises: Array<Exercise>,
  field: string,
  tableName: string
): string[] => {
  const values = Object.keys(
    exercises.reduce((obj: any, ex: any) => {
      const exField = ex[field];
      if (Array.isArray(exField)) obj[exField[0]] = true;
      else if (exField) obj[exField] = true;
      return obj;
    }, {})
  );

  const createTableQuery = `CREATE TABLE ${tableName} ( id text(24) PRIMARY KEY, name text NOT NULL);`;

  const baseInsertQuery = `INSERT INTO ${tableName} (id, name) VALUES `;
  const insertQuery = values
    .map((val) => `('${createId()}', '${val}')`)
    .join(",\n");

  return [
    createTableQuery,
    ...createLineBreak(),
    baseInsertQuery + `${insertQuery};`,
  ];
};

const createBridgeTable = ({
  tableName,
  field,
  fieldTableName,
}: {
  tableName: string;
  field: string;
  fieldTableName: string;
}): string => {
  const fieldId = `${field}_id`;

  const createTableQuery = `CREATE TABLE ${tableName} ( 
    ${fieldId} text(24),
    exercise_id text(24),
    FOREIGN KEY (${fieldId}) REFERENCES ${fieldTableName}(id),
    FOREIGN KEY (exercise_id) REFERENCES exercise(id),
    PRIMARY KEY (${fieldId}, exercise_id)
   );`;

  return createTableQuery;
};

const createSQLComment = (comment: string): string => `-- ${comment}`;

const createLineBreak = (amount: number = 1): Array<string> =>
  [...new Array(amount)].map(() => EOL);

const createAliasTable = () => {
  return `CREATE TABLE alias (
    id text(24) PRIMARY KEY NOT NULL,
    name text NOT NULL,
    exercise_id text(24) NOT NULL,
    FOREIGN KEY (exercise_id) REFERENCES exercise(id)
  );
  `;
};

const createExercisesTable = (): string => `
CREATE TABLE ${tableName} (
  id text(24) PRIMARY KEY NOT NULL,
  instructions Text,
  created_at text(24) NOT NULL,
  updated_at text(24) NOT NULL
);
`;

const createInsertExercises = (allExercises: Array<Exercise>) => {
  const baseInsertQuery = `INSERT INTO ${tableName} (id, instructions, description, tips, created_at, updated_at) VALUES `;

  const rest = allExercises
    .map(
      (e: Exercise) =>
        `('${createId()}', "${e.name}", ${
          e.instructions ? `"${e.instructions.join("\n")}"` : null
        }, ${e.description ? `'${e.description}'` : null}, ${
          e.tips ? `'${e.tips}'` : null
        }, '${new Date().toISOString()}', '${new Date().toISOString()}')`
    )
    .join(",\n");

  return `${baseInsertQuery} + ${rest};`;
};

const startTransaction = () => {
  return "BEGIN TRANSACTION;";
};

const commitTransaction = () => {
  return "COMMIT;";
};

// Main
const directories = await getDirectories("./exercises");
const exercises = getExercises(directories);

const sqliteContents = [
  startTransaction(),
  ...createLineBreak(),
  createSQLComment("Database Setup File"),
  ...createLineBreak(2),
  createSQLComment("Drop Tables"),
  ...createLineBreak(),
  "DROP TABLE IF EXISTS `muscle`;",
  ...createLineBreak(),
  "DROP TABLE IF EXISTS `force`;",
  ...createLineBreak(),
  "DROP TABLE IF EXISTS `level`;",
  ...createLineBreak(),
  "DROP TABLE IF EXISTS `mechanic`;",
  ...createLineBreak(),
  "DROP TABLE IF EXISTS `equipment`;",
  ...createLineBreak(),
  "DROP TABLE IF EXISTS `category`;",
  ...createLineBreak(),
  "DROP TABLE IF EXISTS `alias`;",
  ...createLineBreak(),
  "DROP TABLE IF EXISTS `exercise`;",
  ...createLineBreak(),
  "DROP TABLE IF EXISTS `exercise_primary_muscles`;",
  ...createLineBreak(),
  "DROP TABLE IF EXISTS `exercise_secondary_muscles`;",
  ...createLineBreak(),
  "DROP TABLE IF EXISTS `exercise_force`;",
  ...createLineBreak(),
  "DROP TABLE IF EXISTS `exercise_level`;",
  ...createLineBreak(),
  "DROP TABLE IF EXISTS `exercise_mechanic`;",
  ...createLineBreak(),
  "DROP TABLE IF EXISTS `exercise_equipment`;",
  ...createLineBreak(),
  "DROP TABLE IF EXISTS `exercise_category`;",
  ...createLineBreak(2),
  ...createSqliteTable(exercises, "primaryMuscles", "muscle"),
  ...createLineBreak(2),
  ...createSqliteTable(exercises, "force", "force"),
  ...createLineBreak(2),
  ...createSqliteTable(exercises, "level", "level"),
  ...createLineBreak(2),
  ...createSqliteTable(exercises, "mechanic", "mechanic"),
  ...createLineBreak(2),
  ...createSqliteTable(exercises, "equipment", "equipment"),
  ...createLineBreak(2),
  ...createSqliteTable(exercises, "category", "category"),
  ...createLineBreak(2),
  createSQLComment("Create Exercises Table"),
  createExercisesTable(),
  ...createLineBreak(),
  createAliasTable(),
  ...createLineBreak(2),
  createBridgeTable({
    tableName: "exercise_primary_muscles",
    field: "muscle",
    fieldTableName: "muscle",
  }),
  ...createLineBreak(),
  createBridgeTable({
    tableName: "exercise_secondary_muscles",
    field: "muscle",
    fieldTableName: "muscle",
  }),
  ...createLineBreak(),
  createBridgeTable({
    tableName: "exercise_force",
    field: "force",
    fieldTableName: "force",
  }),
  ...createLineBreak(),
  createBridgeTable({
    tableName: "exercise_level",
    field: "level",
    fieldTableName: "level",
  }),
  ...createLineBreak(),
  createBridgeTable({
    tableName: "exercise_mechanic",
    field: "mechanic",
    fieldTableName: "mechanic",
  }),
  ...createLineBreak(),
  createBridgeTable({
    tableName: "exercise_equipment",
    field: "equipment",
    fieldTableName: "equipment",
  }),
  ...createLineBreak(),
  createBridgeTable({
    tableName: "exercise_category",
    field: "category",
    fieldTableName: "category",
  }),
  //   createInsertExercises(exercises),
  ...createLineBreak(2),
  commitTransaction(),
];

Bun.write("./exercises-sqlite.sql", sqliteContents.join(""), {
  createPath: true,
});
console.log("File written");

sqlite.exec(sqliteContents.join(""));

console.log("DB Created");
