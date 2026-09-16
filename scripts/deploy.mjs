// Сборка статики с basePath и публикация папки out/ в ветку gh-pages.
// Запуск: npm run deploy
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const repo = process.env.REPO_NAME || "ekb-evakuator";
const env = { ...process.env, NEXT_PUBLIC_BASE_PATH: `/${repo}` };

execSync("npx next build", { stdio: "inherit", env });
writeFileSync("out/.nojekyll", "");
execSync("npx gh-pages -d out -t -m \"deploy: site\"", { stdio: "inherit" });
console.log(`\nОпубликовано: https://goodrojh.github.io/${repo}/`);
