import { Dirent } from "fs";
import { readdir } from "node:fs/promises";

export const getDirectories = async (folder: string) => {
  const subFolders = (
    await readdir(folder, {
      withFileTypes: true,
    })
  ).filter((dir) => dir.isDirectory());

  return subFolders;
};

export const getExercises = (directories: Array<Dirent>) => {
  return directories.map((dir) => {
    const exercisePath = Bun.resolveSync(
      `./exercises/${dir.name}/exercise.json`,
      __dirname
    );
    return require(exercisePath);
  });
};
