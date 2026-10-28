import { comment } from "./comment";

export class Post {
    private id: number = 0;
    private title: string;
    private content: string;
    private createdAt: Date;
    private userId: number;
    private comments: comment[] = [];

    constructor(id: number, title: string, content: string, userId: number) {
        this.id = id
        this.title = title;
        this.content = content;
        this.createdAt = new Date();
        this.userId = userId;
    }

    public getId(): number {
        return this.id;
    }
    
    public getTitle(): string {
        return this.title;
    }

    public getContent(): string {
        return this.content;
    }   

    public getUserId(): number {
        return this.userId;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public setContent(content: string): void {
        this.content = content;
    }  
    
    public setUserId(userId: number): void {
        this.userId = userId;
    }
    public setId(id: number): void {
        this.id = id;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }
}