import { Box, Typography, FormControlLabel, Checkbox } from '@mui/material';

const bookings = [
  { id: '123456789', label: '123456789', checked: true },
  { id: 'api1', label: 'API Mapping Issue', checked: true, indent: true },
  { id: 'cancel1', label: 'Request to cancel booking', checked: false, indent: true },
  { id: '987654321', label: '987654321', checked: true, disabled: true },
  { id: 'api2', label: 'API Mapping Issue', checked: true, disabled: true, indent: true },
  { id: 'cancel2', label: 'Request to cancel booking', checked: false, disabled: true, indent: true },
];

export default function BookingIDs() {
  return (
    <Box
      sx={{
        width: '320px',
        height: '100vh',
        borderRight: '1px solid #E0E0E0',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          p: '16px 24px',
          borderBottom: '1px solid #E0E0E0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: 500,
            lineHeight: '160%',
            letterSpacing: '0.15px',
          }}
        >
          Booking IDs
        </Typography>
        <FormControlLabel
          control={<Checkbox defaultChecked color="primary" />}
          label="Select all"
          sx={{
            m: 0,
            '& .MuiFormControlLabel-label': {
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0.15px',
            },
          }}
        />
      </Box>

      <Box sx={{ px: '24px', py: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
        {bookings.map((booking) => (
          <FormControlLabel
            key={booking.id}
            control={
              <Checkbox
                defaultChecked={booking.checked}
                color="primary"
                disabled={booking.disabled}
              />
            }
            label={booking.label}
            disabled={booking.disabled}
            sx={{
              display: 'flex',
              pl: booking.indent ? 1 : 0,
              '& .MuiFormControlLabel-label': {
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0.15px',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
