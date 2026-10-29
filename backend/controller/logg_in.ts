import { element } from "prop-types";
import { User } from "../model/user"
import { loginform } from "../model/loginform";

async function init(){    
    const userName = document.getElementById("username") as HTMLInputElement;
    const passWord = document.getElementById("password") as HTMLInputElement;
    const userData:[] = JSON.parse(localStorage.getItem("user") || "[]" );
    const userObjectArray: User[] = userData.map((data: any) => {
        return new User(data.id,data.name,data.password);})
    const createButton = document.getElementById("createButton") as HTMLInputElement || null;
    const loginButton = document.getElementById("logInButton") as HTMLInputElement || null;
        loginButton.addEventListener("click", () => {
            if (logIn(userName.value.toLocaleLowerCase(), passWord.value, userObjectArray) === true){
            console.log("Logga in");}
    })
    createButton.addEventListener("click", () => {
        console.log("Skapa användare");
        if(createUserAndSave(userName.value.toLocaleLowerCase(), passWord.value, userObjectArray) === true){  
        console.log("success")}
        })};
        
    

function createUserAndSave(userName:string, passWord:string, userObjectArray: User[]):boolean{ 
    let newUser: User = new User(getMaxId(), userName, passWord)
    const userExist = userObjectArray.some(element => element.getId() === newUser.getId());
    if(userExist){
        return false}
    userObjectArray.push(newUser)
    localStorage.setItem("user", JSON.stringify(userObjectArray))
    return true
        }

    


function logIn(userName:string, passWord:string,userObjectArray: User[]):boolean{
        let form: loginform = new loginform(userName, passWord)
        userObjectArray.forEach(element => {
            if(element.getUsername() === userName && element.getPassword() === passWord){
                let loggedInUser = JSON.parse(sessionStorage.getItem("loggedIn") || "[]");
                loggedInUser.push(element)
                sessionStorage.setItem("loggedIn", JSON.stringify(loggedInUser))
                return true
            }
        }  
    ); 
return false
}


function getMaxId():number{
        const postData = JSON.parse(localStorage.getItem("user") || "[]");
        if (postData.length === 0) {
        return 1;
    }
        const maxId = Math.max(...postData.map((user: any) => user.id));
        return maxId + 1;
}
init();

