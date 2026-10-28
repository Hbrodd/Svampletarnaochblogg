import { number } from "prop-types";

export class comment {
    private id: number = 0;
    private content: string;
    private createdAt: Date;
    private postId: number;
    private commentWriter: string;

    constructor(id: number, content: string, postId: number, commentWriter: string,) {
        this.id = id
        this.content = content;
        this.createdAt = new Date();
        this.postId = postId;
        this.commentWriter = commentWriter;
        this.createdAt = new Date();
    }   

    public getId(): number {
        return this.id;
    }

    public getContent(): string {
        return this.content;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public setContent(content: string): void {
        this.content = content;
    }

    public getPostId(): number {
        return this.postId;
    }

    public getCommentWriter(): string {
        return this.commentWriter;
    }
    
    public setId(id: number): void{
        this.id = id;
    }
    public setPostId(id: number):void{
        this.postId = id;
    }
    public setCommentWriter(writer: string): void{
        this.commentWriter = writer;
    }
}