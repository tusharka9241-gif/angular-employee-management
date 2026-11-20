// DELIBERATELY LOOSE draft for the Day 2 AI type-safety review.
export function toEmployee(raw: any): any {
    return {
        id: raw.id,
        name: raw.name,
        email: raw.email,
        departmentId: raw.departmentId,
        salary: raw.salary,
        status: raw.status,
    };
}

export function filterByStatus(list: any[], status: any) {
    return list.filter((e) => e.status === status);
}

export function parseEmployees(json: string): any {
    return JSON.parse(json);
}