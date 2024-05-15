import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  aulaSeleccionada: string = "";
  constructor(public route: ActivatedRoute, public router: Router, private afAuth : AngularFireAuth) {}

  seleccionarAula(aula : string){
    this.aulaSeleccionada = aula;


    if(this.aulaSeleccionada!= ""){
      const navigationExtras: NavigationExtras = {
        queryParams: { dato: this.aulaSeleccionada }
      };

      this.router.navigate(['/sala'], navigationExtras);
    }
    }

    async cerrarSesion() {
      // Reproducir el audio
      let audio = new Audio("../../assets/audios/cierre-sesion.mp3");
      audio.play();
    
      // Esperar 1500ms antes de continuar
      await this.delay(1500);
    
      // Cerrar la sesión y redirigir al usuario a la página de inicio de sesión
      await this.afAuth.signOut();
      this.router.navigateByUrl('login');
    }

    delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }

