node.mixin(require("common.js"));

var dirname = node.path.dirname(__filename);
var fixtures = node.path.join(dirname, "fixtures");
var d = node.path.join(fixtures, "dir");

var mkdir_error = false;
var rmdir_error = false;

node.fs.mkdir(d, 0x666).addCallback(function () {
  puts("mkdir okay!");

  node.fs.rmdir(d).addCallback(function () {
    puts("rmdir okay!");

  }).addErrback(function (e) {
    puts("rmdir error: " + e.message);
    rmdir_error = true;
  });

}).addErrback(function (e) {
  puts("mkdir error: " + e.message);
  mkdir_error = true;
});

process.addListener("exit", function () {
  assertFalse(mkdir_error);
  assertFalse(rmdir_error);
  puts("exit");
});
