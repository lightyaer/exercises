console.log("Hello via Bun!");

import { readdir } from "node:fs/promises";

const getDirectories = async (folder: string) => {
  const subFolders = (
    await readdir(folder, {
      withFileTypes: true,
    })
  ).filter((dir) => dir.isDirectory());

  console.log(subFolders);
  //   .filter((dir) => dir.isDirectory());

  return subFolders;
};

getDirectories("./exercises");
