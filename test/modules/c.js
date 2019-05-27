const stateFile = `${__dirname}/state.json`;
const state = JSON.parse(require("fs").readFileSync(stateFile).toString());
state.c++;
require("fs").writeFileSync(stateFile, JSON.stringify(state), "utf8")
module.exports = state.c;