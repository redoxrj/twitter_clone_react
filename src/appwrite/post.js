import { Client, Databases, Query} from "appwrite";

class PostService{

    constructor(){
        this.client  = new Client()
        .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
        .setProject(import.meta.env.VITE_APPWRITE_PROJECT);  

        this.databases = new Databases(this.client)
        // 2:31:15
    }

    async createPost(slug,{title,content,featuredImage,userId,status}){
        try {
            return await this.databases.createDocument({
            databaseId: import.meta.env.VITE_APPWRITE_DATABASE,
            collectionId: import.meta.env.VITE_APPWRITE_TABLE,
            documentId: slug,
            data: {title,content,featuredImage,userId,status},
});
            
        } catch (error) {
            throw error
            
        }
    }

    async updatePost(slug,{title,content,featuredImage,userId,status}){  // data will now whole object here //gloval logic for update func not insert // slug(id/documemtId of partiular row)
        try {
            return await this.databases.updateDocument({
            databaseId: import.meta.env.VITE_APPWRITE_DATABASE,
            collectionId: import.meta.env.VITE_APPWRITE_TABLE,
            documentId: slug,
            data : {title,content,featuredImage,userId,status}
});
            
        } catch (error) {
            throw error
            
        }

    }

    async deletePost(slug){
        try {
            return await this.databases.deleteDocument({
            databaseId: import.meta.env.VITE_APPWRITE_DATABASE,
            collectionId: import.meta.env.VITE_APPWRITE_TABLE,
            documentId: slug
});
            
        } catch (error) {
            
        }
    }

    async getSinglePost(slug){
        try {
             return await this.databases.getDocument({
            databaseId: import.meta.env.VITE_APPWRITE_DATABASE,
            collectionId: import.meta.env.VITE_APPWRITE_TABLE,
            documentId: slug
});
            
        } catch (error) {
            
        }
    }

    // kisi column/chiz par query/filter ke liye index lgana jrorori hai appwrite me
    async getAllPosts(queries=[Query.equal('status', ['active'])]){ // get all rows of a table(collection) of a db
        try {
             return await this.databases.listDocuments({
            databaseId: import.meta.env.VITE_APPWRITE_DATABASE,
            collectionId: import.meta.env.VITE_APPWRITE_TABLE,
            queries
});
            
        } catch (error) {
            
        }
    }
    async getMyPosts(userId,queries=[Query.equal('userId', [userId])]){
        try {
             return await this.databases.listDocuments({
            databaseId: import.meta.env.VITE_APPWRITE_DATABASE,
            collectionId: import.meta.env.VITE_APPWRITE_TABLE,
            queries
});
            
        } catch (error) {
            
        }
    }

    
}
const postService = new PostService()
export default postService