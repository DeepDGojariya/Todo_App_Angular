import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth:AngularFireAuth,private router:Router) { }

  login(email:string,password:string){
    this.fireauth.signInWithEmailAndPassword(email,password).then(()=>{
      localStorage.setItem('token','true')
      this.getCurrentUser()
      this.router.navigate(['/todo'])
      // setTimeout(()=>{window.location.reload()},1000)
      
    },(err)=>{
      alert('Something Went Wrong')
      console.log(err)
      this.router.navigate(['/login'])
    })
  }

  register(email:string,password:string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then(()=>{
      localStorage.setItem('token','true')
      this.router.navigate(['/todo'])
      // setTimeout(()=>{window.location.reload()},1000)
    },(err)=>{
      alert('Something Went Wrong')
      console.log(err)
      this.router.navigate(['/register'])
    })
  }

  signout(){
    this.fireauth.signOut().then(()=>{
      localStorage.setItem('token','false')
      localStorage.setItem('currentUser','')
      this.router.navigate(['/login'])
      // setTimeout(()=>{window.location.reload()},1000)
    },(err)=>{
      alert('Something Went Wrong')
      console.log(err)
      this.router.navigate(['/todo'])
    })
  }

  getCurrentUser(){
    this.fireauth.authState.subscribe((user:any)=>{localStorage.setItem('currentUser',user.email)})
  }
}
