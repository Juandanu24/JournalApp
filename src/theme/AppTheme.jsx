
import { ThemeProvider } from "@emotion/react"
import CssBaseline from '@mui/material/CssBaseline';

import { tealSeaGreenTheme } from "./"



export const AppTheme = ({children}) => {

  return (
    <ThemeProvider theme={ tealSeaGreenTheme }>

        <CssBaseline />
        { children }
    </ThemeProvider>
  )
};
