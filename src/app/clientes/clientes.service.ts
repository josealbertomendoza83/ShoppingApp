import { Injectable } from '@angular/core';
import { Cliente, Grupo } from './cliente.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
// @Injectable({
//  providedIn: 'root'
// })
@Injectable()

export class ClientesService {

  private clientes: Cliente[];
  private grupos: Grupo[];
  private clientes$: Subject<Cliente[]> = new Subject<Cliente[]>();
  
  constructor() { 
    this.grupos = [
      {
        id: 0,
        nombre: 'Sin definir'
      },
      {
        id: 1,
        nombre: '1 - Urgent' //Urgent
      },
      {
        id: 2,
        nombre: '2 - Medium' //MEdium
      },
      {
        id: 3,
        nombre: '3 - Low'  //Low
      },
    ];
    this.clientes = [];
  }

  getGrupos() {
    return this.grupos;
  }

  getClientes() {
    return this.clientes;
  }

  getClientes$(): Observable<Cliente[]> {
    return this.clientes$.asObservable();
  }

  agregarCliente(cliente: Cliente) {
    debugger;
    this.clientes.push(cliente);
    localStorage.setItem(cliente.nombre, cliente.id.toString());
    this.clientes$.next(this.clientes);
  }

  nuevoCliente(): Cliente {
    return {
      id: this.clientes.length,
      nombre: '',
      cif: '',
      direccion: '',
      grupo: 0
    };
  }

  borrarCliente(cliente: Cliente): void {
    for (let i = 0; i < this.clientes.length; i++) {
      if (cliente === this.clientes[i]) {
        this.clientes.splice(i, 1);
        break;
      }
    }
  }
}
