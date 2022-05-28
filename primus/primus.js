const Primus = require('primus');

let go = (server) => {
    let primus = new Primus(server, {});
    primus.on('connection', (spark) => {
        console.log("yoepie");
    })
}

module.exports.go = go; 