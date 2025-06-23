import { CustomerService } from './../../core/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../core/models/customer';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customers',
  imports: [DatePipe],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit{

  customerDetail: Customer | null = null;
  customers: Customer[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;
  currentFirstName: string = '';
  showDeatils: boolean = false;

  constructor(private customerService: CustomerService,  private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.isLoading = true;
    this.customerService.getCustomers().subscribe({
      next: (data: Customer[]) => {
        this.customers = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Hubo un error al cargar los datos. Intente de nuevo más tarde.';
        console.error('Error al obtener personas', error);
      }
    });
  }

  getDetails(customer: Customer){
    this.showDeatils = true;
    this.customerDetail = customer
  }
  getCustomerDetail(customerId: number): void {
    this.isLoading = true;
    this.customerService.getCustomerById(customerId).subscribe({
      next: (data: Customer) => {
        this.customerDetail = data;  // Asignamos los datos del cliente al modelo
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Hubo un error al cargar los detalles del cliente.';
        console.error('Error al obtener los detalles del cliente:', error);
      }
    });
  }

  updateCustomer(customer: Customer): void {
    console.log('Cliente a actualizar:', customer);
    this.isLoading = true;

    // Llamamos al servicio para actualizar el cliente
    this.customerService.updateCustomer(customer).subscribe({
      next: (response) => {
        // La respuesta puede ser cualquier cosa, así que la manejamos genéricamente
        console.log('Respuesta del servidor:', response);

        // Si la respuesta contiene un objeto customer actualizado (si se espera así)
        if (response && response.customerID) {
          const updatedCustomer = response;  // Usamos la respuesta como cliente actualizado

          // Buscar el cliente en el array usando el customerID
          const index = this.customers.findIndex(c => c.customerID === updatedCustomer.customerID);

          if (index !== -1) {
            // Si encontramos el cliente en la lista, lo actualizamos
            this.customers[index] = updatedCustomer;
          } else {
            console.warn('Cliente no encontrado en la lista:', updatedCustomer.customerID);
          }
        } else {
          // Si la respuesta no es un cliente, podemos hacer otras acciones
          console.log('La respuesta no contiene un cliente válido');
        }

        this.isLoading = false;
        this.getCustomers();
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Hubo un error al actualizar el cliente. Intente de nuevo más tarde.';
        console.error('Error al actualizar el cliente:', error);
      }
    });
  }

  deleteCustomer(customer:Customer): void {

    const { customerID: customerId } = customer;
    this.isLoading = true;

    // Llamamos al servicio para eliminar el cliente
    this.customerService.deleteCustomer(customerId).subscribe({
      next: (response) => {
        // El cliente ha sido eliminado correctamente, ahora lo quitamos de la lista
        this.customers = this.customers.filter(customer => customer.customerID !== customerId);

        console.log('Cliente eliminado con éxito:', customerId);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Hubo un error al eliminar el cliente. Intente de nuevo más tarde.';
        console.error('Error al eliminar el cliente:', error);
      }
    });
  }

  onFirstNameChange(event: Event, customer: any): void {
    const input = event.target as HTMLInputElement;
    customer.firstName = input.value; // Actualiza el primer nombre del cliente
  }

  closePopUpDetails(){
    this.showDeatils = false;
  }
}
