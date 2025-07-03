import userRoute from "./userRoute.js";
// import noteRoute from "./noteRoute.js";
let initRoutes = (app) => {
  app.use("/api/vi/users", userRoute);
  // app.use("/api/vi/notes", noteRoute);
};

export default initRoutes;
