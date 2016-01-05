// here we define the files to be test

var context = require.context('./src', true, /-test\.js$/);
context.keys().forEach(context);
