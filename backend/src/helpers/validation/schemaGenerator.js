const path = require("path");
const tjs = require("typescript-json-schema");
const fs = require("fs");

const settings = {
  required: true,
  ref: false,
};
const compilerOptions = {
  strictNullChecks: true,
};

const program = tjs.getProgramFromFiles(
  [path.resolve(__dirname, "schemaDefinition.ts")],
  compilerOptions,
  "./"
);

const schema = tjs.generateSchema(program, "*", settings);
fs.writeFileSync(
  path.resolve(__dirname, "_schema.ts"),
  "const schema = " +
    JSON.stringify(schema) +
    " as const;\nexport default schema.definitions;"
);