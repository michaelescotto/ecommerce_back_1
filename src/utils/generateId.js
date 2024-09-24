import crypto from "crypto";

const generateId = () => {
  return crypto.randomBytes(12).toString("hex");
};

export default generateId;
