// src/app/core/services/plan-portion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PlanPortionTarget } from '../../models/plan-portion.model';

@Injectable({ providedIn: 'root' })
export class PlanPortionService {
  private apiUrl = `${environment.apiBaseUrl}/PlanPortionTarget`;

  constructor(private http: HttpClient) {}

  getDailyTargetsByUserId(userId: number): Observable<PlanPortionTarget[]> {

    return this.http.get<PlanPortionTarget[]>(`${this.apiUrl}/user/${userId}`);
  }
}
