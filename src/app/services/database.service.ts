import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore) {}

  async obtenerTodos(collection: string) {
    try {
      return this.firestore.collection(collection).snapshotChanges();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public actualizar(coleccion: string, data: any, id: string) {
    return this.firestore.collection(coleccion).doc(id).set(data);
  }


public crear(collection: string, data: any) {
  return this.firestore.collection(collection).add(data);
}




//Crea un nuevo dato   


public obtenerPorId(coleccion: string, id: string) {
  return this.firestore.collection(coleccion).doc(id).snapshotChanges();
  // El documento que tenga ese id tal cual este ahora, le saca una foto y me lo devuelve
}



public eliminar(collection: string, id: string) {
  return this.firestore.collection(collection).doc(id).delete();
}

public createWithCustomId(collection: string, customId: string, data: any) {
  this.firestore.collection(collection).doc(customId).set(data);
}

}

