const $RefParser = require("json-schema-ref-parser");
const yaml = require("js-yaml");
const fs = require("fs");
var uiPath = "./build/build.json";
var yamlOutput = "./build/build.yaml";

const indexYamlPath = "./configs/index.yaml";

async function baseYMLFile(file) {
  try {
    const schema = await $RefParser.dereference(file);
    return schema;
  } catch (error) {
    console.error("Error parsing schema:", error);
  }
}

baseYMLFile(indexYamlPath)
  .then((res) => {
    const jsonDump = JSON.stringify(res);
    fs.writeFileSync(uiPath, jsonDump, "utf8");

    const output = yaml.dump(res);
    fs.writeFileSync(yamlOutput, output, "utf8");
  })
  .catch((err) => {
    console.log(err);
  });
