import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeToken = async( token :string) =>{
    try{
        await AsyncStorage.setItem("role",token);
        console.log("token saved")
    }catch(err){
        console.error('error saving token',err)
    }
}


export const getToken = async (role:string):Promise<string |null> =>{
    try{
        const token = await AsyncStorage.getItem(role);
        console.log("Token retrieved")
        return token;
    }catch(err){
        console.error("Error retrieving token",err)
    }
    return null
}