import db from "../models/index.js";
import { generalAccessToken, refreshToken } from "./tokenService.js";
export const createUser = async (data) => {
  try {
    if (!data?.email || !data?.password || !data?.displayName) {
      return {
        status: "WARNING",
        message: "Missing parameters...",
      };
    } else {
      const existUser = await db.User.findOne({
        where: { email: data?.email },
      });
      if (existUser) {
        return {
          status: "WARNING",
          message: "Email already exists",
        };
      }
      const newUser = await db.User.create({
        email: data && data?.email,
        displayName: data && data?.displayName,
        password: data && data?.password,
      });
      return {
        status: "SUCCESS",
        message: "User created successfully",
        data: newUser,
      };
    }
  } catch (err) {
    console.log("Error from server: ", err);
    return {
      status: "ERROR",
      message: "Error from server...",
    };
  }
};

export const loginUser = async (data) => {
  try {
    if (!data?.email || !data?.password) {
      return {
        status: "WARNING",
        message: "Missing parameters...",
      };
    }
    let existUser = await db.User.findOne({
      where: {
        email: data?.email,
      },
    });
    if (!existUser) {
      return {
        status: "WARNING",
        message: "User not found",
      };
    }
    if (existUser.password !== data?.password) {
      return {
        status: "WARNING",
        message: "Incorrect password",
      };
    }
    const access_token = await generalAccessToken({
      uid: existUser.id,
      email: existUser.email,
      displayName: existUser.displayName,
      role: existUser.role,
    });
    const refresh_token = await refreshToken({
      uid: existUser.id,
      email: existUser.email,
      displayName: existUser.displayName,
      role: existUser.role,
    });

    return {
      status: "SUCCESS",
      message: "Login successfully",
      access_token,
      refresh_token,
    };
  } catch (err) {
    console.log("Error from server: ", err);
    return {
      status: "ERROR",
      message: "Error from server...",
    };
  }
};

export const getUserDetail = async (data) => {
  try {
    if (!data.uid || !data.email) {
      return {
        status: "WARNING",
        message: "MIssing parameters...",
      };
    } else {
      let user = await db.User.findOne({
        where: {
          id: data.uid,
          email: data.email,
        },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });
      if (!user) {
        return {
          status: "SUCCESS",
          message: "User found",
        };
      } else {
        return {
          status: "SUCCESS",
          message: "Find user successfully",
          data: user,
        };
      }
    }
  } catch (err) {
    console.log("Error from server: ", err);

    return {
      status: "ERROR",
      message: "Error from server...",
    };
  }
};

export const getAllUsers = async () => {
  try {
    let users = await db.User.findAll();
    if (users.length > 0) {
      return {
        status: "SUCCESS",
        message: "Find all users successfully",
        data: users,
      };
    } else {
      return {
        status: "SUCCESS",
        message: "No users found",
      };
    }
  } catch (err) {
    console.log("Error from server: ", err);
    return {
      status: "ERROR",
      message: "Error from server...",
    };
  }
};

export const updateUser = async (data) => {
  try {
    if (!data?.uid) {
      return {
        status: "WARNING",
        message: "User ID is required",
      };
    }
    let user = await db.User.findOne({
      where: {
        id: data?.uid,
        email: data?.email,
      },
    });
    if (!user) {
      return {
        status: "WARNING",
        message: "User not found",
      };
    }
    // Update user in the database
    user.displayName = data?.displayName || user.displayName;
    user.password = data?.password || user.password;
    await user.save();

    return {
      status: "SUCCESS",
      message: "Update user successfully",
    };
  } catch (err) {
    console.log("Error from server: ", err);
    return {
      status: "ERROR",
      message: "Error from server...",
    };
  }
};

export const deleteUserById = async (data) => {
  try {
    if (!data?.uid || !data?.uEmail) {
      return {
        status: "WARNING",
        message: "User ID is required",
      };
    }
    if (
      data?.uid === data?.currentUserId ||
      data.uEmail === data?.currentUserEmail
    ) {
      return {
        status: "WARNING",
        message: "You cannot delete yourself",
      };
    }
    // find user by ID and email
    let user = await db.User.findOne({
      where: {
        id: data?.uid,
        email: data?.uEmail,
      },
    });

    if (!user) {
      return {
        status: "WARNING",
        message: "User not found",
      };
    }

    if (data?.currentRole === user.role) {
      return {
        status: "WARNING",
        message: "You cannot delete user with the same role",
      };
    }
    if (data.currentRole === "SUPERADMIN") {
      await db.User.destroy({
        where: {
          id: data?.uid,
        },
      });
      return {
        status: "SUCCESS",
        message: "Delete user successfully",
      };
    }
    await db.User.destroy({
      where: {
        id: data?.uid,
      },
    });
    return {
      status: "SUCCESS",
      message: "Delete user successfully",
    };
  } catch (err) {
    console.log("Error from server: ", err);
    return {
      status: "ERROR",
      message: "Error from server...",
    };
  }
};

export const changeUserRole = async (data) => {
  try {
    if (!data.uid || !data.uRole) {
      return {
        status: "WARNING",
        message: "Missing parameters...",
      };
    }
    if (!data.adId || !data.adRole) {
      return {
        status: "WARNING",
        message: "Admin ID and role are required",
      };
    }
    if (data.adRole !== "SUPERADMIN") {
      return {
        status: "WARNING",
        message: "You do not have permission to change user role",
      };
    }
    if (data.uRole === "SUPERADMIN") {
      return {
        status: "WARNING",
        message: "You cannot change user role to SUPERADMIN",
      };
    }
    let changeUserRole = await db.User.update({
      where: {
        id: data.uid,
      },
      data: {
        role: data.changeRole,
      },
    });
    return {
      status: "SUCCESS",
      message: "Change user role successfully",
      data: changeUserRole,
    };
  } catch (err) {
    console.log("Error from server: ", err);
    return {
      status: "ERROR",
      message: "Error from server...",
    };
  }
};

export const deleteRefreshToken = async (data) => {
  try {
    if (!data?.uid) {
      return {
        status: "WARNING",
        message: "User ID is required",
      };
    }
    let user = await db.User.findUnique({
      where: {
        id: data?.uid,
      },
    });
    if (!user) {
      return {
        status: "WARNING",
        message: "User not found",
      };
    }
    await prisma.refreshToken.deleteMany({
      where: {
        userId: data?.uid,
      },
    });
    return {
      status: "SUCCESS",
      message: "Delete refresh token successfully",
    };
  } catch (err) {
    console.log("Error from server: ", err);
    return {
      status: "ERROR",
      message: "Error from server...",
    };
  }
};
