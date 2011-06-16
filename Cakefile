fs     = require 'fs'
{exec} = require 'child_process'
util   = require 'util'

# Required for jasmine testing
express = require 'express'

srcCoffeeDir     = 'js'
targetJsDir      = 'build'
coffeeOpts       = " --output #{targetJsDir} --compile #{srcCoffeeDir}"

specFolder       = "spec"
specExtensions   = "coffee"

isVerbose = true
showColors = true

# Files to build 
coffeeFiles = [
    'sub_req'
    'sub_req_gateway'
]


# Actions
runSpecs = ->
  app = express.createServer()

  app.configure 'development', () ->
    app.use(express.static(__dirname))
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))

  util.log "Run tests at http://localhost:2555"
  app.listen(2555)


build = (callback) ->
  exec "coffee #{coffeeOpts}", (err, stdout, stderr) ->
    util.log err if err
    util.log "Compiled coffeescript"
    minify()


minify = (callback) ->
  remaining = coffeeFiles.length
  for file, index in coffeeFiles then do (file, index) ->
    command = "java -jar 'build/tools/google-compiler/compiler.jar'  --compilation_level ADVANCED_OPTIMIZATIONS --js_output_file #{targetJsDir}/#{file}.min.js --js #{targetJsDir}/#{file}.js"
    util.log "Running command: #{command}"
    exec command, (err, stdout, stderr) ->
      throw err if err
      console.log stdout + stderr
      callback?() if --remaining is 0

#
# TASKS
task 'build', 'Build a single javascript file', ->
  build()

task 'minify', 'Minify the javascript', ->
  minify()

task 'test', 'Run the specs', ->
  runSpecs()

