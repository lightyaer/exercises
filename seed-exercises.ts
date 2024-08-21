import { eq, inArray } from "drizzle-orm";
import { db } from "./db";
import {
  aliases,
  categories,
  equipments,
  exercises,
  exercisesCategory,
  exercisesEquipment,
  exercisesForce,
  exercisesLevel,
  exercisesMechanic,
  exercisesPrimaryMuscles,
  exercisesSecondaryMuscles,
  forces,
  levels,
  mechanics,
  muscles,
} from "./schema";

import { getDirectories, getExercises } from "./get-exercise";
import type { Exercise } from "./types/exercise";

const directories = await getDirectories("./exercises");
const allExercises: Exercise[] = getExercises(directories);

for (const exercise of allExercises) {
  const savedExercise = await db
    .insert(exercises)
    .values({
      instructions: exercise.instructions.join("\n"),
    })
    .returning()
    .get();

  await db.insert(aliases).values({
    exerciseId: savedExercise.id,
    name: exercise.name,
  });

  if (exercise.aliases?.length) {
    await db.insert(aliases).values(
      exercise.aliases.map((alias) => ({
        exerciseId: savedExercise.id,
        name: alias,
      }))
    );
  }

  if (exercise.primaryMuscles) {
    const primaryMuscleIds = await db
      .select({
        id: muscles.id,
      })
      .from(muscles)
      .where(inArray(muscles.name, exercise.primaryMuscles));

    await db.insert(exercisesPrimaryMuscles).values(
      primaryMuscleIds.map((m) => ({
        exerciseId: savedExercise.id,
        muscleId: m.id,
      }))
    );
  }

  if (exercise.secondaryMuscles?.length) {
    const secondaryMuscleIds = await db
      .select({
        id: muscles.id,
      })
      .from(muscles)
      .where(inArray(muscles.name, exercise.secondaryMuscles));

    await db.insert(exercisesSecondaryMuscles).values(
      secondaryMuscleIds.map((m) => ({
        exerciseId: savedExercise.id,
        muscleId: m.id,
      }))
    );
  }

  if (exercise?.force) {
    const forceIds = await db
      .select({
        id: forces.id,
      })
      .from(forces)
      .where(eq(forces.name, exercise?.force));

    await db.insert(exercisesForce).values(
      forceIds.map((f) => ({
        exerciseId: savedExercise.id,
        forceId: f.id,
      }))
    );
  }

  if (exercise.level) {
    const levelIds = await db
      .select({
        id: levels.id,
      })
      .from(levels)
      .where(eq(levels.name, exercise?.level));

    await db.insert(exercisesLevel).values(
      levelIds.map((l) => ({
        exerciseId: savedExercise.id,
        levelId: l.id,
      }))
    );
  }

  if (exercise.mechanic) {
    const mechanicIds = await db
      .select({
        id: mechanics.id,
      })
      .from(mechanics)
      .where(eq(mechanics.name, exercise.mechanic));

    await db.insert(exercisesMechanic).values(
      mechanicIds.map((m) => ({
        exerciseId: savedExercise.id,
        mechanicId: m.id,
      }))
    );
  }

  if (exercise.equipment) {
    const equipmentIds = await db
      .select({
        id: equipments.id,
      })
      .from(equipments)
      .where(eq(equipments.name, exercise.equipment));

    await db.insert(exercisesEquipment).values(
      equipmentIds.map((e) => ({
        exerciseId: savedExercise.id,
        equipmentId: e.id,
      }))
    );
  }

  if (exercise.category) {
    const categoryIds = await db
      .select({
        id: categories.id,
      })
      .from(categories)
      .where(eq(categories.name, exercise.category));

    await db.insert(exercisesCategory).values(
      categoryIds.map((c) => ({
        exerciseId: savedExercise.id,
        categoryId: c.id,
      }))
    );
  }
}
