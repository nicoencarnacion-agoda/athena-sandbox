export interface Scenario {
  id: string;
  label: string;
  template: string;
}

export interface TemplateCategory {
  id: string;
  name: string;
  scenarios: Scenario[];
}

export const templatesData: TemplateCategory[] = [
  {
    id: 'frequently-used',
    name: 'Frequently used',
    scenarios: [
      {
        id: 'aa-outcome-no-payment',
        label: 'AA Outcome L: No payment received - to offer no compensations and no alternative properties',
        template: '${bookingDetails}\nWe regret to inform you that your booking could not be confirmed due to an unexpected technical error. We apologize for any inconvenience caused.\n\nThere are a few possible reasons why this error occurred, such as:\n\n- The last room was booked just before you made your booking.\n- There was a delay on the website in reflecting the changes made by the property.\n\nHowever, we assure you that you were not charged, and no confirmation was sent to you.\n\nWe recommend that you revisit our website or Agoda App to make a new booking in different rooms or properties. You can always use the map feature to see which properties are located near the original property you selected. Please keep in mind that a confirmed booking will always be accompanied by a confirmation email.\n\nOnce again, we apologize for any inconvenience caused and please do not hesitate to let us know if you have any additional questions.',
      },
      {
        id: 'aa-outcome-payment',
        label: 'AA Outcome L: Payment received - to offer no compensations and no alternative properties',
        template: '${bookingDetails}\nWe regret to inform you that your booking could not be confirmed due to an unexpected technical error. We apologize for any inconvenience caused.\n\nThere are a few possible reasons why this error occurred, such as:\n\n- The last room was booked just before you made your booking.\n- There was a delay on the website in reflecting the changes made by the property.\n\nHowever, we assure you that you were not charged, and no confirmation was sent to you.\n\nWe recommend that you revisit our website or Agoda App to make a new booking in different rooms or properties. You can always use the map feature to see which properties are located near the original property you selected. Please keep in mind that a confirmed booking will always be accompanied by a confirmation email.\n\nOnce again, we apologize for any inconvenience caused and please do not hesitate to let us know if you have any additional questions.',
      },
    ],
  },
  {
    id: 'agoda-member-account',
    name: 'Agoda member account',
    scenarios: [
      {
        id: 'fraud-booking',
        label: 'Fraud Booking, cancelled booking pax follow up',
        template: 'Fraud booking follow up template content...',
      },
    ],
  },
  {
    id: 'agodacash-promotions',
    name: 'Agodacash and promotions',
    scenarios: [
      {
        id: 'agent-amends',
        label: 'Agent amends the booking',
        template: 'Agent amendment template...',
      },
    ],
  },
  {
    id: 'amendment',
    name: 'Amendment',
    scenarios: [
      {
        id: 'ask-pax-documents',
        label: 'Ask Pax for supporting documents',
        template: 'Supporting documents request template...',
      },
    ],
  },
  {
    id: 'best-price-guarantee',
    name: 'Best price guarantee',
    scenarios: [
      {
        id: 'benefit-agodacash',
        label: 'Benefit of AgodaCash',
        template: 'AgodaCash benefit template...',
      },
      {
        id: 'bpg-claim-process',
        label: 'BPG Claim Process (Prepaid and BNPL)',
        template: 'BPG claim process template...',
      },
      {
        id: 'bpg-claim-rejected',
        label: 'BPG claim Rejected',
        template: 'BPG claim rejected template...',
      },
    ],
  },
  {
    id: 'booking-info',
    name: 'Booking info',
    scenarios: [
      {
        id: 'chubb-pax-request-cancel',
        label: 'CHUBB - Pax request to cancel 1 of the round trip booking and keep insurance',
        template: 'CHUBB cancellation template...',
      },
      {
        id: 'chubb-direct-customer',
        label: 'CHUBB - Direct customer to contact Chubb CS to cancel insurance only',
        template: 'CHUBB direct customer template...',
      },
    ],
  },
  {
    id: 'cancellation',
    name: 'Cancellation',
    scenarios: [
      {
        id: 'booking-cancelled-refundable',
        label: 'Booking is cancelled - Refundable (confirmed amount)',
        template: 'Refundable cancellation template...',
      },
      {
        id: 'cancellation-inquiry-non-refundable',
        label: 'Cancellation Inquiry - Non-Refundable fare rule',
        template: 'Non-refundable inquiry template...',
      },
      {
        id: 'cancellation-inquiry-refundable',
        label: 'Cancellation Inquiry - Refundable fare rule',
        template: 'Refundable inquiry template...',
      },
      {
        id: 'cancellation-without-quote',
        label: 'Cancellation without quote - booking is cancelled and non-refundable',
        template: 'Cancellation without quote template...',
      },
    ],
  },
  {
    id: 'check-in-inquiry',
    name: 'Check-in inquiry',
    scenarios: [
      {
        id: 'cxl-inside-policy',
        label: 'CXL inside policy - Agent refunded by original payment method',
        template: 'CXL inside policy template...',
      },
    ],
  },
  {
    id: 'customer-feedback',
    name: 'Customer feedback',
    scenarios: [
      {
        id: 'issued-agodacash',
        label: 'Issued AgodaCash',
        template: 'Issued AgodaCash template...',
      },
    ],
  },
  {
    id: 'info-customer-property',
    name: 'Info about customer/property',
    scenarios: [
      {
        id: 'pax-sent-invalid',
        label: 'Pax sent supporting document - but is Invalid',
        template: 'Invalid document template...',
      },
      {
        id: 'pax-sent-documents',
        label: 'PAX sent supporting documents',
        template: 'PAX documents template...',
      },
    ],
  },
  {
    id: 'other',
    name: 'Other',
    scenarios: [
      {
        id: 'refund-time-frame',
        label: 'Refund Time Frame',
        template: 'Refund time frame template...',
      },
    ],
  },
  {
    id: 'payment-charge-related',
    name: 'Payment/charge related',
    scenarios: [
      {
        id: 'processing-fees',
        label: 'Processing fees - customer querying processing fees for cancellation request',
        template: 'Processing fees template...',
      },
    ],
  },
];

export const refundRelatedScenarios: Scenario[] = [
  {
    id: 'agency-asc-no-alternative',
    label: 'Agency booking - ASC no alternative - Flight cancelled with full refund',
    template: 'Agency ASC template...',
  },
  {
    id: 'agency-booking-fee-refund',
    label: 'Agency booking - Booking cancelled with booking fee refund',
    template: 'Booking fee refund template...',
  },
  {
    id: 'agency-no-booking-fee-refund',
    label: 'Agency booking - Booking cancelled with no booking fee refund',
    template: 'No booking fee refund template...',
  },
  {
    id: 'booking-cancelled-refundable',
    label: 'Booking is cancelled - Refundable',
    template: 'Booking cancelled refundable template...',
  },
];
