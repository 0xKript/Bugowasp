
export enum Severity {
  CRITICAL = 'Critical',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export interface Vulnerability {
  id: string;
  number: string;
  name: string;
  arabicName: string;
  severity: Severity;
  icon: string;
}

export type Page = 'home' | 'settings' | 'labs' | 'quiz' | 'vulnerability-detail';

export type VulnerabilitySubSection = 'theory' | 'lab' | 'quiz';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}
