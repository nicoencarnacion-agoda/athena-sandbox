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

export default function RecipientsTable() {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ border: '1px solid #E0E0E0', borderRadius: '4px' }}
    >
      <Table>
        <TableHead sx={{ bgcolor: '#ECEFF1' }}>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '166%',
                letterSpacing: '0.4px',
                py: 0.75,
              }}
            >
              Role
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '166%',
                letterSpacing: '0.4px',
                py: 0.75,
              }}
            >
              Description
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '166%',
                letterSpacing: '0.4px',
                py: 0.75,
              }}
            >
              Email type
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '166%',
                letterSpacing: '0.4px',
                py: 0.75,
              }}
            >
              Phone number
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '166%',
                letterSpacing: '0.4px',
                py: 0.75,
              }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipients.map((recipient, index) => (
            <TableRow key={index}>
              <TableCell
                sx={{
                  fontSize: '14px',
                  lineHeight: '143%',
                  letterSpacing: '0.17px',
                }}
              >
                {recipient.role}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '14px',
                  lineHeight: '143%',
                  letterSpacing: '0.17px',
                }}
              >
                {recipient.description}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '14px',
                  lineHeight: '143%',
                  letterSpacing: '0.17px',
                }}
              >
                {recipient.emailType}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '14px',
                  lineHeight: '143%',
                  letterSpacing: '0.17px',
                }}
              >
                {recipient.phoneNumber}
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Add />}
                  sx={{
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '26px',
                    letterSpacing: '0.46px',
                    px: 2.75,
                    py: 1,
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
