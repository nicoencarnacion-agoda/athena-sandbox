import { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
  Link,
} from '@mui/material';
import { Search, Close, Language } from '@mui/icons-material';
import { templatesData, refundRelatedScenarios, TemplateCategory, Scenario } from '../data/templatesData';

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState<string>('frequently-used');
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(
    templatesData[0].scenarios[0]
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Filter scenarios based on search
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return null;

    const query = searchQuery.toLowerCase();
    const results: Array<{ category: string; scenario: Scenario }> = [];

    // Search in main categories
    templatesData.forEach((category) => {
      category.scenarios.forEach((scenario) => {
        if (scenario.label.toLowerCase().includes(query)) {
          results.push({ category: category.name, scenario });
        }
      });
    });

    // Search in refund related scenarios
    refundRelatedScenarios.forEach((scenario) => {
      if (scenario.label.toLowerCase().includes(query)) {
        results.push({ category: 'Refund related', scenario });
      }
    });

    return results;
  }, [searchQuery]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const category = templatesData.find((cat) => cat.id === categoryId);
    if (category && category.scenarios.length > 0) {
      setSelectedScenario(category.scenarios[0]);
    }
  };

  const handleScenarioClick = (scenario: Scenario) => {
    setSelectedScenario(scenario);
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <Box component="span" key={index} sx={{ fontWeight: 700 }}>
              {part}
            </Box>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const currentCategory = templatesData.find((cat) => cat.id === selectedCategory);

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 42px)' }}>
      {/* Search and Categories Column */}
      <Box
        sx={{
          width: 601,
          borderRight: '1px solid #E0E0E0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Search Field */}
        <Box sx={{ p: '12px 16px', borderBottom: '1px solid #E0E0E0' }}>
          <TextField
            fullWidth
            placeholder="Type to search scenario"
            variant="outlined"
            size="medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'rgba(0, 0, 0, 0.56)' }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearchQuery('')} size="small">
                    <Close sx={{ color: 'rgba(0, 0, 0, 0.56)' }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: searchQuery ? '#2196F3' : 'rgba(0, 0, 0, 0.23)',
                  borderWidth: searchQuery ? '2px' : '1px',
                },
                '&:hover fieldset': {
                  borderColor: searchQuery ? '#2196F3' : 'rgba(0, 0, 0, 0.23)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2196F3',
                  borderWidth: '2px',
                },
              },
              '& .MuiInputLabel-root': {
                color: searchQuery ? '#2196F3' : 'rgba(0, 0, 0, 0.60)',
                fontSize: '12px',
              },
            }}
          />
        </Box>

        {/* Categories or Search Results */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {filteredResults ? (
            // Search Results
            <Box>
              {Object.entries(
                filteredResults.reduce((acc, { category, scenario }) => {
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(scenario);
                  return acc;
                }, {} as Record<string, Scenario[]>)
              ).map(([categoryName, scenarios]) => (
                <Box key={categoryName}>
                  <Box sx={{ p: '24px 16px 12px', borderBottom: '1px solid #E0E0E0' }}>
                    <Typography
                      sx={{
                        fontSize: '14px',
                        color: 'rgba(0, 0, 0, 0.60)',
                        lineHeight: '20.02px',
                        letterSpacing: '0.17px',
                      }}
                    >
                      {categoryName}
                    </Typography>
                  </Box>
                  <List sx={{ py: '2px' }}>
                    {scenarios.map((scenario, index) => (
                      <Box key={scenario.id}>
                        <ListItem disablePadding>
                          <ListItemButton
                            onClick={() => handleScenarioClick(scenario)}
                            sx={{ px: 2, py: 1 }}
                          >
                            <ListItemText
                              primary={highlightText(scenario.label, searchQuery)}
                              sx={{
                                '& .MuiTypography-root': {
                                  fontSize: '16px',
                                  lineHeight: '150%',
                                  letterSpacing: '0.15px',
                                },
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                        {index === 0 && categoryName === 'Agoda member account' && (
                          <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.12)' }} />
                        )}
                      </Box>
                    ))}
                  </List>
                </Box>
              ))}
            </Box>
          ) : (
            // Categories List
            <>
              <Box sx={{ borderBottom: '1px solid #E0E0E0', p: '12px 16px' }}>
                <Typography
                  sx={{
                    fontSize: '20px',
                    fontWeight: 500,
                    lineHeight: '160%',
                    letterSpacing: '0.15px',
                  }}
                >
                  Request
                </Typography>
              </Box>
              <List sx={{ py: '2px' }}>
                {templatesData.map((category) => (
                  <ListItem key={category.id} disablePadding>
                    <ListItemButton
                      selected={selectedCategory === category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      sx={{
                        px: 2,
                        py: 1,
                        '&.Mui-selected': {
                          bgcolor: 'rgba(25, 118, 210, 0.08)',
                        },
                      }}
                    >
                      <ListItemText
                        primary={category.name}
                        sx={{
                          '& .MuiTypography-root': {
                            fontSize: '16px',
                            lineHeight: '150%',
                            letterSpacing: '0.15px',
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      </Box>

      {/* Scenarios Column */}
      {!filteredResults && currentCategory && (
        <Box sx={{ width: 341, borderRight: '1px solid #E0E0E0', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ borderBottom: '1px solid #E0E0E0', p: '12px 16px' }}>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: '160%',
                letterSpacing: '0.15px',
              }}
            >
              Scenario
            </Typography>
          </Box>
          <List sx={{ py: '2px', flex: 1, overflow: 'auto' }}>
            {currentCategory.scenarios.map((scenario) => (
              <ListItem key={scenario.id} disablePadding>
                <ListItemButton
                  selected={selectedScenario?.id === scenario.id}
                  onClick={() => handleScenarioClick(scenario)}
                  sx={{
                    px: 2,
                    py: 1,
                    '&.Mui-selected': {
                      bgcolor: 'rgba(25, 118, 210, 0.08)',
                    },
                  }}
                >
                  <ListItemText
                    primary={scenario.label}
                    sx={{
                      '& .MuiTypography-root': {
                        fontSize: '16px',
                        lineHeight: '150%',
                        letterSpacing: '0.15px',
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Template Preview Column */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ borderBottom: '1px solid #E0E0E0', p: '12px 24px' }}>
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '160%',
              letterSpacing: '0.15px',
            }}
          >
            Template preview
          </Typography>
        </Box>
        <Box sx={{ borderBottom: '1px solid #E0E0E0', p: '12px 24px', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Language sx={{ width: 18, height: 18, color: 'rgba(0, 0, 0, 0.87)' }} />
          <Link
            href="#"
            underline="always"
            sx={{
              color: 'rgba(0, 0, 0, 0.87)',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0.15px',
            }}
          >
            English
          </Link>
        </Box>
        <Box sx={{ flex: 1, p: '40px 24px', overflow: 'auto' }}>
          {selectedScenario && (
            <Typography
              sx={{
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0.15px',
                color: 'rgba(0, 0, 0, 0.87)',
                whiteSpace: 'pre-line',
              }}
            >
              {selectedScenario.template}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
