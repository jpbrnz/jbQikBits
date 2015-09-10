var nw = require("nw.gui");
var win = nw.Window.get();
var nativeMenuBar = new nw.Menu({ type: "menubar" });
nativeMenuBar.createMacBuiltin("jbQikBits");
win.menu = nativeMenuBar;
