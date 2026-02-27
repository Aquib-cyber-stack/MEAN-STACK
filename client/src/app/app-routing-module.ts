import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Login } from './components/login/login';
import { SignUp } from './components/sign-up/sign-up';
import { AddNewPost } from './components/add-new-post/add-new-post';
import { AllPosts } from './components/all-posts/all-posts';
import { MyPosts } from './components/my-posts/my-posts';
import { AuthGuard } from './guards/auth/auth-guard';
import { NoAuthGuard } from './guards/no-auth/no-auth-guard';

const routes: Routes = [
  {
    path:"",
    component: MainLayout,
    canActivate: [AuthGuard],
    children: [
      { path: "newpost" , component: AddNewPost },
      { path: "" , component: AllPosts },
      { path: "allposts" , component: AllPosts },
      { path: "myposts" , component: MyPosts },
    ]
  },
  {
    path:"",
    component: AuthLayout,
    canActivate: [NoAuthGuard],
    children:[
      { path: "login" , component: Login } , 
      { path: "signup" , component: SignUp }
    ]
  },
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
