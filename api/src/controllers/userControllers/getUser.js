import users from "../../utils/users.json" assert { type: "json" };

export const getUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const getUser = users.find(
      (el) => el.username === username && el.password === password
    );

    if (getUser) {
      res.status(200).json({
        error: false,
        username: getUser.username,
        id: getUser.id,
      });
    } else {
      res.status(200).json({
        error: true,
        message: "The user is not registered",
        username: "",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message,
    });
  }
};
