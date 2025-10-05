import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from '@mui/material';
import { Add } from '@mui/icons-material';

const recipients = Array(8).fill({
  role: 'Member',
  description: 'Mohd Faez Nawi',
  emailType: 'Primary email',
  phoneNumber: '63 277 1188',
});

const headerCellStyle = {
  fontWeight: 700,
  fontSize: '12px',
  lineHeight: '19.92px',
  letterSpacing: '0.4px',
  py: '6px',
  px: '16px',
  color: 'rgba(0, 0, 0, 0.87)',
};

const bodyCellStyle = {
  fontSize: '14px',
  lineHeight: '20.02px',
  letterSpacing: '0.17px',
  color: 'rgba(0, 0, 0, 0.87)',
  py: '16px',
  px: '16px',
  fontWeight: 400,
};

export default function RecipientsTable() {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ border: '1px solid #E0E0E0', borderRadius: '3px' }}
    >
      <Table>
        <TableHead sx={{ bgcolor: '#ECEFF1' }}>
          <TableRow>
            <TableCell sx={headerCellStyle}>Role</TableCell>
            <TableCell sx={headerCellStyle}>Description</TableCell>
            <TableCell sx={headerCellStyle}>Email type</TableCell>
            <TableCell sx={headerCellStyle}>Phone number</TableCell>
            <TableCell sx={headerCellStyle}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipients.map((recipient, index) => (
            <TableRow key={index} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
              <TableCell sx={bodyCellStyle}>{recipient.role}</TableCell>
              <TableCell sx={bodyCellStyle}>{recipient.description}</TableCell>
              <TableCell sx={bodyCellStyle}>{recipient.emailType}</TableCell>
              <TableCell sx={bodyCellStyle}>{recipient.phoneNumber}</TableCell>
              <TableCell sx={bodyCellStyle}>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Add />}
                  sx={{
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '26px',
                    letterSpacing: '0.46px',
                    px: '22px',
                    py: '8px',
                    textTransform: 'none',
                    borderRadius: '4px',
                    borderColor: 'rgba(25, 118, 210, 0.50)',
                    color: '#2196F3',
                  }}
                >
                  Add
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
