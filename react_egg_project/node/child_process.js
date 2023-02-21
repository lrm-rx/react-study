const { exec, spawn } = require("child_process");
// mkdir 创建文件夹
// type 读取文件内容
// exec("type a.txt", (error, stdout, stderr) => {
//   if (error) {
//     console.error("出错啦!");
//     return;
//   }
//   console.log(`stderr: ${stderr}`);
//   console.log(`stdout: ${stdout}`);
// });

const spawnObj = spawn("ping", ["127.0.0.1"], { encoding: "utf-8" });
spawnObj.stdout.on("data", function (chunk) {
  console.log(chunk.toString());
});
spawnObj.stderr.on("data", (data) => {
  console.log(data);
});
spawnObj.on("close", (code) => {
  console.log("close code : " + code);
});
spawnObj.on("exit", (code) => {
  console.log("exit code : " + code);
});
