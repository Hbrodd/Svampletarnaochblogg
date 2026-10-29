import { Post } from "../model/post";
import { comment } from "../model/comment";

    function init(){
        createPost();
        checkIfLoggedInAndBuildPostForm();
        }
/*
    function buildComments(postId:number):void{
        const commentArray: comment[] = getCommentsFromStorage();
        const section = document.getElementById("`comments-list-${postId}`") as HTMLElement
        const filterdComments = commentArray.filter(c => c.getPostId() === postId)
        filterdComments.forEach(element => {
            let commentElement = document.createElement("article")
            commentElement.id = `comment-${element.getId()}`;
            //Ändra sen så det inte är inneHTML
            commentElement.innerHTML = `
            <h2>${element.getCommentWriter()}</h2>
            <p>${element.getContent()}</p>
        `;
        section.appendChild(commentElement);
        });
    }
*/

/*
    function buildArticels(): void{
        const articlesArray: Post[] = getPostsFromStorage();
        const section = document.getElementById("blog") as HTMLElement
        articlesArray.forEach(element => {
            let postElement = document.createElement("article")
            postElement.id = `post-${element.getId()}`;           
            postElement.innerHTML = `
            <h2>${element.getTitle()}</h2>
            <p>${element.getContent()}</p>
        `;
        section.appendChild(postElement);
        createComment(element.getId());
        buildCommentFormAndSaveComment(element.getId());
        });
    }
*/
    
    function createPost():void{
        const postArray: Post[] = getPostsFromStorage();
        const section = document.getElementById("blog") as HTMLElement
        const userArray = JSON.parse(localStorage.getItem("users") || "[]")
        postArray.forEach(post => {
        const user = userArray.find((user: any) => user.id === post.getUserId());
        const article = document.createElement("article")
        article.id = `post-${post.getId()}`;
        const title = document.createElement("h2")
        title.textContent = post.getTitle();
        const postContent = document.createElement("p")
        postContent.textContent = post.getContent();
        const author = document.createElement("p")
        author.textContent = user ? user.username : "Okänd användare";
        const postCreatedAt = document.createElement("p")
        postCreatedAt.textContent = post.getCreatedAt().toDateString();
        const commentSection = document.createElement("section")
        commentSection.id = `comments-list-${post.getId()}`;
        article.append(title,postContent,author,postCreatedAt,commentSection)
        section.append(article)
        createComment(post.getId());
        buildCommentFormAndSaveComment(post.getId());
        });
    }
    

    function buildCommentFormAndSaveComment(postId:number):void{
        const form = document.createElement("form");

        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.placeholder = "anonymous";

        const textInput = document.createElement("textarea");
        textInput.placeholder = "Skriv in kommentar";
        textInput.required = true;

        const sendButton = document.createElement("button");
        sendButton.type = "submit";
        sendButton.textContent = "Skicka";

        const output = document.createElement("div");

        form.append(titleInput, textInput, sendButton);
    
        const section = document.getElementById(`comments-list-${postId}`);
        if(section){
        section.append(form)
        }

        form.addEventListener("submit", (event) => {
        event.preventDefault();
        const newComment = new comment(getMaxIdComment(),textInput.value,postId,titleInput.value)
        const commentArray = JSON.parse(localStorage.getItem("comments") || "[]");
        commentArray.push(newComment)
        localStorage.setItem("comments",JSON.stringify(commentArray))
        const section = document.getElementById(`comments-list-${postId}`);

        if (section) {
        section.replaceChildren();
        createComment(postId);
        section.append(form);
        }
    });
}

    function createComment(postId: number):void{
        const section = document.getElementById(`comments-list-${postId}`);

        if (!section) {
            return;
        }
        const commentData = getCommentsFromStorage();
        const filterdComments = commentData.filter(newComment => newComment.getPostId() === postId);
        filterdComments.forEach(newComment => {
        const article = document.createElement("article");
        const commentWriter = document.createElement("h2");
        commentWriter.textContent = newComment.getCommentWriter();
        const text = document.createElement("p");
        const createdAt = document.createElement("p")
        createdAt.textContent = newComment.getCreatedAt().toDateString();
        text.textContent = newComment.getContent();
        article.append(commentWriter, text, createdAt);
        section.append(article);
});
    }

    function getPostsFromStorage(): Post[] {
        const rawData = JSON.parse(localStorage.getItem("posts") || "[]");
        return rawData.map((data: any) => {
        const post = new Post(data.id , data.title, data.content, data.userId);
         if (data.createdAt) {
                (post as any).createdAt = new Date(data.createdAt);
            }
            return post;
     });
     }

    function getCommentsFromStorage(): comment[] {
    const rawData = JSON.parse(localStorage.getItem("comments") || "[]");
    return rawData.map((data: any) => {
    const newComment = new comment(data.id, data.content, data.postId, data.commentWriter);
                if (data.createdAt) {
            (newComment as any).createdAt = new Date(data.createdAt);
        }
        return newComment;
    });
}
/*
    function getUserFromStorage(): User[] {
    const rawData = JSON.parse(localStorage.getItem("users") || "[]");
    return rawData.map((data: any) => {
    const user = new User(data.id, data.username);
    return user;
    });
}
*/
    function checkIfLoggedInAndBuildPostForm():void{
        const loggedInUser = sessionStorage.getItem("LoggedIn")
        if(loggedInUser){
        const form = document.createElement("form");

        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.placeholder = "Rubrik";
        titleInput.required = true

        const textInput = document.createElement("textarea");
        textInput.placeholder = "Börja ditt inlägg";
        textInput.required = true;

        const sendButton = document.createElement("button");
        sendButton.type = "submit";
        sendButton.textContent = "Skicka";
        form.append(titleInput, textInput, sendButton);

        const section = document.getElementById("create-post");

        if (section) {
        section.append(form);
        }
    
        form.addEventListener("submit", (event) => {
        event.preventDefault();
        const userId = JSON.parse(loggedInUser);
        const newPost = new Post(getMaxIdPost(),titleInput.value,textInput.value,userId.id)
        const postArray = JSON.parse(localStorage.getItem("posts") || "[]");
        postArray.push(newPost)
        localStorage.setItem("posts",JSON.stringify(postArray))
        const blog = document.getElementById("blog");

            if (blog) {
            blog.replaceChildren();
            createPost();
            }
    });
}
    }

    function getMaxIdPost():number{
        const postData = JSON.parse(localStorage.getItem("posts") || "[]"
    );
         if (postData.length === 0) {
        return 1;
    }
        const maxId = Math.max(...postData.map((post: any) => post.id));
        return maxId + 1;
}
    function getMaxIdComment():number{
        const postData = JSON.parse(localStorage.getItem("comments") || "[]");
        if (postData.length === 0) {
        return 1;
    }
        const maxId = Math.max(...postData.map((comment: any) => comment.id));
        return maxId + 1;
}
init();