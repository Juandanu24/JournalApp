import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startGoogleSingIn, startLoginEmailPassword } from '../../store/auth';


const formData = {
  email: '', 
  password: '',
};

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  const { email, password, onInputChange} = useForm(formData);

  const isAuthenticating = useMemo( () => status === 'checking', [status])
 
  const onSubmit = (event) => {
    event.preventDefault()
    dispatch( startLoginEmailPassword({ email, password}) )
  }
  const onGoogleSingIn = () => {
    dispatch( startGoogleSingIn() ) 
  }

  return (

      <AuthLayout title='Login'>
          <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
            <Grid container>

                <Grid item xs={ 12 } sx={{mt:1}} >
                    <TextField 
                      label= 'Correo'
                      type='email'
                      placeholder="correo@gmail.com"
                      fullWidth
                      name='email'
                      value={email}
                      onChange={onInputChange}
                    />
                </Grid>

                <Grid item xs={ 12 } sx={{mt:2}} >
                    <TextField 
                      label= 'Contraseña'
                      type='password'
                      placeholder="Contraseña"
                      fullWidth
                      name='password'
                      value={password}
                      onChange={onInputChange}
                    />
                </Grid>
                <Grid container 
                    sx={{mt: 2}}
                    display = { errorMessage ? '' : 'none'}
                >
                  <Grid
                  item 
                  xs={12} 
                  >
                        <Alert severity='error'>{ errorMessage }</Alert>
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{mt:2}}>
                    <Grid item xs={12} sm={6}>
                      <Button
                        disabled =  { isAuthenticating }
                        type ='submit' 
                        variant ="contained" 
                        fullWidth
                      >
                        Login
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button 
                        disabled =  { isAuthenticating }
                        variant="contained" 
                        fullWidth
                        onClick={ onGoogleSingIn }>
                        <Google/>
                          <Typography sx={{ml:1}}>Google</Typography>
                      </Button>
                    </Grid>
                </Grid>

                <Grid container justifyContent='end'  direction={'row'}>
                  <Link component={ RouterLink } color={'inherit'} sx={{mt: 1}} to='/auth/register'>
                    Crear usuario
                  </Link>
                </Grid>

            </Grid>
          </form>
      </AuthLayout>    

  )
}
