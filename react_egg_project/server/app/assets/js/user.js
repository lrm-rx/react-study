// alert("user");

function login() {
  fetch("/user/login", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: "admin",
      pwd: "admin",
    }),
  }).then((res) => {
    location.reload();
  });
}

function logout() {
  fetch("/user/logout", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({}),
  }).then((res) => {
    location.reload();
  });
}
