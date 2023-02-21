const cluster = require("cluster");
const http = require("http");
const os = require("os");

const cpus = os.cpus().length;
// console.log("cpu个数:", cpus);
if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行!`);
  // 衍生工作进程
  for (let index = 0; index < cpus; index++) {
    cluster.fork();
  }
} else {
  // 工作进程可以共享任何tcp连接
  // 在这我们共享的是 一个http服务器
  http
    .createServer((req, res) => {
      res.writeHead(200, { "Content-type": "text/html; charset=uft-8" });
      res.write("hello, nodejs!");
      res.end();
    })
    .listen(8000);
  console.log(`工作进程 ${process.pid} 已经启动!`);
}
