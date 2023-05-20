import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent {
  // @ts-ignore
  passwordMatchValidator: ValidatorFn = (formGroup: FormGroup) => {
    const password = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmNewPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
  changePasswordForm: FormGroup;
  hide: boolean = true;
  saveDisabled: boolean = true;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ChangePasswordDialogComponent>) {
    this.changePasswordForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

    this.changePasswordForm.valueChanges.subscribe(() => {
      this.saveDisabled = !this.changePasswordForm.valid;
    });
  }

  onNoClick(): void {
    // Cerrar el diálogo sin guardar los cambios
    this.dialogRef.close();
  }
}
