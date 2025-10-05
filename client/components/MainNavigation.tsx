import { Box, Avatar, Badge, Typography } from '@mui/material';
import {
  Search,
  EditNote,
  Phone,
  Email,
  Message,
  List as ListIcon,
  Help,
  Campaign,
  Storage,
  Layers,
  Window,
} from '@mui/icons-material';

const navItems = [
  { icon: <Search />, label: 'Search', badge: 1 },
  { icon: <EditNote />, label: 'Handling' },
  { icon: <Phone />, label: 'Phone' },
  { icon: <Email />, label: 'Email', active: true },
  { icon: <Message />, label: 'Message' },
  { icon: <ListIcon />, label: 'My Cases' },
  { icon: <Help />, label: 'Help' },
  { icon: <Campaign />, label: 'Updates', badge: 1 },
  { icon: <Storage />, label: 'Bulk Action' },
  { icon: <Layers />, label: 'Work\nspace' },
  { icon: <Window />, label: 'Back Office' },
];

export default function MainNavigation() {
  return (
    <Box
      sx={{
        width: '72px',
        height: '100vh',
        bgcolor: '#455A64',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      <Box sx={{ p: 1, pt: 2 }}>
        <Avatar
          sx={{
            bgcolor: '#4DD0E1',
            width: 40,
            height: 40,
            color: 'rgba(0, 0, 0, 0.87)',
            fontSize: '20px',
          }}
        >
          N
        </Avatar>
      </Box>
      
      <Box sx={{ flex: 1, width: '100%' }}>
        {navItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              p: 1,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: item.active ? '#37474F' : 'transparent',
              '&:hover': {
                bgcolor: item.active ? '#37474F' : 'rgba(255,255,255,0.05)',
              },
              cursor: 'pointer',
            }}
          >
            <Box sx={{ color: '#E3F2FD', mb: 0.5 }}>
              {item.icon}
            </Box>
            <Typography
              sx={{
                color: '#fff',
                fontSize: '12px',
                textAlign: 'center',
                lineHeight: '166%',
                letterSpacing: '0.4px',
                whiteSpace: 'pre-line',
              }}
            >
              {item.label}
            </Typography>
            {item.badge && (
              <Badge
                badgeContent={item.badge}
                color="warning"
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 14,
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      <Box sx={{ p: 1.5, mb: 2 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            bgcolor: '#E3F2FD',
            borderRadius: '4px',
          }}
        />
      </Box>
    </Box>
  );
}
