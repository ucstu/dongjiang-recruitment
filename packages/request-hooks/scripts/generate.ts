/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { execSync } from "node:child_process";
import fs, { existsSync } from "node:fs";
import { rmdir } from "node:fs/promises";

const json = JSON.parse(fs.readFileSync("openapi.json").toString());

const fix = (json: { [x: string]: any }) => {
  const keys = Object.keys(json);
  if (keys.includes("x-apifox")) {
    json["x-enum-varnames"] = Object.values(
      json["x-apifox"]["enumDescriptions"]
    );
  } else {
    for (const key of keys) {
      if (typeof json[key] === "object") {
        fix(json[key]);
      }
    }
  }
  if (keys.includes("title") && !keys.includes("description")) {
    json["description"] = json["title"];
  }
};

fix(json);

fs.writeFileSync("openapi.json", JSON.stringify(json, null, 2));
execSync("pnpm prettier --write openapi.json");
new Promise(async (resolve) => {
  existsSync("request") && (await rmdir("request", { recursive: true }));
  existsSync("types") && (await rmdir("types", { recursive: true }));
  existsSync("dist") && (await rmdir("dist", { recursive: true }));
  resolve(void 0);
}).then(() => {
  execSync(
    "pnpm openapi -i openapi.json -o request -c axios --name ApiClient --useOptions --exportSchemas true"
  );
  execSync("pnpm prettier --write request");
});
