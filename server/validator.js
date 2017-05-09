// validate that all is great!
const fs = require('fs-promise');
const execFile = require('child-process-promise').exec;
const flow = require('flow-bin');
const path = require('path');

async function validate (file, line, jsonValue) {
  const content = await fs.readFile(file, 'utf-8');
  const contentLines = content.toString().split('\n');
  const lineContent = contentLines[line - 1];
  console.info(lineContent);
  const type = lineContent.split(':')[1].split(')')[0];
  const generatedContent = `
        (${JSON.stringify(jsonValue, null, 4)} : ${type});
    `;
  const newContent = contentLines.slice(0, line).concat([generatedContent]).concat(contentLines.slice(line)).join('\n');
  const dirname = path.dirname(file);
  const filename = path.basename(file);
  const generatedFileName = path.join(dirname, `flow_validate_${filename}`);
  await fs.writeFile(generatedFileName, newContent);
  await fs.writeFile('/tmp/generated_flow.js', newContent);
  result = null;
  try {
    await execFile(flow);
    result = true;
  } catch (e) {
    result = e.stdout;
  }
  await fs.unlink(generatedFileName);
  return result;
}

module.exports = validate;

// (async function () {
// const result = await validate('./src/routes/Posts/modules/api.js', 13, []);
// console.info(`done: ${result}`);
// })().then(function () {});

