export interface Todo {
   id:string;
   title:string;
   completed: boolean;
   date:Date | string;
   priority:boolean;
}