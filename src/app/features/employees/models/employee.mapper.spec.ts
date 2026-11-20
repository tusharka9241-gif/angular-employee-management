import { Employee } from './employee';
import { filterByStatus, isEmployee, parseEmployees, toEmployee } from './employee.mapper';

const valid: Employee = {
  id: 1,
  name: 'Asha Patil',
  email: 'asha@example.com',
  departmentId: 1,
  salary: 60000,
  status: 'active',
};

describe('isEmployee', () => {
  it('accepts a valid employee', () => {
    expect(isEmployee(valid)).toBe(true);
  });

  it('rejects null', () => {
    expect(isEmployee(null)).toBe(false);
  });

  it('rejects a missing field', () => {
    const { email, ...withoutEmail } = valid;
    expect(isEmployee(withoutEmail)).toBe(false);
  });

  it('rejects a wrong type', () => {
    expect(isEmployee({ ...valid, id: 'abc' })).toBe(false);
  });

  it('rejects an invalid status', () => {
    expect(isEmployee({ ...valid, status: 'archived' })).toBe(false);
  });

  it('rejects NaN salary', () => {
    expect(isEmployee({ ...valid, salary: NaN })).toBe(false);
  });
});

describe('toEmployee', () => {
  it('returns the employee for valid input', () => {
    expect(toEmployee(valid)).toEqual(valid);
  });

  it('throws for invalid input', () => {
    expect(() => toEmployee({ name: 'x' })).toThrow();
  });
});

describe('filterByStatus', () => {
  it('returns only employees with the given status', () => {
    const inactive: Employee = { ...valid, id: 2, status: 'inactive' };
    expect(filterByStatus([valid, inactive], 'inactive')).toEqual([inactive]);
  });
});

describe('parseEmployees', () => {
  it('parses a valid JSON array', () => {
    expect(parseEmployees(JSON.stringify([valid]))).toEqual([valid]);
  });

  it('throws for invalid JSON', () => {
    expect(() => parseEmployees('not json')).toThrow('Invalid JSON');
  });

  it('throws when the shape is wrong', () => {
    expect(() => parseEmployees('[{"id":1}]')).toThrow();
  });
});
