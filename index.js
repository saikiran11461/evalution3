const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/3evalution");
};

const userScheme = new mongoose.Schema(
  {
    first_name: { type: "string", require: true },
    last_name: { type: "string", require: true },
    age: { type: Number, require: true },
    email: { type: "string", require: true },
    profileImage: { type: "string", require: true },
    passowed: { type: "string", require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userScheme);

const bookModelScheme = new mongoose.Schema(
  {
    likes: { type: Number, require: true },
    coverImage: { type: "string", require: true },
    content: { type: "string", require: true },
    comment: { type: "string", require: true },
    user_name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Book = mongoose.model("Book", bookModelScheme);

const publicationScheme = new mongoose.Schema(
  {
    name: { type: "string", require: true },
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Public = mongoose.model("Public", publicationScheme);

const commentScheme = new mongoose.Schema(
  {
    first_name: { type: "string", require: true },
    last_name: { type: "string", require: true },
    age: { type: Number, require: true },
    email: { type: "string", require: true },
    profileImage: { type: "string", require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

app.post(
  "/users",
  body("content")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("first Name sahould be at learst 3"),
  body("password").not().isEmpty(),
  body(comment)
    .not()
    .isEmpty()
    .bail()
    .withMessage("comment cannonet be empty")
    .withMessage("cooment must be ")
    .custom((value) => {
      if (value < 1 || val > 150) {
        throw new Error("age must be betwem 1 to 150");
      }
      return true;
    }),

  body("first_name").custom((value) => {
    if (value && value.length < 3) {
      throw new Error("last name must be more then 3");
    }
    return true;
  }),

  async (req, res) => {
    try {
      console.log(body("content"));
      const error = validationResult(req);
      console.log(error);
      if (!error.isEmpty) {
        return res.status(400).send(error);
      }

      const user = await User.create(req.body);
      return res.status(200).send(user);
    } catch (err) {
      console.error(err.message);
    }
  }
);

app.post(
  "/books",
  body("first_name")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("first Name sahould be at learst 3"),

  body(age)
    .not()
    .isEmpty()
    .bail()
    .withMessage("age cannonet be empty")
    .isNumeric()
    .withMessage("age must be number")
    .custom((value) => {
      if (value < 1 || val > 150) {
        throw new Error("age must be betwem 1 to 150");
      }
      return true;
    }),

  body("first_name").custom((value) => {
    if (value && value.length < 3) {
      throw new Error("last name must be more then 3");
    }
    return true;
  }),

  async (req, res) => {
    try {
      console.log(body("first_name"));
      const error = validationResult(req);
      console.log(error);
      if (!error.isEmpty) {
        return res.status(400).send(error);
      }

      const user = await User.create(req.body);
      return res.status(200).send(user);
    } catch (err) {
      console.error(err.message);
    }
  }
);

app.post(
  "/comment",
  body("content")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("first Name sahould be at learst 3"),

  body(comment)
    .not()
    .isEmpty()
    .bail()
    .withMessage("comment cannonet be empty")
    .withMessage("cooment must be ")
    .custom((value) => {
      if (value < 1 || val > 150) {
        throw new Error("age must be betwem 1 to 150");
      }
      return true;
    }),

  body("first_name").custom((value) => {
    if (value && value.length < 3) {
      throw new Error("last name must be more then 3");
    }
    return true;
  }),

  async (req, res) => {
    try {
      console.log(body("content"));
      const error = validationResult(req);
      console.log(error);
      if (!error.isEmpty) {
        return res.status(400).send(error);
      }

      const user = await User.create(req.body);
      return res.status(200).send(user);
    } catch (err) {
      console.error(err.message);
    }
  }
);

const Comment = mongoose.model("Comment", commentScheme);

app.listen(5000, async () => {
  try {
    await connect();
    console.log("listening on port 5000");
  } catch (err) {
    console.error(err.message);
  }
});
