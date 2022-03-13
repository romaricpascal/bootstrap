/* eslint-env node */

const path = require('path');

require.extensions['.scss'] = function (module, filename) {

  const sassTruePath = path.relative(path.dirname(filename), process.cwd()) + '/node_modules/sass-true';

  return module._compile(`
var sassTrue = require('sass-true');
var fs = require('fs');
var path = require('path');
var filename = '${filename}';
var data = fs.readFileSync(filename, {encoding: 'utf-8'});
var TRUE_SETUP = "$true-terminal-output: false; @import '${sassTruePath}';";
try {
  sassTrue.runSass({
    data: TRUE_SETUP + data,
    includePaths: [path.dirname(filename)],
    sass: require('sass')}, {describe, it});
} catch (e) {
  throw new Error(\`Test error\n\${e.formatted}\`);
};
    `, filename)
}
