import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const tealSeaGreenTheme = createTheme({
    palette: {
        primary: {
            main: '#3D200B'
        },
        secundary: {
            main: '#0B6161'
        },
        error: {
            main: red.A400
        }
    }
});