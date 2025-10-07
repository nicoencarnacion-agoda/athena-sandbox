export interface DemoResponse {
  message: string;
}

export interface BookingDetails {
  id: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
  indent?: boolean;
}

export interface RecipientData {
  name: string;
  email: string;
  phone?: string;
}
