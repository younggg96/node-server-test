// All route handlers, grouped by purpose
const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  // request comes in -> cookie session(extracts cookie data) -> passport(pulls user id out of cookie data)
  // deserialize User(function we write to turn user id into a user) -> User model instance added to req object as 'req.user'
  // request sent to route handle
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  // logout
  app.get("/api/logout", (req, res) => {
    req.logout();
  })
};
