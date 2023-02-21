module.exports = (app) => {
  console.log("egg init");
  app.messenger.on("agentAction", (data) => {
    console.log("信息:", data);
  });
};
