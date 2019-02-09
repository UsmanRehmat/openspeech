export class User
{
    email:string;
    name: string;
    password: string;
    gender: string;
    age:number;
    status:string;
    wordcount:number;
    content:string[];
    constructor()
    {
        this.name='';
        this.password='';
        this.email='';
        this.gender='';
        this.status='';
        this.age=0;
        this.wordcount=0;
        this.content=[];
    }
}