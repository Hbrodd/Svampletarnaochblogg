export class User {
   private id: number = 0;
   private username: string;
   private password: string;
   private createdAt: Date;

   constructor(id: number, username: string, password: string) {
      this.username = username;
      this.password = password;
      this.createdAt = new Date();
   }

    public getId(): number {
         return this.id;
    }

    public getUsername(): string {
         return this.username;
    }

    public getPassword(): string {
         return this.password;
    }   
    
    public setName(username: string): void {
         this.username = username;
    }

    public setPassword(password: string): void {
         this.password = password;
    }

    public setId(id: number): void{
        this.id = id;
    }
    public getCreatedAt(): Date {
     return this.createdAt;
    }
}