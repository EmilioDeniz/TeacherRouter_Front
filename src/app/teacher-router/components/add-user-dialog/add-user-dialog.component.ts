import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

interface User {
  name: string;
  isAdmin: boolean;
}

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {
  addUserForm: FormGroup;
  hide: boolean = true;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddUserDialogComponent>) {
    this.addUserForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      username: '',
      password: '',
      confirmPassword: '',
      isAdmin: false
    });
  }
  addUser() {
    this.dialogRef.close([this.addUserForm.get('username')!.value, this.addUserForm.get('isAdmin')!.value]);
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
