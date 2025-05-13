import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const createUser = async (data) => {
  try {
    if (!data?.username || !data?.password) {
      return {
        status: "WARNING",
        message: "Username and password are required",
      };
    } else {
      const newUser = await prisma.user.create({
        data: {
          username: data && data?.username,
          password: data && data?.password,
        },
      });
      return {
        status: "OK",
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

export const getUserDetail = async (uid) => {
  try {
    if (!uid) {
      return {
        status: "WARNING",
        message: "User ID is required",
      };
    } else {
      let user = await prisma.user.findUnique({
        where: {
          id: uid,
        },
      });
      if (!user) {
        return {
          status: "OK",
          message: "User found",
        };
      } else {
        return {
          status: "OK",
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
    let users = await prisma.user.findMany();
    if (users.length > 0) {
      return {
        status: "OK",
        message: "Find all users successfully",
        data: users,
      };
    } else {
      return {
        status: "OK",
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
    let user = await prisma.user.findUnique({
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
    let updateUser = await prisma.user.update({
      where: {
        id: data?.uid,
      },
      data: {
        username: data?.username,
        password: data?.password,
      },
    });
    if (!updateUser) {
      return {
        status: "WARNING",
        message: "Update user failed, try again",
      };
    }
    return {
      status: "OK",
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
    if (!data?.uid) {
      return {
        status: "WARNING",
        message: "User ID is required",
      };
    }
    let user = await prisma.user.findUnique({
      where: {
        id: data?.uid,
      },
    });
    if (data?.uid === data?.currentUserId) {
      return {
        status: "WARNING",
        message: "You cannot delete yourself",
      };
    }
    if (user) {
      await prisma.user.delete({
        where: {
          id: data?.uid,
        },
      });
      return {
        status: "OK",
        message: "Delete user successfully",
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
