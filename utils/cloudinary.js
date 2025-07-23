import { unlinkSync } from "fs";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: "dt2lhechn",
  api_key: "242838256114175",
  api_secret: "I6W-rU3gSh4rOAy62ApP1Z4sW3g",
});



export const uploadToCloudinary = async (input) => {
  try {
    if (!input) return null;

    let result;

    if (input.startsWith("http://") || input.startsWith("https://")) {
      // Handle remote URL upload (for .glb or image)
      result = await cloudinary.uploader.upload(input, {
        resource_type: "auto",
      });
    } else {
      // Handle local file upload
      result = await cloudinary.uploader.upload(input, {
        resource_type: "auto",
      });
      unlinkSync(input); // delete local file after upload
    }

    return result;
  } catch (error) {
    console.error("Upload error:", error.message);
    // Delete local file if upload fails
    if (!input.startsWith("http")) {
      try { unlinkSync(input); } catch (e) {}
    }
    return { message: "Fail" };
  }
};


export const deleteFromCloudinary = async (public_id) => {
  try {
    if (!public_id) return null;

    const response = await cloudinary.uploader.destroy(public_id, {
      resource_type: "image",
    });

    return response;
  } catch (error) {
    console.log("Cloudinary delete error: ", error.message);
    return { message: "Delete Failed" };
  }
};
