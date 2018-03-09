import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { sha256 } from 'js-sha256';
@Component({
  selector: 'app-generate-password',
  templateUrl: './generate-password.component.html',
  styleUrls: ['./generate-password.component.css']
})
export class GeneratePasswordComponent implements OnInit {
  password:string;
  validateForm: FormGroup;
  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
  }

  constructor(private fb: FormBuilder) {
  }


  ngOnInit() {
    this.validateForm = this.fb.group({
      domain         : [ null, [ Validators.required ] ],
      account         : [ null, [ Validators.required ] ],
    });
  }
  genpassword(){
    let arraylist = [this.validateForm.controls['domain'].value,this.validateForm.controls['account'].value]
    arraylist.sort()
    let arrayliststring = arraylist.join('')
    this.password = sha256(arrayliststring).substr(0,16);
  }

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }
}
