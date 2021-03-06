require("dotenv").config();
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const favicon = require("serve-favicon");
const flash = require("connect-flash");
const hbs = require("hbs");
const logger = require("morgan");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const path = require("path");
const ensureLogin = require("connect-ensure-login");

const Schema = mongoose.Schema;

const User = require("./models/user");
const Connection = require("./models/connection");
const Meet = require("./models/meet");

mongoose.Promise = Promise;
mongoose.connect(
    'mongodb://localhost:27017/test', {useNewUrlParser: true,  useUnifiedTopology: true }
  )
  .then(x => {
    console.log(`Connected to Mongo!: Database Name "${x.connections[0].name}"`);
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

app.use(
  session({
    secret: "our-passport-local-strategy-app",
    resave: true,
    saveUninitialized: true
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

app.use(flash());

//omg partials
hbs.registerPartials(__dirname + "/views/partials");
// default value for title local
app.locals.title = "OurSessions";

// //trying to figure out how time works in js in browser seems like t
//this script would create a date that starts when server starts and doesn't change (in layout
//from just clicking around the site....)
// app.locals.time = new Date();

//passport stuff

passport.use(
  new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: "Incorrect username" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
      }

      return next(null, user);
    });
  })
);

app.use(passport.initialize());
app.use(passport.session());

// adding routes: put them here
const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/authRoutes");
app.use("", authRoutes);

const meetRoutes = require("./routes/meetRoutes");
app.use("/", meetRoutes);

const accountRoutes = require("./routes/accountRoutes");
app.use("/", accountRoutes);

const connectionRoutes = require("./routes/connectionRoutes");
app.use("/", connectionRoutes);

module.exports = app;
