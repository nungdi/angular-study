import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-hero',
  templateUrl: './register-hero.component.html',
  styleUrls: ['./register-hero.component.scss']
})
export class RegisterHeroComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
        email: [null, Validators.compose([Validators.required, Validators.email])],
        sex: [null, Validators.required],
        country: [null, Validators.required],
        address: null,
      }
    );
  }

  ngOnInit() {
  }

}
