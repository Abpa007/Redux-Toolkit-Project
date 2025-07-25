// src/components/HabitList.tsx

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  Paper,
  Grid,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Habit, removeHabit, toggleHabit } from "../store/habit-slice";
import { RootState, AppDispatch } from "../store/store";

const HabitList: React.FC = () => {
  const habits = useSelector((state: RootState) => state.habits.habits);
  const dispatch = useDispatch<AppDispatch>();

  const today = new Date().toISOString().split("T")[0];

  const getStreak = (habit: Habit) => {
    let streak = 0;
    const currentDate = new Date();

    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];
      if (habit.completedDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  if (habits.length === 0) {
    return (
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ mt: 4 }}
      >
        No habits added yet. Start by adding your first habit!
      </Typography>
    );
  }

  return (
    <Stack spacing={2} mt={4}>
      {habits.map((habit) => (
        <Paper
          key={habit.id}
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 3,
            transition: "transform 0.2s",
            "&:hover": { transform: "scale(1.01)" },
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "primary.main" }}
              >
                {habit.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {habit.frequency.charAt(0).toUpperCase() +
                  habit.frequency.slice(1)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button
                  variant={
                    habit.completedDates.includes(today) ? "contained" : "outlined"
                  }
                  color={
                    habit.completedDates.includes(today) ? "success" : "primary"
                  }
                  onClick={() =>
                    dispatch(toggleHabit({ id: habit.id, date: today }))
                  }
                  startIcon={<CheckCircleIcon />}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    fontWeight: 500,
                    px: 2,
                  }}
                >
                  {habit.completedDates.includes(today)
                    ? "Completed"
                    : "Mark Complete"}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => dispatch(removeHabit(habit.id))}
                  startIcon={<DeleteIcon />}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    fontWeight: 500,
                    px: 2,
                  }}
                >
                  Remove
                </Button>
              </Stack>
            </Grid>
          </Grid>

          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              Current Streak:{" "}
              <Typography
                component="span"
                variant="body2"
                sx={{ fontWeight: 600, color: "primary.main" }}
              >
                {getStreak(habit)} days
              </Typography>
            </Typography>
            <LinearProgress
              variant="determinate"
              value={Math.min((getStreak(habit) / 30) * 100, 100)}
              sx={{
                mt: 1,
                height: 8,
                borderRadius: 5,
                "& .MuiLinearProgress-bar": { borderRadius: 5 },
              }}
            />
          </Box>
        </Paper>
      ))}
    </Stack>
  );
};

export default HabitList;
