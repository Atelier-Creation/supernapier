import axios from "axios";

const CLOUD_NAME = "dxm28ujz3";
const UPLOAD_PRESET = "unsigned_products";

export const uploadToCloudinary = async (file, folder = "payments") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", folder);

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    formData
  );

  return res.data.secure_url;
};
