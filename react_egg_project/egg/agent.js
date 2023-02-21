module.exports = (agent) => {
  // 使用 messenger 对象来收发消息
  // 并且是在 egg 启动之后才能收发消息
  agent.messenger.on("egg-ready", () => {
    const data = { info: "agent send message!" };
    agent.messenger.sendToApp("agentAction", data);
  });
};
