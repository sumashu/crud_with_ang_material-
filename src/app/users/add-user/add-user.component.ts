import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
   addUserForm:FormGroup = new FormGroup({});
  constructor(private formbuild:FormBuilder , private Userserv:UserService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.addUserForm = this.formbuild.group({
      'username':new FormControl('',[Validators.required,Validators.minLength(3)]),
      'email':new FormControl('',[Validators.required,Validators.email]),
      'phone':new FormControl('',[Validators.required,Validators.maxLength(10)]),

    })
  }

  createUser()
  {
    //console.log(this.addUserForm.value)
    this.Userserv.addUser(this.addUserForm.value).subscribe(data=>{
      this._snackBar.open("user is created successfullly");
    },err=>{
      this._snackBar.open("user is not crated");
    })
  } 

}
