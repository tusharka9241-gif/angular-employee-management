export type EmployeeStatus = 'active' | 'inactive';

export interface Employee {
    id: number;
    name: string;
    email: string;
    departmentId: number;
    salary: number;
    status: EmployeeStatus;
}

// Derived types (using utility types)
export type CreateEmployeeDto = Omit<Employee, 'id'>;
export type UpdateEmployeeDto = Partial<CreateEmployeeDto>;
export type EmployeeSummary = Pick<Employee, 'id' | 'name' | 'status'>;