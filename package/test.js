var path = require("path"),
    pkg = require(path.join(__dirname, '.', 'package.json'));


    console.log(process.argv);
if (process.argv.length < 3) {
    process.stderr.write([ // No dependencies, so we do it from hand.
        "",
        " |_  _ _   _ |_",
        " |_)(_| \\/|_)|_ v"+pkg['version']+" (c) "+pkg['author'],
        "        / |     "
    ].join('\n')+'\n\n'+" Usage: "+path.basename(process.argv[1])+" <input> [rounds|salt]\n");
    process.exit(1);
} 