import { createTheme } from "@mui/material/styles";
import { COLORS } from "utils/colorConstant";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: COLORS.deepGreen,
          },
          "& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline":
            {
              borderColor: COLORS.deepGreen,
            },
          "& .MuiFormLabel-root.Mui-focused": {
            color: COLORS.deepGreen,
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "red",
          marginLeft: 0
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
  },
  typography: {
    allVariants: {
      fontFamily: "'WallopTRIAL-Regular', sans-serif",
      fontSize: "0.875rem"
    },
  },
});

export default theme;
