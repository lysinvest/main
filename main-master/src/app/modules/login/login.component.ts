import { Component, Injector } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent extends FormComponent {
  public loginError: boolean;
  public passwordError: boolean;
  public emailError: boolean;
  public loginForm: FormGroup;
  constructor(injector: Injector,
    private fb: FormBuilder) {
    super('login', injector);
    this.links = [
      { name: 'Log In', link: 'login' }
    ];
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
    this.passwordError = false;
    this.emailError = false;
    this.loginError = false;
  }

  public initUi() {
    super.initUi()
    this.ui = {
      email: 'Your email',
      password: 'Your password',
      login: 'Login',
      title: 'Login',
      forgot: 'Forgot Password?',
      create: 'Not a member? Sign Up',
      typeEmail: 'Type your email',
      typePassword: 'Type your password',
      loginError: 'Error Connection',
    }
  }

  public onPost() {
    let email: string;
    let password: string;
    this.passwordError = false;
    this.emailError = false;
    this.loginError = false;
    email = this.loginForm.value.email;
    password = this.loginForm.value.password;
    this.passwordError = false;
    this.emailError = false;
    if (email === '') {
      this.emailError = true;
    }
    if (password === '') {
      this.passwordError = true;
    }
    if (!this.passwordError) {
      if (!this.emailError) {
        this.login();
      }
    }
  }

  public login() {
    this.userService.login(this.loginForm.value).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.userService.firstName = res.user.PRENOM;
        this.userService.lastName = res.user.NOM;
        this.userService.email = res.user.EMAIL;
        this.userService.logged = true;
        this.router.navigate(['./dashboard']);
        this.sessionService.getSession().name = 'toto'
        this.sessionService.getSession().email = this.loginForm.value.email;
        this.sessionService.getSession().connected = true;
        this.sendMessage('changeUser');
        this.navigate('dashboard');
      },
      err => {
        this.loginError = true;
      }
    );
  }

};
