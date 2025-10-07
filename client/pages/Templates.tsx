import { useMemo, useState, ReactNode } from "react";
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
  Button,
} from "@mui/material";
import { Search, Close, Language } from "@mui/icons-material";
import {
  templatesData,
  refundRelatedScenarios,
  Scenario,
} from "../data/templatesData";

const REQUEST_COLUMN_WIDTH = 260;
const LEFT_PANEL_WIDTH = 601;

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightText = (text: string, query: string): ReactNode => {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <Box component="span" key={index} sx={{ fontWeight: 700 }}>
        {part}
      </Box>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
};

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    templatesData[0]?.id ?? "",
  );
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(
    templatesData[0]?.scenarios[0] ?? null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return null;

    const query = searchQuery.toLowerCase();
    const results: Array<{ category: string; scenario: Scenario }> = [];

    templatesData.forEach((category) => {
      category.scenarios.forEach((scenario) => {
        if (scenario.label.toLowerCase().includes(query)) {
          results.push({ category: category.name, scenario });
        }
      });
    });

    refundRelatedScenarios.forEach((scenario) => {
      if (scenario.label.toLowerCase().includes(query)) {
        results.push({ category: "Refund related", scenario });
      }
    });

    return results;
  }, [searchQuery]);

  const groupedSearchResults = useMemo(() => {
    if (!filteredResults) return [] as Array<[string, Scenario[]]>;

    const groups = filteredResults.reduce(
      (acc, { category, scenario }) => {
        if (!acc[category]) acc[category] = [];
        acc[category].push(scenario);
        return acc;
      },
      {} as Record<string, Scenario[]>,
    );

    return Object.entries(groups);
  }, [filteredResults]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const category = templatesData.find((cat) => cat.id === categoryId);
    setSelectedScenario(category?.scenarios[0] ?? null);
  };

  const handleScenarioClick = (scenario: Scenario) => {
    setSelectedScenario(scenario);
  };

  const currentCategory = templatesData.find(
    (cat) => cat.id === selectedCategory,
  );
  const scenarioList = currentCategory?.scenarios ?? [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "calc(100vh - 42px)",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: LEFT_PANEL_WIDTH },
          borderRight: { xs: "none", md: "1px solid #E0E0E0" },
          borderBottom: { xs: "1px solid #E0E0E0", md: "none" },
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <Box sx={{ p: "12px 16px", borderBottom: "1px solid #E0E0E0" }}>
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
                  <Search sx={{ color: "rgba(0, 0, 0, 0.56)" }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearchQuery("")} size="small">
                    <Close sx={{ color: "rgba(0, 0, 0, 0.56)" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: searchQuery ? "#2196F3" : "rgba(0, 0, 0, 0.23)",
                  borderWidth: searchQuery ? "2px" : "1px",
                },
                "&:hover fieldset": {
                  borderColor: searchQuery ? "#2196F3" : "rgba(0, 0, 0, 0.23)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2196F3",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-root": {
                color: searchQuery ? "#2196F3" : "rgba(0, 0, 0, 0.60)",
                fontSize: "12px",
              },
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {filteredResults ? (
            <Box sx={{ overflow: "auto" }}>
              {groupedSearchResults.map(([categoryName, scenarios]) => (
                <Box key={categoryName}>
                  <Box
                    sx={{
                      p: "24px 16px 12px",
                      borderBottom: "1px solid #E0E0E0",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "rgba(0, 0, 0, 0.60)",
                        lineHeight: "20.02px",
                        letterSpacing: "0.17px",
                      }}
                    >
                      {categoryName}
                    </Typography>
                  </Box>
                  <List sx={{ py: "2px" }}>
                    {scenarios.map((scenario, index) => (
                      <Box key={scenario.id}>
                        <ListItem disablePadding>
                          <ListItemButton
                            onClick={() => handleScenarioClick(scenario)}
                            sx={{ px: 2, py: 1 }}
                          >
                            <ListItemText
                              primary={highlightText(
                                scenario.label,
                                searchQuery,
                              )}
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: "16px",
                                  lineHeight: "150%",
                                  letterSpacing: "0.15px",
                                },
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                        {index === 0 &&
                          categoryName === "Agoda member account" && (
                            <Divider
                              sx={{ borderColor: "rgba(0, 0, 0, 0.12)" }}
                            />
                          )}
                      </Box>
                    ))}
                  </List>
                </Box>
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  borderBottom: "1px solid #E0E0E0",
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", md: REQUEST_COLUMN_WIDTH },
                    borderRight: { xs: "none", md: "1px solid #E0E0E0" },
                    p: "12px 16px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: 500,
                      lineHeight: "160%",
                      letterSpacing: "0.15px",
                    }}
                  >
                    Request
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, p: "12px 16px" }}>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: 500,
                      lineHeight: "160%",
                      letterSpacing: "0.15px",
                    }}
                  >
                    Scenario
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  flex: 1,
                  minHeight: 0,
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", md: REQUEST_COLUMN_WIDTH },
                    borderRight: { xs: "none", md: "1px solid #E0E0E0" },
                    borderBottom: { xs: "1px solid #E0E0E0", md: "none" },
                    overflow: "auto",
                  }}
                >
                  <List sx={{ py: "2px" }}>
                    {templatesData.map((category) => (
                      <ListItem key={category.id} disablePadding>
                        <ListItemButton
                          selected={selectedCategory === category.id}
                          onClick={() => handleCategoryClick(category.id)}
                          sx={{
                            px: 2,
                            py: 1,
                            "&.Mui-selected": {
                              bgcolor: "rgba(25, 118, 210, 0.08)",
                            },
                          }}
                        >
                          <ListItemText
                            primary={category.name}
                            sx={{
                              "& .MuiTypography-root": {
                                fontSize: "16px",
                                lineHeight: "150%",
                                letterSpacing: "0.15px",
                              },
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Box sx={{ flex: 1, overflow: "auto" }}>
                  <List sx={{ py: "2px" }}>
                    {scenarioList.map((scenario) => (
                      <ListItem key={scenario.id} disablePadding>
                        <ListItemButton
                          selected={selectedScenario?.id === scenario.id}
                          onClick={() => handleScenarioClick(scenario)}
                          sx={{
                            px: 2,
                            py: 1,
                            "&.Mui-selected": {
                              bgcolor: "rgba(25, 118, 210, 0.08)",
                            },
                          }}
                        >
                          <ListItemText
                            primary={scenario.label}
                            sx={{
                              "& .MuiTypography-root": {
                                fontSize: "16px",
                                lineHeight: "150%",
                                letterSpacing: "0.15px",
                              },
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <Box
        sx={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}
      >
        <Box sx={{ borderBottom: "1px solid #E0E0E0", p: "12px 24px" }}>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "160%",
              letterSpacing: "0.15px",
            }}
          >
            Template preview
          </Typography>
        </Box>
        <Box
          sx={{
            borderBottom: "1px solid #E0E0E0",
            p: "12px 24px",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Language
            sx={{ width: 18, height: 18, color: "rgba(0, 0, 0, 0.87)" }}
          />
          <Link
            href="#"
            underline="always"
            sx={{
              color: "rgba(0, 0, 0, 0.87)",
              fontSize: "16px",
              lineHeight: "150%",
              letterSpacing: "0.15px",
            }}
          >
            English
          </Link>
        </Box>
        <Box sx={{ flex: 1, p: "40px 24px", overflow: "auto", minHeight: 0 }}>
          {selectedScenario && (
            <Typography
              sx={{
                fontSize: "16px",
                lineHeight: "150%",
                letterSpacing: "0.15px",
                color: "rgba(0, 0, 0, 0.87)",
                whiteSpace: "pre-line",
              }}
            >
              {selectedScenario.template}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            borderTop: "1px solid #E0E0E0",
            p: "16px 24px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "16px",
            bgcolor: "#FFF",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "26px",
              letterSpacing: "0.46px",
              textTransform: "none",
              px: "22px",
              py: "8px",
            }}
          >
            Copy template text
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "26px",
              letterSpacing: "0.46px",
              textTransform: "none",
              px: "22px",
              py: "8px",
              color: "#FFF",
            }}
          >
            Insert and go to draft
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
