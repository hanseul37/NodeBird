//import fs from "fs";
import fs from "fs/promises";

// (err: NodeJS.ErrnoException | null, data: Buffer) => void
//fs.readFile("package.json", () => {});

fs.readFile("package.json")
  .then((result) => {
    // result는 Buffer 타입입니다.
    console.log(result);
  })
  .catch(console.error);
