#!/usr/bin/env node
'use strict';

var chalk;
var width = 63;
var indent;

function pad(len, char) {
	return (new Array(len)).join(char);
}

function text(text, color) {
	var textLength = chalk.stripColor(text).length;
	if (color) {
		text = chalk[color](text);
	}
	return indent + text + pad(width - (textLength + 5), ' ') + chalk.gray('│');
}

require('fallback-cli')('ava/cli.js', function (opts) {
	if (!opts.localCli) {
		chalk = require('chalk');

		indent = chalk.gray('│   ');

		var blankLine = chalk.gray('│' + pad(width - 2, ' ') + '│');

		console.error(
			[
				chalk.gray('┌' + pad(width - 2, '─') + '┐'),
				text('ERROR: No local ' + chalk.bold('AVA') + ' installation found.', 'red'),
				blankLine,
				text('Run the following command in your project directory:', 'gray'),
				blankLine,
				text('   npm install --save-dev ava', 'blue'),
				chalk.gray('└' + pad(width - 2, '─') + '┘')
			].join('\n')
		);

		return process.exit(1);
	}
	require(opts.localCli);
});
