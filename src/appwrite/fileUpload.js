import { Client, Storage,ID } from "appwrite";

class FileUploadService {

    constructor(){
            this.client  = new Client()
            .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
            .setProject(import.meta.env.VITE_APPWRITE_PROJECT);  
    
            this.storage  = new Storage(this.client)
    
        }

     async uploadFile(file){ // string /binary file /file input
        try {
            return  await this.storage.createFile({
            bucketId: import.meta.env.VITE_APPWRITE_BUCKET,
            fileId: ID.unique(),
            file,
});
            
        } catch (error) {
            throw new Error(error.message) // to hide stack trace which could be sensitive. //You don’t want to expose database internals to the client://
            //(e.g., not leaking DB/internal errors in an API response).
            
        }
     }
     
    previewFile(fileId){ 
        try {
            return this.storage.getFileView({
            bucketId: import.meta.env.VITE_APPWRITE_BUCKET,
            fileId: fileId
});
            
        } catch (error) {
            throw error
            
        }
     }
     async deleteFile(fileId){ 
        try {
            return  await this.storage.deleteFile({
            bucketId: import.meta.env.VITE_APPWRITE_BUCKET,
            fileId: fileId
});
            
        } catch (error) {
            throw error
            
        }
     }



}

const fileUploadService = new FileUploadService() // again exporting singlton // globaly shrared one FileUploadService class insatnce

export default fileUploadService