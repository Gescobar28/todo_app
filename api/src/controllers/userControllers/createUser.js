import users from "../../utils/users.json" assert { type: "json" };
import fsPromises from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "/src/utils/users.json");

export const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    let lastId = !users[0] ? 0 : users.at(-1).id;
    const userInDatabase = users.find((el) => el.username === username);
    
    if (!userInDatabase) {
      const newUser = {
        id: lastId === 0 ? 1 : lastId + 1,
        username,
        password,
      };

      users.push(newUser);

      const updateUsers = JSON.stringify(users);

      await fsPromises.writeFile(dataFilePath, updateUsers);

      res.status(200).json({
        created: true,
        message: "The user has been created succesfully",
        newUser,
      });
    } else {
      res.status(200).json({
        created: false,
        message: "The username already exists",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
