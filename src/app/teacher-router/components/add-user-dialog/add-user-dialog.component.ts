import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent {
  addUserForm: FormGroup;
  hide: boolean = true;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddUserDialogComponent>) {
    this.addUserForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  addUser() {

  }
}
