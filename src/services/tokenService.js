import jwt from "jsonwebtoken";
export const generalAccessToken = async (data) => {
  const access_token = jwt.sign(
    {
      ...data,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
  return access_token;
};

export const refreshToken = async (data) => {
  const refresh_token = jwt.sign(
    {
      ...data,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
  return refresh_token;
};
