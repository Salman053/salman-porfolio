import fg from "fast-glob";
import fs from "fs";
import path from "path";


const SRC_DIR = path.resolve(process.cwd(), "src");

async function findUnusedFiles() {
  
  const files = await fg(["**/*.{ts,tsx,js,jsx}"], {
    cwd: SRC_DIR,
    absolute: true,
  });

  
  const allCode = files.map((f) => fs.readFileSync(f, "utf8")).join("\n");

  
  const unused: string[] = [];

  for (const file of files) {
    const fileName = path.basename(file, path.extname(file));
    const regex = new RegExp(`['"\`].*${fileName}['"\`]`, "g");

    
    if (!allCode.match(regex)) {
      unused.push(path.relative(process.cwd(), file));
    }
  }

  if (unused.length) {
    console.log("⚠️ Unused files found:");
    unused.forEach((f) => console.log(` - ${f}`));
  } else {
    console.log("✅ No unused files found!");
  }
}

findUnusedFiles();
