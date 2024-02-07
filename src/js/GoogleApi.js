import { google } from 'googleapis';
import { createReadStream } from 'fs';
import { googleAPI } from './Variables.js';

export const setGoogleCredentials = () => {

    const auth2 = new google.auth.OAuth2(
        googleAPI.clientId,
        googleAPI.clientSecret,
        googleAPI.redirectUri
    )
    
    auth2.setCredentials({refresh_token: googleAPI.refreshToken});
    
    const drive = google.drive({
        version: 'v3',
        auth: auth2 
    })

    return drive;
}

export const uploadFile = async (filename, mimetype, filepath) => {
    //takes in an image-location = String(filepath) to upload file.
    try {
        const response = await drive.files.create({
            requestBody: {
                name: filename,
                mimeType: mimetype
            },
            media: {
                body: createReadStream(filepath),
                mimeType: mimetype
            }
        })
        console.log(response.data);
        return response.data;
    }
    catch(error) {
        console.error(error.message);
    }
}

const deleteFile = async (file) => {
    //takes in an image id from google = String(file) to delete file.
    try {
        const response = await drive.files.delete({
            fileId: file,
        })
        console.log(response.data);
        return response.data;
    }
    catch(error) {
        console.error(error.message);
    }
}

const generatePublicUrl = async (imageId) => {
    try {
        //first edit permission for file in google drive into public
        const create = await drive.permissions.create({
            fileId: imageId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })
        //then create a URI 
        if (create) {
            try {
                const result = await drive.files.get({
                    fileId: imageId,
                    fields: 'webViewLink, webContentLink'
                })
                console.log(result.data);
                return result.data;
            }
            catch(error) {
                console.error(error.message);
            }
        }   
    }
    catch(error) {
        console.error(error.message);
    }
}

export default {setGoogleCredentials, uploadFile, deleteFile, generatePublicUrl}