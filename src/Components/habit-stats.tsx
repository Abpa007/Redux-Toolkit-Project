import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Typography,
  Box,
  LinearProgress,
  Stack,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { AppDispatch, RootState } from "../store/store";
import { fetchHabits, Habit } from "../store/habit-slice";

const HabitStats: React.FC = () => {
  const { habits, isLoading, error } = useSelector(
    (state: RootState) => state.habits
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  const getTotalHabits = () => habits.length;

  const getCompletedToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return habits.filter((habit) => habit.completedDates.includes(today)).length;
  };

  const getLongestStreak = () => {
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
    return Math.max(...habits.map(getStreak), 0);
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 3 },
        mt: 4,
        borderRadius: 3,
        backgroundColor: "background.paper",
      }}
      aria-live="polite"
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 600, textAlign: "center" }}
      >
        📈 Habit Statistics
      </Typography>
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <AssignmentIcon color="primary" />
          <Typography variant="body1">
            Total Habits:{" "}
            <Typography component="span" color="primary" fontWeight={600}>
              {getTotalHabits()}
            </Typography>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <CheckCircleIcon color="success" />
          <Typography variant="body1">
            Completed Today:{" "}
            <Typography component="span" color="success.main" fontWeight={600}>
              {getCompletedToday()}
            </Typography>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <EmojiEventsIcon color="warning" />
          <Typography variant="body1">
            Longest Streak:{" "}
            <Typography component="span" color="warning.main" fontWeight={600}>
              {getLongestStreak()} days
            </Typography>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default HabitStats;
