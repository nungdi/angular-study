import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-register-hero',
  templateUrl: './register-hero.component.html',
  styleUrls: ['./register-hero.component.scss']
})
export class RegisterHeroComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
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

  register() {
    console.log(this.form.valid);

    if (!this.form.valid) {
      // 유효성 검사
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.controls[key];
        control.markAsTouched({onlySelf: true});
      });
      return;
    }

    // 서버에 등록
    const sendForm = Object.assign({}, this.form.value);
    this.adminService.addHero(sendForm)
      .subscribe(body => console.log(body));
  }
}
