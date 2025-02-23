import { uploadImage } from "./cloudinary.util";
export const uploadPlayerImages = async (players: any[], teamID: number) => {
    const uploadedImages = [];
    for (const player of players) {
      const url = await uploadImage(player.playerIdCard, teamID);
      if (!url) {
        throw new Error("Image upload failed.");
      }
      uploadedImages.push(url);
    }
    return uploadedImages;
  };
  

  