import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
    });
  }

  get correoValid() {
    return this.loginForm.get('correo')?.valid;
  }

  get passwordValid() {
    return this.loginForm.get('password')?.valid;
  }

  public loginUsuario(): void {
    if (this.loginForm.invalid) return;

    const { correo, password } = this.loginForm.value;
    this.authService
      .loginUsuario(correo, password)
      .then((credenciales) => {
        console.log(credenciales);
        this.router.navigate(['/']);
      })
      .catch((err) => console.error(err));
  }
}
