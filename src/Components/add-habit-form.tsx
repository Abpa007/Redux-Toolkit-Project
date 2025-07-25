// src/components/AddHabitForm.tsx

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { addHabit } from "../store/habit-slice";
import { AppDispatch } from "../store/store";

const AddHabitForm: React.FC = () => {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(addHabit({ name, frequency }));
      setName("");
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: { xs: 2, sm: 3 },
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}
      >
        Add a New Habit
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Habit Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter habit name"
            fullWidth
            variant="outlined"
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel>Frequency</InputLabel>
            <Select
              value={frequency}
              label="Frequency"
              onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              borderRadius: 2,
              py: 1.2,
              transition: "all 0.3s ease",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            Add Habit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default AddHabitForm;
