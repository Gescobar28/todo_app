import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [logged, setLogged] = useState(true);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  function linkToApp() {
    window.location.href = "http://localhost:3000/todoapp";
  }

  async function newUser() {
    const json = await axios.post("http://localhost:3001/newUser", user);
    if (json.data.created) {
      const username = json.data.newUser.username;
      const id = json.data.newUser.id;
      const userLocal = { username, id };
      setTimeout(linkToApp, 500);
      window.localStorage.setItem("user", JSON.stringify(userLocal));
    } else {
      alert("Username is not available");
    }
  }

  async function getUser() {
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

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    // setUser({
    //   ...user,
    //   password: md5(user.password),
    // });
    e.preventDefault();
      !logged ? await newUser() : await getUser();
  }

  return (
    <div className="mt-5">
      <form className="my-5 container border rounded w-25 shadow">
        <h1 className="mt-5 text-center">{logged ? "Login" : "Sign up"}</h1>
        <div className="mt-5">
          <label className="fs-5">Username:</label>
          <input
            type="text"
            className="d-block rounded w-100"
            name="username"
            required
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className="mt-3">
          <label className="fs-5">Password:</label>
          <input
            type="password"
            className="d-block rounded w-100"
            name="password"
            required
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <small className="text-secondary my-5">
          {!logged ? "I already have an account" : "New to ToDo App?"}
        </small>
        <button
          className="btn text-decoration-underline text-primary py-0"
          onClick={(e) => {
            setLogged(!logged);
            e.preventDefault();
          }}
        >
          {logged ? "Sign up" : "Sign in"}
        </button>
        <div className="d-flex justify-content-center my-5">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => handleSubmit(e)}
            disabled={user ? user.username.length <= 6 || user.password.length <= 8 : ""}
          >
            {logged ? "Sign in" : "Sign up"}
          </button>
        </div>
      </form>
    </div>
  );
}
