#! /usr/bin/env node

const execSync = require("child_process").execSync;
const fs = require("fs");
const path = require("path");
const readlineSync = require("readline-sync");

const currentDirectory = process.cwd();

const runCommand = (command) => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (e) {
    console.error("Failed to execute command:", command);
    throw e;
  }
  return true;
};

const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.rm(path, { recursive: true, force: true }, (err) => {
      if (err) {
        console.error(`Error while deleting ${path}.`, err);
      } else {
        console.log(`${path} is deleted.`);
      }
    });
  }
};

const repoName = process.argv[2];
// const repoName = readlineSync.question("Enter the name of your new project: ");
const authorName = readlineSync.question("Enter author's name: ");
const authorEmail = readlineSync.question("Enter author's email: ");
const checkoutCommand = `git clone https://github.com/bobytudu/create-themed-vite-app ${repoName}`;
const installCommand = `cd ${repoName} && pnpm install`;

console.log(`Cloning repository with name ${repoName}`);
const checkedOut = runCommand(checkoutCommand);
if (!checkedOut) process.exit(-1);
runCommand("git remote remove origin")

// Edit package.json
const jsonPath = path.join(currentDirectory, `${repoName}/package.json`);
let packageJson = require(jsonPath);
packageJson.name = repoName; // Change the name field
packageJson.author = {
  name: authorName,
  email: authorEmail,
}; // Change the author field
packageJson.version = "0.0.1";
delete packageJson.repository; // Remove the repository field
delete packageJson.bin; // Remove the bin field
fs.writeFileSync(jsonPath, JSON.stringify(packageJson, null, 2)); // Write back to package.json

deleteFolderRecursive(path.join(currentDirectory, repoName, "bin"));
setTimeout(() => {
  runCommand(`cd ${repoName} && git add .`);
  runCommand(
    `cd ${repoName} && git commit -m "Initial commit" && git remote remove origin`
  );
}, 1500);

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installCommand);
if (!installedDeps) process.exit(-1);

console.log("Follow the following commands to start");
console.log(`cd ${repoName} && npm start`);

