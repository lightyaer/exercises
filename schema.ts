import { createId, getConstants } from "@paralleldrive/cuid2";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

const DATE_ISO_STRING_LENGTH = 24;

const getDateString = () => new Date().toISOString();

export const muscles = sqliteTable("muscle", {
  id: text("id", { length: getConstants().defaultLength })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
});

export const forces = sqliteTable("force", {
  id: text("id", { length: getConstants().defaultLength })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
});

export const levels = sqliteTable("level", {
  id: text("id", { length: getConstants().defaultLength })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
});

export const mechanics = sqliteTable("mechanic", {
  id: text("id", { length: getConstants().defaultLength })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
});

export const equipments = sqliteTable("equipment", {
  id: text("id", { length: getConstants().defaultLength })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
});

export const categories = sqliteTable("category", {
  id: text("id", { length: getConstants().defaultLength })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
});

export const aliases = sqliteTable("alias", {
  id: text("id", { length: getConstants().defaultLength })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
  exerciseId: text("exercise_id")
    .notNull()
    .references(() => exercises.id),
});

export const exercisesPrimaryMuscles = sqliteTable("exercise_primary_muscles", {
  exerciseId: text("exercise_id")
    .notNull()
    .references(() => exercises.id),
  muscleId: text("muscle_id")
    .notNull()
    .references(() => muscles.id),
});

export const exercisesSecondaryMuscles = sqliteTable(
  "exercise_secondary_muscles",
  {
    exerciseId: text("exercise_id")
      .notNull()
      .references(() => exercises.id),
    muscleId: text("muscle_id")
      .notNull()
      .references(() => muscles.id),
  }
);

export const exercisesForce = sqliteTable("exercise_force", {
  exerciseId: text("exercise_id")
    .notNull()
    .references(() => exercises.id),
  forceId: text("force_id")
    .notNull()
    .references(() => forces.id),
});

export const exercisesLevel = sqliteTable("exercise_level", {
  exerciseId: text("exercise_id")
    .notNull()
    .references(() => exercises.id),
  levelId: text("level_id")
    .notNull()
    .references(() => levels.id),
});

export const exercisesMechanic = sqliteTable("exercise_mechanic", {
  exerciseId: text("exercise_id")
    .notNull()
    .references(() => exercises.id),
  mechanicId: text("mechanic_id")
    .notNull()
    .references(() => mechanics.id),
});

export const exercisesEquipment = sqliteTable("exercise_equipment", {
  exerciseId: text("exercise_id")
    .notNull()
    .references(() => exercises.id),
  equipmentId: text("equipment_id")
    .notNull()
    .references(() => equipments.id),
});

export const exercisesCategory = sqliteTable("exercise_category", {
  exerciseId: text("exercise_id")
    .notNull()
    .references(() => exercises.id),
  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id),
});

export const exercises = sqliteTable("exercise", {
  id: text("id", { length: getConstants().defaultLength })
    .$defaultFn(() => createId())
    .notNull()
    .primaryKey(),
  instructions: text("instructions"),
  createdAt: text("created_at", {
    length: DATE_ISO_STRING_LENGTH,
  }).$defaultFn(() => getDateString()),
  updatedAt: text("updated_at", {
    length: DATE_ISO_STRING_LENGTH,
  }).$defaultFn(() => getDateString()),
});
