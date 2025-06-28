import React, { useState } from 'react'
import { Box, TextField } from '@mui/material'
const AddHabitForm: React.FC = () => {
    const [name ,setName] = useState<string>("")
    // const [frequency, setFrequency] = useState<"daily" | "weekly">("daily") 
  return (
    <form >
        <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
        }}>
            <TextField
              id=""
              label="Habit Name"
              value={name}
              onChange={(e)=> setName(e.target.value)}
              fullWidth
            />
        </Box>
    </form>
  )
}

export default AddHabitForm