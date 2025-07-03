import * as userService from "../services/userService.js";
export const createUser = async (req, res) => {
  try {
    let response = await userService.createUser(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log("Error from server: ", err);

    res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    let response = await userService.loginUser(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log("Error from server: ", err);

    res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

export const getUserDetail = async (req, res) => {
  try {
    console.log(req.headers.uid);

    let response = await userService.getUserDetail(req.headers);
    return res.status(200).json(response);
  } catch (err) {
    console.log("Error from server: ", err);

    res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    let response = await userService.getAllUsers();
    return res.status(200).json(response);
  } catch (err) {
    console.log("Error from server: ", err);
    return {
      status: "ERROR",
      message: "Error from server...",
    };
  }
};

export const updateUser = async (req, res) => {
  try {
    let response = await userService.updateUser(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log("Error from server: ", err);
    return {
      status: "ERROR",
      message: "Error from server...",
    };
  }
};

export const deleteUserById = async (req, res) => {
  try {
    let response = await userService.deleteUserById(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log("Error from server: ", err);
    return {
      status: "ERROR",
      message: "Error from server...",
    };
  }
};

export const changeUserRole = async (req, res) => {
  try {
    console.log(req.body);

    let response = await userService.changeUserRole(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log("Error from server: ", err);
    return {
      status: "ERROR",
      message: "Error from server...",
    };
  }
};

export const deleteRefreshToken = async (req, res) => {
  try {
    let response = await userService.deleteRefreshToken(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log("Error from server: ", err);
    return {
      status: "ERROR",
      message: "Error from server...",
    };
  }
};
