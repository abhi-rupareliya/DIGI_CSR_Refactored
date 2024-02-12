exports.router = (app) => {
  require("./auth.routes")(app);
  require("./chart.routes")(app);
  require("./media.routes")(app);
  require("./notification.routes")(app);
  require("./profile.routes")(app);
  require("./rfp.routes")(app);
  require("./review.routes")(app);
};
