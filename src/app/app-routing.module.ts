import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotesComponent } from './components/notes/notes.component';
import { GetArchiveNotesComponent } from './components/get-archive-notes/get-archive-notes.component';
import { GetTrashNotesComponent } from './components/get-trash-notes/get-trash-notes.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path: "register",
    component: RegistrationComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "forgotpassword",
    component: ForgotPasswordComponent
  },
  {
    path: "resetpassword/:token",
    component: ResetPasswordComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {path: "", redirectTo: "notes", pathMatch: "full"},
      {path: "notes", component: NotesComponent},
      {path: "archives", component: GetArchiveNotesComponent},
      {path: "trash", component: GetTrashNotesComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }