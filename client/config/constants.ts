// Application-wide constants

export const APP_NAME = 'Athena';

export const DEFAULT_CONTACT_TYPE = 'Customer';
export const DEFAULT_UCID = '7897129879879841';

export const CONTACT_TYPES = ['Customer', 'Partner', 'Agent'] as const;

export const UCID_OPTIONS = [
  { value: '7897129879879841', label: '7897129879879841 (Default)' },
  { value: '9879789712879841', label: '9879789712879841' },
  { value: '7987987897129841', label: '7987987897129841' },
] as const;
