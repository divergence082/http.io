#! /usr/bin/node


var fs = require('fs');
var path = require('path');
var cp = require('child_process');
var yaa = require('yaa');
var pack = require('./package.json');


/**
 * @namespace
 */
var build = {};


/**
 *
 */
build.run = function() {
  var command = process.argv[2];
  var input = process.argv[3] || build.__DEFAULT_INPUT;
  var output = process.argv[4] || build.__DEFAULT_OUTPUT;
  build.exec(command, input, output);
};


/**
 * @param {string} command
 * @param {string} input
 * @param {string} output
 */
build.exec = function(command, input, output) {
  var task = null;
  var taskName = command.toLowerCase();

  if (taskName === 'lint') {
    task = build.lint(input);
  } else if (taskName === 'check') {
    task = build.check(input);
  } else if (taskName === 'compile') {
    task = build.compile(input, output);
  }

  /**
   * @param {*} result
   */
  function complete(result) {
    build.__exit(taskName, build.__SUCCESS, String(result || ''));
  }

  /**
   * @param {*} error
   */
  function cancel(error) {
    build.__exit(taskName, build.__FAIL, String(error || ''));
  }

  if (task) {
    console.info('[BUILD] "' + taskName + '" IN PROCESS');
    task(complete, cancel);
  } else {
    build.__reportHelp();
  }
};


/**
 * @param {string} inputPath
 * @return {!yaa.Step}
 */
build.lint = function(inputPath) {
  return yaa.sequence([
    yaa.insert(inputPath),
    build.__getPaths,
    build.__lint
  ]);
};


/**
 * @param {string} inputPath
 * @return {!yaa.Step}
 */
build.check = function(inputPath) {
  return yaa.sequence([
    yaa.insert(inputPath),
    build.__getPaths,
    build.__check
  ]);
};


/**
 * @param {string} inputPath
 * @param {string} outputPath
 * @return {!yaa.Step}
 */
build.compile = function(inputPath, outputPath) {
  return yaa.sequence([
    yaa.insert(outputPath),
    build.__clear,
    yaa.insert(inputPath),
    build.__readFile,
    build.__compile(outputPath)
  ]);
};


/**
 * @type {string}
 */
build.__USAGE = [
  'Usage:  build.js TASK [input] [output]',
  '',
  'TASK    task name               [lint|check|compile]',
  'input   path to input file      default="lib/index.js"',
  'output  path to build artifact  default="bin/index.js"'
].join('\n');


/**
 * @type {string}
 */
build.__DEFAULT_INPUT = 'lib/index.js';

/**
 * @type {string}
 */
build.__DEFAULT_OUTPUT = 'bin/index.js';


/**
 * @type {!Object}
 */
build.__CLOSURE_COMPILER_CONFIG = pack['closure-compiler'] || {};


/**
 * @type {!Array.<string>}
 */
build.__CLOSURE_COMPILER_EXTERNS =
    build.__CLOSURE_COMPILER_CONFIG['externs'] || [];


/**
 * @type {string}
 */
build.__CLOSURE_COMPILER_FLAGS =
    build.__CLOSURE_COMPILER_CONFIG['flags'] || [];


/**
 * @type {string}
 */
build.__CLOSURE_COMPILER_PATH =
    build.__CLOSURE_COMPILER_CONFIG['path'] || 'closure-compiler.jar';


/**
 * @type {string}
 */
build.__SUCCESS = 'SUCCEEDED';


/**
 * @type {string}
 */
build.__FAIL = 'FAILED';


/**
 *
 */
build.__reportHelp = function() {
  console.info(build.__USAGE);
  process.exit(1);
};


/**
 * @param {string} task
 * @param {string} status
 * @param {string} result
 */
build.__exit = function(task, status, result) {
  var sep = (result ? '\n' : '');
  console.info(result + sep + '[BUILD] ' + '"' + task + '" ' + status);
  process.exit(status === build.__SUCCESS ? 0 : 1);
};


/**
 * @param {!function(string)} complete
 * @param {!yaa.ErrorHandler} cancel
 * @param {!Array.<string>} paths
 */
build.__lint = function(complete, cancel, paths) {
  var cmd = 'gjslint --strict --custom_jsdoc_tags=namespace ' + paths.join(' ');
  build.__call(complete, cancel, cmd);
};


/**
 * @param {!function(string)} complete
 * @param {!yaa.ErrorHandler} cancel
 * @param {!Array.<string>} paths
 */
build.__check = function(complete, cancel, paths) {
  if (paths.length) {
    var cmd = [
      'java', '-jar', build.__CLOSURE_COMPILER_PATH,
      build.__CLOSURE_COMPILER_FLAGS.join(' '),
      '--js', paths.join(' ')
    ];

    if (build.__CLOSURE_COMPILER_EXTERNS.length) {
      cmd.push('--externs');
      cmd.push(build.__CLOSURE_COMPILER_EXTERNS.join(' '));
    }

    cmd.push('>>');
    cmd.push('/dev/null');

    build.__call(complete, cancel, cmd.join(' '));
  } else {
    complete('Nothing to check');
  }

};


/**
 * @param {string} outputPath
 * @return {!yaa.Step}
 */
build.__compile = function(outputPath) {

  /**
   * @param {!function()} complete
   * @param {!yaa.ErrorHandler} cancel
   * @param {string} inputData
   */
  function compile(complete, cancel, inputData) {
    var result = [];
    var lines = inputData.split('\n');

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];

      if (line.length > 2 && line.slice(0, 2) === '//') {
        var data = String(fs.readFileSync(line.slice(2)));
        result.push(data.trimRight());
      } else {
        result.push(line);
      }
    }

    build.__writeFile(complete, cancel, outputPath, result.join('\n'));
  }


  return compile;
};


/**
 * @param {!function(string)} complete
 * @param {!yaa.ErrorHandler} cancel
 * @param {string} inputPath
 */
build.__readFile = function(complete, cancel, inputPath) {

  /**
   * @param {?Error} error
   * @param {string} data
   */
  function onFileRead(error, data) {
    if (!error) {
      complete(String(data));
    } else {
      cancel(error);
    }
  }

  fs.readFile(inputPath, onFileRead);
};


/**
 * @param {!function()} complete
 * @param {!yaa.ErrorHandler} cancel
 * @param {string} outputPath
 * @param {string} data
 */
build.__writeFile = function(complete, cancel, outputPath, data) {

  /**
   * @param {?Error} error
   */
  function onFileWritten(error) {
    if (!error) {
      complete();
    } else {
      cancel(error);
    }
  }

  fs.writeFile(outputPath, data, onFileWritten);
};


/**
 * @param {!function()} complete
 * @param {!yaa.ErrorHandler} cancel
 * @param {string} outputPath
 */
build.__clear = function(complete, cancel, outputPath) {
  var dirPath = path.dirname(outputPath);
  var cmd = 'rm -rf ' + dirPath + ' && mkdir -p ' + dirPath;

  build.__call(complete, cancel, cmd);
};


/**
 * @param {!function(string)} complete
 * @param {!yaa.ErrorHandler} cancel
 * @param {string} command
 */
build.__call = function(complete, cancel, command) {

  /**
   * @param {?Error} error
   * @param {!Buffer} stdout
   * @param {!Buffer} stderr
   */
  function onExec(error, stdout, stderr) {
    if (error) {
      cancel(error + ' ' + stdout);
    } else {
      complete(String(stdout));
    }
  }

  cp.exec(command, onExec);
};


/**
 * @param {!function(!Array.<string>)} complete
 * @param {!yaa.ErrorHandler} cancel
 * @param {string} inputPath
 */
build.__getPaths = function(complete, cancel, inputPath) {

  /**
   * @param {string} data
   */
  function onFileRead(data) {
    var paths = [];
    var lines = data.split('\n');

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];

      if (line.length > 2 && line.slice(0, 2) === '//') {
        paths.push(line.slice(2).trim());
      }
    }

    complete(paths);
  }

  build.__readFile(onFileRead, cancel, inputPath);
};


build.run();
