
import { Routes } from '@angular/router'; // Asegúrate de tener este componente creado
import { CustomersComponent } from './features/customers/customers.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige la ruta raíz a /home
  { path: 'home', component: CustomersComponent },
  // Otras rutas...
];
