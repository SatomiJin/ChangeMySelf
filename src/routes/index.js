import userRoute from "./userRoute.js";
let initRoutes = (app) => {
  app.use("/api/vi/users", userRoute);
};

export default initRoutes;
