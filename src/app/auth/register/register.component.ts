import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

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
    if (this.registroForm.invalid) return;

    const { nombre, correo, password } = this.registroForm.value;
    this.authService
      .crearUsuario(correo, password)
      .then((credenciales) => {
        console.log(credenciales);
        this.router.navigate(['/']);
      })
      .catch((err) => console.error(err));
  }
}
