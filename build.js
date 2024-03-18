const $RefParser = require("json-schema-ref-parser");
const yaml = require("js-yaml");
const fs = require("fs")
var uiPath = "./build_dump.js";

const indexYamlPath = './configs/index.yaml'

async function baseYMLFile(file) {
    try {
      const schema = await $RefParser.dereference(file);
      return schema;
    } catch (error) {
      console.error("Error parsing schema:", error);
    }
  }

  baseYMLFile(indexYamlPath).then((res)=>{
    const jsonDump = "let build_spec = " + JSON.stringify(res);
    fs.writeFileSync(uiPath, jsonDump, "utf8");
  })

