
import { Cliente, Grupo } from './../cliente.model';
import { ClientesService } from './../clientes.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})

 //let value:string;
export class ListadoClientesComponent implements OnInit, OnDestroy {

  clientes: Cliente[] = [];
  clientes$!: Observable<Cliente[]>;
  clientesSubscription!: Subscription;

  searchText="hello world";
  constructor(private clientesService: ClientesService) { 

    
  }

  ngOnInit() {
    this.clientes$ = this.clientesService.getClientes$();
    this.clientesSubscription = this.clientes$.subscribe((clientes: Cliente[]) => this.clientes = clientes);


    
  }

  doBorrarCliente(cliente: Cliente) {
    console.log('yeah!', cliente);
    this.clientesService.borrarCliente(cliente);
  }

  ngOnDestroy() {
    this.clientesSubscription.unsubscribe();
  }

  onChange(value:string) {
    //this.text = event.target.value;
    console.log("New value = " + value)
  };

  searchKey(data: string) {
    this.searchText = data;
    this.search();
  }

  search() {
    this.clientes = this.searchText === ""? this.clientes : this.clientes.filter((element) => {
      return element.nombre.toLowerCase() == this.searchText.toLowerCase();
    });
  }

// sendTheNewValue(event){
// this.value = event.target.value;
// }
}
