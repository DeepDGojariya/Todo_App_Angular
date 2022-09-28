import { Inject, Injectable } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms'
import { AngularFireDatabase,AngularFireList } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  currentUser:any = localStorage.getItem('currentUser')
  constructor(private firebase: AngularFireDatabase) { }
  todoList!: AngularFireList<any>;
  form = new FormGroup({
    $key: new FormControl(null),
    user: new FormControl(this.currentUser),
    title: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required)

  })

  

  getTodos(){
    this.todoList = this.firebase.list('todos')
    
    return this.todoList.snapshotChanges()
  }

  insertTodo(todo){
    console.log(todo)
    this.todoList.push({
      "title":todo.title,
      "description":todo.description,
      "user":todo.user
    })
  }



  populateForm(todo){
    this.form.setValue(todo)
  }

  updateTodo(todo){
    this.todoList.update(todo.$key,{
      title:todo.title,
      description:todo.description
    })
  }

  deleteTodo($key:string){
    this.todoList.remove($key)
  }
}
