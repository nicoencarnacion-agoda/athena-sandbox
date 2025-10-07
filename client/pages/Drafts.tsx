import { useState, KeyboardEvent, useRef } from 'react';
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
              disableUnderline: true,
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
                '& .MuiInput-input': {
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
                  sx={{
                    width: '78.519px',
                    height: '40px',
                    position: 'relative',
                    mb: '40px',
                  }}
                >
                  <svg width="79" height="40" viewBox="0 0 79 40" fill="none">
                    <circle cx="23.5" cy="34" r="6" fill="#FCB716" />
                    <circle cx="7.5" cy="34" r="6" fill="#EE363F" />
                    <circle cx="39.5" cy="34" r="6" fill="#07AF56" />
                    <circle cx="72.5" cy="34" r="6" fill="#04A9DF" />
                    <circle cx="56.5" cy="34" r="6" fill="#A1479A" />
                    <path
                      d="M0 16.844C0 13.067 3.032 10.216 6.783 10.216C10.559 10.216 13.565 13.042 13.565 16.819V22.625C13.565 23.216 13.155 23.627 12.538 23.627C11.895 23.627 11.51 23.216 11.51 22.625V20.929H11.407C10.611 22.291 9.018 23.473 6.654 23.473C3.006 23.473 0 20.647 0 16.844ZM11.562 16.844C11.562 14.121 9.506 12.066 6.783 12.066C4.059 12.066 2.004 14.121 2.004 16.844C2.004 19.567 4.059 21.623 6.783 21.623C9.506 21.623 11.562 19.567 11.562 16.844Z"
                      fill="#5A5B5B"
                    />
                    <path
                      d="M2.859 27.763C2.32 27.506 2.062 27.044 2.268 26.504C2.474 25.939 2.988 25.708 3.527 25.965C4.452 26.401 5.608 26.71 6.841 26.71C9.899 26.71 11.749 24.886 11.749 21.777V20.929H11.646C10.849 22.291 9.257 23.472 6.893 23.472C3.244 23.472 0.238 20.646 0.238 16.844C0.238 13.067 3.27 10.215 7.022 10.215C10.798 10.215 13.804 13.042 13.804 16.818V21.648C13.804 25.811 11.132 28.611 6.764 28.611C5.429 28.611 4.092 28.354 2.859 27.763ZM11.8 16.844C11.8 14.121 9.745 12.065 7.022 12.065C4.298 12.065 2.243 14.121 2.243 16.844C2.243 19.567 4.298 21.623 7.022 21.623C9.745 21.623 11.8 19.567 11.8 16.844Z"
                      fill="#5A5B5B"
                    />
                    <path
                      d="M0.477 16.844C0.477 13.067 3.483 10.216 7.26 10.216C11.036 10.216 14.042 13.067 14.042 16.844C14.042 20.621 11.036 23.473 7.26 23.473C3.483 23.473 0.477 20.621 0.477 16.844ZM12.039 16.844C12.039 14.121 9.983 12.066 7.26 12.066C4.536 12.066 2.481 14.121 2.481 16.844C2.481 19.567 4.536 21.623 7.26 21.623C9.983 21.623 12.039 19.567 12.039 16.844Z"
                      fill="#5A5B5B"
                      transform="translate(32 0)"
                    />
                    <path
                      d="M0.715 21.844C0.715 18.067 3.695 15.216 7.369 15.216C9.733 15.216 11.326 16.398 12.122 17.759H12.225V11.002C12.225 10.411 12.636 10 13.253 10C13.895 10 14.28 10.411 14.28 11.002V21.87C14.28 25.646 11.274 28.473 7.498 28.473C3.747 28.473 0.715 25.621 0.715 21.844ZM12.276 21.844C12.276 19.121 10.221 17.066 7.498 17.066C4.774 17.066 2.719 19.121 2.719 21.844C2.719 24.567 4.774 26.623 7.498 26.623C10.221 26.623 12.276 24.567 12.276 21.844Z"
                      fill="#5A5B5B"
                      transform="translate(49 -10)"
                    />
                    <path
                      d="M0.953 16.844C0.953 13.067 3.985 10.216 7.736 10.216C11.513 10.216 14.519 13.042 14.519 16.819V22.625C14.519 23.216 14.108 23.627 13.491 23.627C12.849 23.627 12.463 23.216 12.463 22.625V20.929H12.361C11.564 22.291 9.971 23.473 7.608 23.473C3.959 23.473 0.953 20.647 0.953 16.844ZM12.515 16.844C12.515 14.121 10.459 12.066 7.736 12.066C5.013 12.066 2.957 14.121 2.957 16.844C2.957 19.567 5.013 21.623 7.736 21.623C10.459 21.623 12.515 19.567 12.515 16.844Z"
                      fill="#5A5B5B"
                      transform="translate(65 0)"
                    />
                  </svg>
                </Box>

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
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
