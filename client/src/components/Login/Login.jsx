import { useState } from "react";
import { getUser, newUser } from "../../controllers/loginControllers";

export default function Login() {
  const [logged, setLogged] = useState(true);
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
  });

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    !logged ? await newUser(user) : await getUser(user);
  }

  return (
    <div className="mt-5 bg-color-form">
      <form className="my-5 container border rounded shadow width-login-device bg-white text-dark">
        <div className="container">
          <h1 className="text-center  mt-5  fst-italic rounded text-success p-2">
            TO-DO APP
          </h1>
        </div>
        <p className="mt-3 mb-4 text-center fs-5">
          {logged ? "Login" : "Sign up"}
        </p>
        <div
          className={`${
            !logged ? "d-block" : "d-none"
          } mt-3 d-flex flex-wrap justify-content-center `}
        >
          <input
            placeholder=" Full name"
            type="text"
            className="d-block w-100 bg-light rounded text-dark border border-secondary"
            name="fullname"
            onChange={(e) => handleChange(e)}
            required
          ></input>
        </div>
        <div className="mt-3 d-flex flex-wrap justify-content-center">
          <input
            placeholder=" Username"
            type="text"
            className="d-block  w-100 bg-light rounded text-dark border border-secondary"
            name="username"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className="mt-3 d-flex flex-wrap justify-content-center">
          <input
            placeholder=" Password"
            type="password"
            className="d-block rounded w-100 bg-light text-dark border border-secondary"
            name="password"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>

        <div className="mt-2 ">
          <p
            className={`${
              !logged
                ? user.fullname.trim().length <= 6
                  ? "p-0 m-0 validators text-center text-danger"
                  : "d-none"
                : "d-none"
            } `}
          >
            Enter full name
          </p>
          <p
            className={`${
              user.username.trim().length <= 6
                ? "p-0 m-0 validators text-center text-danger"
                : "d-none"
            }`}
          >
            Enter username
          </p>
          <p
            className={`${
              user.password.trim().length <= 8
                ? "p-0 m-0 validators text-center text-danger"
                : "d-none"
            }`}
          >
            Enter password
          </p>
        </div>
        <div className="mt-5 d-flex justify-content-center">
          <small className="me-2">
            {!logged ? "I already have an account" : "New to ToDo App?"}
          </small>
          <button
            className="btn text-decoration-underline text-white shadow bg-secondary py-0  "
            onClick={(e) => {
              setLogged(!logged);
              e.preventDefault();
            }}
          >
            {logged ? "Sign up" : "Sign in"}
          </button>
        </div>

        <div className="d-flex justify-content-center my-5">
          <button
            type="submit"
            className="btn btn-dark shadow"
            onClick={(e) => handleSubmit(e)}
            disabled={
              user
                ? user.username.trim().length <= 6 ||
                  user.password.trim().length <= 8 ||
                  (!logged && user.fullname.trim().length <= 6)
                : ""
            }
          >
            {logged ? "Sign in" : "Sign up"}
          </button>
        </div>
      </form>
    </div>
  );
}
