const socket_io_client = require("socket.io-client");

const socket = socket_io_client("http://localhost:3000");

socket.on("connect", () => {
    console.log(`ubee-sweet: connected`, socket.id);

    socket.emit("watch:login", "abc123", "my-app", result => {
        console.log(result);
    });
});

socket.on("ambient:state", (token, ambient, code, protocol) => {
    console.log(token.slice(0, 8), ambient, code, protocol);
    if (code === "ping") {
        console.log("ping", code);
        socket.emit("ambient:state", token, "pong");
    }

    if (code === "query") {
        // todo query
        socket.emit("ambient:state", token, "query:result", ["a", "b", "c"]);
    }
});