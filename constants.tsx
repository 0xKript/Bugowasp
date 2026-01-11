
import { Vulnerability, Severity } from './types';

export const TOP_10_2023: Vulnerability[] = [
  {
    id: 'a01',
    number: '01',
    name: 'Broken Access Control',
    arabicName: 'فشل التحكم في الوصول',
    severity: Severity.CRITICAL,
    icon: 'admin_panel_settings'
  },
  {
    id: 'a02',
    number: '02',
    name: 'Cryptographic Failures',
    arabicName: 'فشل التشفير',
    severity: Severity.CRITICAL,
    icon: 'lock'
  },
  {
    id: 'a03',
    number: '03',
    name: 'Injection',
    arabicName: 'الحقن (SQLi, XSS)',
    severity: Severity.CRITICAL,
    icon: 'data_object'
  },
  {
    id: 'a04',
    number: '04',
    name: 'Insecure Design',
    arabicName: 'تصميم غير آمن',
    severity: Severity.HIGH,
    icon: 'architecture'
  },
  {
    id: 'a05',
    number: '05',
    name: 'Security Misconfig',
    arabicName: 'إعدادات أمنية خاطئة',
    severity: Severity.MEDIUM,
    icon: 'settings_alert'
  },
  {
    id: 'a06',
    number: '06',
    name: 'Vulnerable Components',
    arabicName: 'مكونات ضعيفة وقديمة',
    severity: Severity.MEDIUM,
    icon: 'extension'
  },
  {
    id: 'a07',
    number: '07',
    name: 'Identification Failures',
    arabicName: 'فشل المصادقة والتحقق',
    severity: Severity.MEDIUM,
    icon: 'fingerprint'
  },
  {
    id: 'a08',
    number: '08',
    name: 'Software Data Failures',
    arabicName: 'فشل سلامة البيانات',
    severity: Severity.HIGH,
    icon: 'verified_user'
  },
  {
    id: 'a09',
    number: '09',
    name: 'Logging Failures',
    arabicName: 'فشل التسجيل والمراقبة',
    severity: Severity.MEDIUM,
    icon: 'visibility'
  },
  {
    id: 'a10',
    number: '10',
    name: 'SSRF',
    arabicName: 'تزوير الطلب من جانب الخادم',
    severity: Severity.LOW,
    icon: 'dns'
  }
];
