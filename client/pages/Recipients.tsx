import { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  SelectChangeEvent,
} from '@mui/material';
import {
  PermContactCalendar,
  Article,
  Mail,
  Search,
  Info,
} from '@mui/icons-material';
import MainNavigation from '../components/MainNavigation';
import BookingIDs from '../components/BookingIDs';
import RecipientsTable from '../components/RecipientsTable';

export default function Recipients() {
  const [activeTab, setActiveTab] = useState(0);
  const [contactType, setContactType] = useState('Customer');
  const [ucid, setUcid] = useState('7897129879879841');
  const [ucidOpen, setUcidOpen] = useState(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleContactTypeChange = (event: SelectChangeEvent) => {
    setContactType(event.target.value);
  };

  const handleUcidChange = (event: SelectChangeEvent) => {
    setUcid(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#FFF' }}>
      <MainNavigation />
      <BookingIDs />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ borderBottom: '1px solid #E0E0E0', bgcolor: '#FAFAFA' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '24px',
                letterSpacing: '0.4px',
                textTransform: 'none',
                minHeight: '42px',
              },
            }}
          >
            <Tab icon={<PermContactCalendar />} iconPosition="start" label="Recipients" />
            <Tab icon={<Article />} iconPosition="start" label="Templates" />
            <Tab icon={<Mail />} iconPosition="start" label="Draft" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: '356px' }}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel sx={{ fontSize: '12px' }}>Contact type</InputLabel>
                  <Select
                    value={contactType}
                    onChange={handleContactTypeChange}
                    label="Contact type"
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                      },
                      '& .MuiSelect-select': {
                        fontSize: '16px',
                        lineHeight: '24px',
                        letterSpacing: '0.15px',
                      },
                    }}
                  >
                    <MenuItem value="Customer">Customer</MenuItem>
                    <MenuItem value="Partner">Partner</MenuItem>
                    <MenuItem value="Agent">Agent</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth variant="outlined">
                  <InputLabel
                    sx={{
                      fontSize: '12px',
                      color: ucidOpen ? '#2196F3' : 'rgba(0, 0, 0, 0.60)',
                    }}
                  >
                    UCID
                  </InputLabel>
                  <Select
                    value={ucid}
                    onChange={handleUcidChange}
                    onOpen={() => setUcidOpen(true)}
                    onClose={() => setUcidOpen(false)}
                    label="UCID"
                    startAdornment={
                      <Search sx={{ color: 'rgba(0, 0, 0, 0.54)', mr: 1 }} />
                    }
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: ucidOpen ? '#2196F3' : 'rgba(0, 0, 0, 0.23)',
                        borderWidth: ucidOpen ? '2px' : '1px',
                      },
                      '& .MuiSelect-select': {
                        fontSize: '16px',
                        lineHeight: '24px',
                        letterSpacing: '0.15px',
                      },
                    }}
                  >
                    <MenuItem value="7897129879879841">7897129879879841 (Default)</MenuItem>
                    <MenuItem value="9879789712879841">9879789712879841</MenuItem>
                    <MenuItem value="7987987897129841">7987987897129841</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Alert
                icon={<Info sx={{ color: '#0288D1' }} />}
                severity="info"
                sx={{
                  bgcolor: '#E5F6FD',
                  color: '#014361',
                  '& .MuiAlert-icon': {
                    color: '#0288D1',
                  },
                  fontSize: '14px',
                  lineHeight: '143%',
                  letterSpacing: '0.17px',
                }}
              >
                It's currently 06:37 in customer's local time (based on the primary phone of member)
              </Alert>

              <RecipientsTable />
            </Box>
          </Box>
        )}

        {activeTab === 1 && (
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Article sx={{ fontSize: 64, color: 'rgba(0, 0, 0, 0.23)', mb: 2 }} />
              <Box sx={{ fontSize: '20px', fontWeight: 500, color: 'rgba(0, 0, 0, 0.87)' }}>
                Templates
              </Box>
              <Box sx={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.60)', mt: 1 }}>
                Template content will be added here
              </Box>
            </Box>
          </Box>
        )}

        {activeTab === 2 && (
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Mail sx={{ fontSize: 64, color: 'rgba(0, 0, 0, 0.23)', mb: 2 }} />
              <Box sx={{ fontSize: '20px', fontWeight: 500, color: 'rgba(0, 0, 0, 0.87)' }}>
                Draft
              </Box>
              <Box sx={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.60)', mt: 1 }}>
                Draft content will be added here
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
