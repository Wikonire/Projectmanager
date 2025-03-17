export interface FlattenedUser {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  employeeId?: string;
  firstName?: string;
  lastName?: string;
  employeeCreatedAt?: string;
  employeePmFunctions: EmployeePmFunction[];
  projectsToLead: ProjectLead[];
}

export interface EmployeePmFunction {
  pmFunctionName?: string;
  workload?: string;
}

export interface ProjectLead {
  id: string;
  title: string;
  description: string;
  approvalDate: string;
  approvalSignature: string;
}
