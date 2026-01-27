import fg from "fast-glob";
import fs from "fs";
import path from "path";

// Adjust based on your Next.js project structure
const SRC_DIR = path.resolve(process.cwd(), "src");

async function findUnusedFiles() {
  // Get all source files
  const files = await fg(["**/*.{ts,tsx,js,jsx}"], {
    cwd: SRC_DIR,
    absolute: true,
  });

  // Get all file contents to check for imports
  const allCode = files.map((f) => fs.readFileSync(f, "utf8")).join("\n");

  // Track unused files
  const unused: string[] = [];

  for (const file of files) {
    const fileName = path.basename(file, path.extname(file));
    const regex = new RegExp(`['"\`].*${fileName}['"\`]`, "g");

    // If file name never imported → unused
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
