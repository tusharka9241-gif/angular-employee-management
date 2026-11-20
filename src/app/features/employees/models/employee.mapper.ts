import { Employee, EmployeeStatus } from './employee';

const isFiniteNumber = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

export function isEmployeeStatus(value: unknown): value is EmployeeStatus {
  return value === 'active' || value === 'inactive';
}

export function isEmployee(value: unknown): value is Employee {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    isFiniteNumber(v['id']) &&
    typeof v['name'] === 'string' &&
    typeof v['email'] === 'string' &&
    isFiniteNumber(v['departmentId']) &&
    isFiniteNumber(v['salary']) &&
    isEmployeeStatus(v['status'])
  );
}

export function toEmployee(raw: unknown): Employee {
  if (!isEmployee(raw)) throw new TypeError('Invalid employee data structure');
  // Copy only known fields, so any extra properties are dropped.
  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    departmentId: raw.departmentId,
    salary: raw.salary,
    status: raw.status,
  };
}

export function filterByStatus(list: readonly Employee[], status: EmployeeStatus): Employee[] {
  return list.filter((e) => e.status === status);
}

export function parseEmployees(json: string): Employee[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new TypeError('Invalid JSON');
  }
  if (!Array.isArray(parsed) || !parsed.every(isEmployee)) {
    throw new TypeError('Parsed JSON does not conform to Employee[]');
  }
  return parsed;
}
