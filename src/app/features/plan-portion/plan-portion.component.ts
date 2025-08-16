import { Component, OnInit } from '@angular/core';
import { PlanPortionTarget } from '../../models/plan-portion.model';
import { PlanPortionService } from '../../core/services/plan-portion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plan-portion',
  templateUrl: './plan-portion.component.html',
  styleUrl: './plan-portion.component.scss',
  imports: [CommonModule]
})
export class PlanPortionComponent implements OnInit{

  portionTargets: PlanPortionTarget[] = [];

  constructor(private planPortionService: PlanPortionService) {}

  ngOnInit(): void {

    const userId = 1007; // OJO! extraer del token JWT
    const nuvo =
    this.planPortionService.getDailyTargetsByUserId(userId).subscribe({
      next: (data) => this.portionTargets = data,
      error: (err) => console.error('Error al cargar targets:', err)
    });

    console.log(this.portionTargets);
  }


}
