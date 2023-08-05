import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get nombreValid() {
    return this.registroForm.get('nombre')?.valid;
  }

  get correoValid() {
    return this.registroForm.get('correo')?.valid;
  }

  get passwordValid() {
    return this.registroForm.get('password')?.valid;
  }

  public crearUsuario(): void {
    console.log(this.registroForm.valid);
    console.log(this.registroForm.value);
  }
}
