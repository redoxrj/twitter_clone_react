import { Client, Account, ID } from "appwrite";

class AuthService{
    
    constructor(){  // setting and creating the properties only in constructior func bcoz we want jab is class ka jab object bnaein/call ho tabhi ye ssari properties usmein ho(optimized) // naaki abhi se (not optimized)
        this.client = new Client()
        .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
        .setProject(import.meta.env.VITE_APPWRITE_PROJECT);  

        this.account  = new Account(this.client)
    }

    async createUser({email,password}){ // consider each service method as a separate backend api endpoint
        try {
            // nothing but handling promise here that we get from appwrite after making an request from here /in futue same goes with backend api calling here
            const user = await this.account.create(ID.unique(),email,password)
            return user
            // if(user){ 
            //     return this.loginUser({email,password}) // making user Logged in automatically just after creating/sign up /our custom choice/wish/call
            // }
            // else{
            //     return user
            // }
            
        } catch (error) {
            throw error
            
        }

    }

    async loginUser({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
            
        } catch (error) {
            throw error
            
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
            
        } catch (error) {
            throw error
            
        }
    }

    async logoutUser(){
        try {
            return await this.account.deleteSessions();
            
        } catch (error) {
            throw error
            
        }
    }


}

// direct object bnaake hi export krwa diya taaki baar baar service use krney ke liye new na likhney pdein exported class(AuthService) ke ssath
//Ensures there’s only one shared instance of AuthService across your app.
//When you want a global singleton that manages authentication for your whole app (most common for frontend apps like React, Vue, etc.).
//Because authentication is usually a single, shared concern, you don’t need multiple AuthService objects floating around.Importing one instance everywhere keeps your code clean.

// ✅ But if you’re writing a library, SDK, or backend service where flexibility and multiple instances might be needed, use Version 1 (export the class).
const authService = new AuthService()  //Exporting a Singleton

// export default AuthService; //Version 1 (good for backend)
export default authService;   //Version 2  (good for frontend apps)

// writing AuthService here independent/isoldated coz kal ko agar hmara backend AS A SERVICE change ho jata hai to hme sirf yaha change krna hai settings na ki app ke har component me jake change krna hai. eg - today(appwrite) kal firebase ya our own bckend api's ho skti hai. 
// toh sirf is file mien aake auth service ke primary settings ko change krna pdega naaki compoenents mein jake jha is class ke jha methods ko call kar hein hai(asbtasrcrion conecpt) wha | paylload same rhega internally bas authh.js file mein aake change karna pdega new type of BACEKEND AS A SERVICE ke liye.