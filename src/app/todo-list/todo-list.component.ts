import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(public todoService:TodoService) { }
  todoArray:any[]=[]
  showDeletedMessage:boolean=false

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(
      list=>{
        this.todoArray = list.map(item=>{
          return {
            $key:item.key,
            ...item.payload.val()
          }
        })
      }
    )
  }

  onDelete($key){
    if(confirm('Are You Sure?')){
      this.todoService.deleteTodo($key)
      this.showDeletedMessage=true
      setTimeout(()=>this.showDeletedMessage=false,3000)
    }
  }

}
