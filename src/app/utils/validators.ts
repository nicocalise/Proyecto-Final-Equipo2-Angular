import {  FormGroup } from "@angular/forms";

export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export function comparePassword(controlName1: string, controlName2: string) {
  return (formGroup: FormGroup) => {
    const passwordFormControl = formGroup.controls[controlName1];
    const passwordRepeatFormControl = formGroup.controls[controlName2];

    if (passwordRepeatFormControl.errors && !passwordRepeatFormControl.errors?.['mustMatch']) {
      return;
    }

    if (passwordFormControl.value !== passwordRepeatFormControl.value) {
      passwordRepeatFormControl.setErrors({ mustMatch: true });
    } else {
      passwordRepeatFormControl.setErrors(null);
    }
  };
}