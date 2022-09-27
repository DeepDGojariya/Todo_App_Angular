import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(public todoService: TodoService,private authService:AuthService) { }
  submitted:boolean | undefined
  showSuccessMessage:boolean | undefined
  formControls= this.todoService.form.controls
  currentUser:any
  ngOnInit(): void {
    // this.authService.getCurrentUser()
    // this.currentUser = localStorage.getItem('currentUser')
    
  }

  

  onSubmit(){
    
    this.submitted=true
    if(this.todoService.form.valid){
      // console.log(this.todoService.form.get('$key'))
      if(this.todoService.form.get('$key')?.value===null){
        console.log("if")
        this.todoService.insertTodo(this.todoService.form.value)
      }
      else{
        console.log("else")
        this.todoService.updateTodo(this.todoService.form.value)
      }
      this.showSuccessMessage = true
      setTimeout(()=>this.showSuccessMessage=false,3000)
      this.submitted=false
      this.todoService.form.reset();
      //this is to be done for proper reset operation
      this.todoService.form.setValue({
        $key: null,
        title: '',
        description: '',
        
      })
    }
  }

  logout(){
    this.authService.signout()
  }

}
