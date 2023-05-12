import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
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
export class AddUserDialogComponent {
  // @ts-ignore
  passwordMatchValidator: ValidatorFn = (formGroup: FormGroup) => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
  addUserForm: FormGroup;
  hide: boolean = true;
  addDisabled: boolean = true;
  isAdmin: boolean = false;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddUserDialogComponent>) {
    this.addUserForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

    this.addUserForm.valueChanges.subscribe(() => {
      this.addDisabled = !this.addUserForm.valid;
    });
  }
  addUser() {
    this.dialogRef.close([this.addUserForm.get('username')!.value, this.isAdmin, this.addUserForm.get('password')!.value]);
  }
  onNoClick() {
    this.dialogRef.close();
  }

  toggleAdmin() {
    this.isAdmin = !this.isAdmin;
  }
}
