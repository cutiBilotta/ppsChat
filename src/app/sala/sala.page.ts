import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sala',
  templateUrl: './sala.page.html',
  styleUrls: ['./sala.page.scss'],
})
export class SalaPage implements OnInit {

  @ViewChild('contenedorDeMensajes') contenedorDeMensajes!: ElementRef;
 
  usuarioLogeado: any;
  nuevoMensaje: string = "";
  mensajes: any[] = [];
  email: any = "";
  info: string = "";
  mostrarChat = false;
  usuarioLogeadoBool : boolean = true;
  aula: string="";


  constructor(private authService: AuthService,private firestore: AngularFirestore, public router:ActivatedRoute) {}
 
  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.aula = params['dato'];
    });

    console.log(this.aula);
    this.authService.getUserLogged().subscribe(usuario => {
      this.usuarioLogeado = usuario;
    });

 
    // Suscripción a los cambios en la colección de mensajes
    this.firestore
    this.firestore
    .collection(this.aula, ref => ref.orderBy('hora'))
    .snapshotChanges()
    .subscribe((snapshot) => {
      this.mensajes = snapshot.map((doc) => {
        const data: any = doc.payload.doc.data();
        return {
          id: doc.payload.doc.id,
          hora: data.hora,// Convertir el timestamp a objeto Date
          info: data.info, 
          emisor: data.emisor,
          texto: data.texto,
        };
      });
  
    });


    

}

ngAfterViewChecked() {
  this.scrollToTheLastItem();
}


  enviarMensaje() {
    if (this.nuevoMensaje === "" || !this.usuarioLogeado || !this.usuarioLogeado.uid || this.nuevoMensaje.length>=21) return;
  
    const d = new Date();
    const time = d; 
    
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const day = d.getDate();
    const month= d.getMonth();
    const year = d.getFullYear()

    const info = `${day}/${month}/${year} - ${hours}:${minutes}`; // Formato HH:MM


    const mensaje = {
      hora: time, 
      info: info, // Campo para mostrar en el chat
      emisor: {
        uid: this.usuarioLogeado.uid,
        email: this.usuarioLogeado.email 
      },
      texto: this.nuevoMensaje
    };
  
    this.firestore.collection(this.aula).add(mensaje);

    setTimeout(() => {
      this.scrollToTheLastItem()
    }, 2000);
    this.nuevoMensaje = "";
  }

  scrollToTheLastItem() {
    try {
      this.contenedorDeMensajes.nativeElement.scrollTop = this.contenedorDeMensajes.nativeElement.scrollHeight;
    } catch(err) { }
  }

 esUsuarioLogeado(emisorUid: string): boolean {
  
    return this.usuarioLogeado && this.usuarioLogeado.uid === emisorUid;
  }
}
