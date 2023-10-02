import axios from "axios";
import md5 from "md5";

export function linkToApp() {
  window.location.href = "http://localhost:3000/todoapp";
}

export async function newUser(user) {
  user = {
    ...user,
    password: md5(user.password),
  };

  const json = await axios.post("http://localhost:3001/newUser", user);
  if (json.data.created) {
    const name = json.data.newUser.name;
    const id = json.data.newUser.id;
    const userLocal = { name, id };
    setTimeout(linkToApp(), 500);
    window.localStorage.setItem("user", JSON.stringify(userLocal));
  } else {
    alert("Username is not available");
  }
}

export async function getUser(user) {
  user = {
    ...user,
    password: md5(user.password),
  };

  const json = await axios.post("http://localhost:3001/getUser", user);
  if (json.data.error) {
    alert(
      "Some of the data does not match, verify the data entered or create an account to start using the application"
    );
  } else {
    const name = json.data.name;
    const id = json.data.id;
    const userLocal = { name, id };
    setTimeout(linkToApp, 500);
    window.localStorage.setItem("user", JSON.stringify(userLocal));
  }
}
