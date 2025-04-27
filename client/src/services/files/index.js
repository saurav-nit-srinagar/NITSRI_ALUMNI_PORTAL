import { storage, BUCKET_ID } from "../../config/appwrite";
import { ID } from "appwrite";
import imageCompression from "browser-image-compression";

export const uploadFile = async (files, type = "image") => {
    try {
        const response = await storage.createFile(
            BUCKET_ID,
            ID.unique(),
            files
        );

        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteFile = async (fileId) => {
    try {
        const response = await storage.deleteFile(BUCKET_ID, fileId);
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getImageURL = (fileId) => {
    return storage.getFileView(BUCKET_ID, fileId);
}

export const getDownloadURL = (fileId) => {
    return storage.getFileDownload(BUCKET_ID, fileId);
}

export async function compressedImageUpload(imageFile, maxSizeMB = 0.15, maxWidthOrHeight = 1920, useWebWorker = true) {
    const options = {
        maxSizeMB,
        maxWidthOrHeight,
        useWebWorker,
    }

    try {
        const compressedFile = await imageCompression(imageFile, options);
        const newFile = new File([compressedFile], imageFile.name, { lastModified: new Date(), size: imageFile.size, type: imageFile.type });
        const res = await uploadFile(newFile);
        return res;
    } catch (error) {
        throw new Error(error.message);
    }
}
