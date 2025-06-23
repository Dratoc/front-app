import { Injectable } from '@angular/core';
import { ApiService } from './api.service';  // Importamos ApiService para hacer las llamadas HTTP
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';  // Usamos Observable para el retorno
import { catchError } from 'rxjs/operators';  // Para manejar errores

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'Customer'; // URL de la API

  constructor(private apiService: ApiService) {}  // Inyectamos ApiService en lugar de HttpClient

  // metodo para obtener la lista de clientes
  getCustomers(): Observable<Customer[]> {
    // Usamos el ApiService para hacer la llamada GET
    return this.apiService.get<Customer[]>(this.apiUrl).pipe(
      catchError((error) => {
        // Aquí puedes manejar los errores o hacer logging si es necesario
        console.error('Error al obtener clientes:', error);
        return [];
      })
    );
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    const url = `${this.apiUrl}/${customer.customerID}/${customer.firstName}`;
    return this.apiService.put<any>(url, null).pipe(
      catchError((error) => {
        // Aquí puedes manejar los errores o hacer logging si es necesario
        console.error('Error al actualizar el cliente:', error);
        return [];
      })
    );
  }

  // Método para eliminar un cliente
  deleteCustomer(customerId: number): Observable<any> {
    const url = `${this.apiUrl}/${customerId}`;  // URL para el DELETE

    return this.apiService.delete<any>(url).pipe(  // Se usa 'delete' para la solicitud HTTP
      catchError((error) => {
        // Manejo de errores
        console.error('Error al eliminar el cliente:', error);
        throw error;  // Propaga el error para manejarlo en el componente
      })
    );
  }

  getCustomerById(customerId: number): Observable<Customer> {
    return this.apiService.get<Customer>(`${this.apiUrl}/${customerId}`);
  }

}
