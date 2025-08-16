// src/app/core/services/storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  setItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`StorageService: Error al guardar "${key}"`, err);
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) as T : null;
    } catch (err) {
      console.warn(`StorageService: Error al leer "${key}"`, err);
      return null;
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.warn(`StorageService: Error al eliminar "${key}"`, err);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (err) {
      console.warn('StorageService: Error al limpiar el storage', err);
    }
  }
}
