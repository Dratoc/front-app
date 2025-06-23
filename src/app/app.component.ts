import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';  // Para las rutas
import { HttpClientModule, HttpClient } from '@angular/common/http';  // Para peticiones HTTP

@Component({
  selector: 'app-root',
  standalone: true,  // Marca el componente como standalone
  imports: [RouterOutlet, HttpClientModule],  // Importamos RouterOutlet para las rutas y HttpClientModule para peticiones HTTP
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-app';
}
