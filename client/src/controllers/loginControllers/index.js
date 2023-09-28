export function linkToApp() {
  window.location.href = "http://localhost:3000/todoapp";
}

export async function newUser(axios,user) {
  const json = await axios.post("http://localhost:3001/newUser", user);
  if (json.data.created) {
    const username = json.data.newUser.username;
    const id = json.data.newUser.id;
    const userLocal = { username, id };
    setTimeout(linkToApp(), 500);
    window.localStorage.setItem("user", JSON.stringify(userLocal));
  } else {
    alert("Username is not available");
  }
}


export async function getUser(axios,user) {
    const json = await axios.post("http://localhost:3001/getUser", user);
    if (json.data.error) {
      alert(
        "Some of the data does not match, verify the data entered or create an account to start using the application"
      );
    } else {
      const username = json.data.username;
      const id = json.data.id;
      const userLocal = { username, id };
      setTimeout(linkToApp, 500);
      window.localStorage.setItem("user", JSON.stringify(userLocal));
    }
  }