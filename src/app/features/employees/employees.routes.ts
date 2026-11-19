import { Routes } from '@angular/router';

export const EMPLOYEE_ROUTES: Routes = [
    { path :'', loadComponent: ()=> import('./pages/employee-list/employee-list').then(m=> m.EmployeeList)},
    { path: 'new', loadComponent: ()=> import('./pages/employee-form/employee-form').then(m=> m.EmployeeForm)},
    { path: ':id', loadComponent: () => import('./pages/employee-detail/employee-detail').then(m => m.EmployeeDetail) },
    { path: ':id/edit', loadComponent: () => import('./pages/employee-form/employee-form').then(m => m.EmployeeForm) },

]