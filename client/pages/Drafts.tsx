import { useState, KeyboardEvent, useRef } from 'react';
import agodaLogo from '../assets/logos/agoda.png';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  Button,
  Link,
  Typography,
  SelectChangeEvent,
  InputAdornment,
} from '@mui/material';
import {
  Description,
  NoteAdd,
  Link as LinkIcon,
  AttachFile,
  ArrowDropDown,
  Cancel,
} from '@mui/icons-material';

const emailOptions = [
  'BIZ.EN@AGODA.COM',
  'AE-SERVICE@AGODA.COM',
  'CN-SERVICE@AGODA.COM',
  'CSAT@AGODA.COM',
  'CSI.INVOICES@AGODA.COM',
  'CUSTOMER-SERVICE@AGODA.COM',
  'DE-SERVICE@AGODA.COM',
  'DSRR@AGODA.COM',
  'ES-SERVICE@AGODA.COM',
];

const DEFAULT_EMAIL_BODY = `Dear Yuiko Majima,

Greetings from Agoda!

With reference booking ID 568308069 as detailed below:

Hotel: Best Western Plus At 20 Sukhumvit
Room Type: Superior Twin With Breakfast
City/Country: Bangkok/Thailand
Arrival: January 9, 2015
Departure: January 10, 2015

We have received a request from the customer to cancel their booking due to the current novel coronavirus outbreak.

Please note that in accordance with our policy regarding special circumstances, we have cancelled this booking without penalties and have provided a full refund to the customer.

In case you have any concerns, please contact our Accommodation Services Team. You can send an email by logging in to YCS (https://ycs.agoda.com/en-us) and clicking on the Support button.

Regards,
Chi-lei (Lei-lei)
Agoda Customer Experience Group`;

export default function Drafts() {
  const [fromEmail, setFromEmail] = useState('BIZ.EN@AGODA.COM');
  const [toEmails, setToEmails] = useState<string[]>([]);
  const [toInputValue, setToInputValue] = useState('');
  const [subject, setSubject] = useState('Re: Booking 123456789');
  const [nickname, setNickname] = useState('Ben');
  const [emailBody, setEmailBody] = useState(DEFAULT_EMAIL_BODY);
  const [toFocused, setToFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const labelStyles = {
    fontSize: '12px',
    lineHeight: '12px',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.60)',
    '&.Mui-focused': {
      color: '#2196F3',
    },
  };

  const inputTypographyStyles = {
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.15px',
  };

  const inputRootBaseStyles = {
    minHeight: '40px',
    paddingLeft: 0,
    paddingRight: 0,
  };

  const handleFromChange = (event: SelectChangeEvent) => {
    setFromEmail(event.target.value);
  };

  const addEmailChip = (rawValue: string) => {
    const normalized = rawValue.trim();
    if (!normalized) {
      return;
    }

    setToEmails((prev) => (prev.includes(normalized) ? prev : [...prev, normalized]));
  };

  const handleToKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if ((event.key === ',' || event.key === 'Enter') && toInputValue.trim()) {
      event.preventDefault();
      addEmailChip(toInputValue);
      setToInputValue('');
    }
  };

  const handleDeleteEmail = (emailToDelete: string) => {
    setToEmails((prev) => prev.filter((email) => email !== emailToDelete));
    inputRef.current?.focus();
  };

  const handleToFocus = () => {
    setToFocused(true);
  };

  const handleToBlur = () => {
    if (toInputValue.trim()) {
      addEmailChip(toInputValue);
      setToInputValue('');
    }
    setToFocused(false);
  };

  const shouldShrinkLabel = toFocused || toEmails.length > 0 || Boolean(toInputValue.trim());

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: '#FFF',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          p: '16px 24px 24px 24px',
          flex: 1,
          overflow: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <FormControl fullWidth variant="standard">
            <InputLabel
              sx={{
                fontSize: '12px',
                lineHeight: '12px',
                letterSpacing: '0.15px',
                color: 'rgba(0, 0, 0, 0.60)',
              }}
            >
              From
            </InputLabel>
            <Select
              value={fromEmail}
              onChange={handleFromChange}
              IconComponent={ArrowDropDown}
              sx={{
                mt: '18px',
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: '24px',
                  pb: '6px',
                },
                '&:before': {
                  borderBottomColor: 'rgba(0, 0, 0, 0.42)',
                },
              }}
              renderValue={(value) => (
                <Chip
                  label={value}
                  size="small"
                  sx={{
                    height: '24px',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '18px',
                    letterSpacing: '0.16px',
                    bgcolor: 'rgba(0, 0, 0, 0.08)',
                    borderRadius: '100px',
                    '& .MuiChip-label': {
                      px: '10px',
                    },
                  }}
                />
              )}
            >
              {emailOptions.map((email) => (
                <MenuItem
                  key={email}
                  value={email}
                  sx={{
                    fontSize: '14px',
                    lineHeight: '24px',
                    letterSpacing: '0.17px',
                    py: '4px',
                    px: '16px',
                  }}
                >
                  {email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="To"
            variant="standard"
            fullWidth
            value={toInputValue}
            onChange={(e) => setToInputValue(e.target.value)}
            onKeyDown={handleToKeyDown}
            onFocus={handleToFocus}
            onBlur={handleToBlur}
            inputRef={inputRef}
            InputLabelProps={{
              shrink: shouldShrinkLabel,
              sx: labelStyles,
            }}
            InputProps={{
              onClick: () => inputRef.current?.focus(),
              startAdornment:
                toEmails.length > 0 ? (
                  <InputAdornment
                    position="start"
                    disablePointerEvents={false}
                    sx={{
                      m: 0,
                      pl: 0,
                      pr: 0,
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    {toEmails.map((email) => (
                      <Chip
                        key={email}
                        label={email}
                        size="small"
                        onDelete={() => handleDeleteEmail(email)}
                        deleteIcon={
                          <Cancel
                            sx={{
                              fontSize: '16px',
                              opacity: 0.26,
                              '&:hover': { opacity: 0.4 },
                            }}
                          />
                        }
                        sx={{
                          height: '24px',
                          fontSize: '14px',
                          fontWeight: 400,
                          lineHeight: '18px',
                          letterSpacing: '0.16px',
                          bgcolor: 'rgba(0, 0, 0, 0.08)',
                          borderRadius: '100px',
                          '& .MuiChip-label': {
                            px: '10px',
                          },
                        }}
                      />
                    ))}
                  </InputAdornment>
                ) : null,
              sx: {
                ...inputRootBaseStyles,
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: toEmails.length > 0 ? '8px' : 0,
                '& .MuiInputBase-input': {
                  ...inputTypographyStyles,
                  flex: 1,
                  minWidth: '120px',
                  padding: 0,
                },
                '& .MuiInputAdornment-root': {
                  m: 0,
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px',
                  maxWidth: '100%',
                },
              },
            }}
          />

          <TextField
            label="Subject"
            variant="standard"
            fullWidth
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            InputLabelProps={{
              sx: labelStyles,
            }}
            InputProps={{
              sx: {
                ...inputRootBaseStyles,
                '& .MuiInputBase-input': {
                  ...inputTypographyStyles,
                  padding: 0,
                },
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #E0E0E0',
              borderRadius: '4px',
              flex: 1,
              minHeight: 0,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: '4px 16px',
                borderBottom: '1px solid #E0E0E0',
              }}
            >
              <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Button
                  variant="text"
                  size="small"
                  startIcon={<Description sx={{ fontSize: '18px !important' }} />}
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: '22px',
                    letterSpacing: '0.46px',
                    textTransform: 'none',
                    minHeight: '32px',
                  }}
                >
                  Use a template
                </Button>
                <Button
                  variant="text"
                  size="small"
                  startIcon={<NoteAdd sx={{ fontSize: '18px !important' }} />}
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: '22px',
                    letterSpacing: '0.46px',
                    textTransform: 'none',
                    minHeight: '32px',
                  }}
                >
                  Insert empty template
                </Button>
                <Button
                  variant="text"
                  size="small"
                  startIcon={<LinkIcon sx={{ fontSize: '18px !important' }} />}
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: '22px',
                    letterSpacing: '0.46px',
                    textTransform: 'none',
                    minHeight: '32px',
                  }}
                >
                  Insert link
                </Button>
                <Button
                  variant="text"
                  size="small"
                  startIcon={<AttachFile sx={{ fontSize: '18px !important' }} />}
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: '22px',
                    letterSpacing: '0.46px',
                    textTransform: 'none',
                    minHeight: '32px',
                  }}
                >
                  Attach file
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                p: '40px 242px 0 242px',
                flex: 1,
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center',
                '@media (max-width: 1400px)': {
                  px: '80px',
                },
                '@media (max-width: 900px)': {
                  px: '24px',
                },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  maxWidth: '720px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  minHeight: 0,
                  pb: 3,
                }}
              >
                <Box
                  component="img"
                  src={agodaLogo}
                  alt="Agoda logo"
                  sx={{
                    width: '80px',
                    height: 'auto',
                    mb: '40px',
                  }}
                />

                <TextField
                  variant="standard"
                  multiline
                  fullWidth
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  sx={{
                    mt: '24px',
                    flex: 1,
                    '& .MuiInputBase-root': {
                      height: '100%',
                      alignItems: 'stretch',
                      px: 0,
                    },
                    '& .MuiInputBase-inputMultiline': {
                      padding: 0,
                      fontSize: '16px',
                      lineHeight: '150%',
                      letterSpacing: '0.15px',
                      color: 'rgba(0, 0, 0, 0.87)',
                      fontFamily: 'Roboto, -apple-system, Helvetica, sans-serif',
                      whiteSpace: 'pre-wrap',
                      overflowY: 'auto',
                      minHeight: '360px',
                      resize: 'none',
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Link
            href="#"
            sx={{
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '150%',
              letterSpacing: '0.15px',
              color: '#2196F3',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(33, 150, 243, 0.4)',
              display: 'inline-block',
              alignSelf: 'flex-start',
              '&:hover': {
                borderBottomColor: '#2196F3',
              },
            }}
          >
            Show entire thread
          </Link>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: '16px 24px',
          borderTop: '1px solid #E0E0E0',
          bgcolor: '#FFF',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          <Typography
            sx={{
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '0.15px',
              color: 'rgba(0, 0, 0, 0.87)',
            }}
          >
            Benjamin
          </Typography>
          <TextField
            label="Optional nickname"
            variant="outlined"
            size="small"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            sx={{
              width: '240px',
              '& .MuiInputLabel-root': {
                fontSize: '12px',
                lineHeight: '12px',
                letterSpacing: '0.15px',
              },
              '& .MuiOutlinedInput-input': {
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0.15px',
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '26px',
              letterSpacing: '0.46px',
              textTransform: 'none',
              px: '22px',
              py: '8px',
            }}
          >
            Discard
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '26px',
              letterSpacing: '0.46px',
              textTransform: 'none',
              px: '22px',
              py: '8px',
              color: '#FFFFFF',
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
