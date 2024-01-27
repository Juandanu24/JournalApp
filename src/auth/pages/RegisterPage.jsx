import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserEmailPassword } from '../../store/auth';

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [( value ) => value.includes('@'), 'La direccion e-mail debe incluir un @'],
  password: [( value ) => value.length >= 6, 'El password debe tener al menos 6 caracteres.'],
  displayName: [( value ) => value.length >= 2, 'El nombre es obligatorio.'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch()
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const {status, errorMessage } = useSelector( state => state.auth);
  
  const isCheckingAuth = useMemo(() => status === 'checking', [status])

  const { displayName, email, password, onInputChange, formState, 
          passwordValid, displayNameValid, emailValid, isFormValid
  } = useForm( formData, formValidations);


  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if( !isFormValid ) return;
    dispatch( startCreatingUserEmailPassword( formState ));
  }

  return (
    
      <AuthLayout title='Crear cuenta'>
          <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
            <Grid container>
                <Grid item xs={ 12 } sx={{mt:1}} >
                    <TextField 
                      label= 'Nombre'
                      type='text'
                      placeholder="Nombre completo"
                      fullWidth
                      name='displayName'
                      value={displayName}
                      onChange={onInputChange}
                      error={!!displayNameValid && formSubmitted}
                      helperText={displayNameValid }
                    />
                </Grid>
                <Grid item xs={ 12 } sx={{mt:1}} >
                    <TextField 
                      label= 'Correo'
                      type='email'
                      placeholder="correo@gmail.com"
                      fullWidth
                      name='email'
                      value={email}
                      onChange={onInputChange}
                      error={!!emailValid && formSubmitted}
                      helperText={emailValid }
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
                      error={!!passwordValid && formSubmitted}
                      helperText={passwordValid}
                    />
                </Grid>
                {/* <Grid item xs={ 12 } sx={{mt:2}} >
                    <TextField 
                      label= 'Confirmar contraseña'
                      type='password'
                      placeholder="Confirmar contraseña"
                      fullWidth
                    />
                </Grid> */}


                <Grid container spacing={2} sx={{mt:2}}>

                    <Grid 
                      item 
                      xs={12}
                      display = {!!errorMessage ? '' : 'none'}
                    >
                      <Alert severity='error'>{ errorMessage }</Alert>
                    </Grid>

                    <Grid item xs={12}>
                      <Button 
                        disabled = { isCheckingAuth }
                        variant="contained" 
                        fullWidth
                        type='submit'
                      >
                        Crear Cuenta
                      </Button>
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                      <Button variant="contained" fullWidth>
                        <Google/>
                          <Typography sx={{ml:1}}>Google</Typography>
                      </Button>
                    </Grid> */}
                </Grid>

                <Grid container justifyContent='end'  direction={'row'} sx={{mt: 1.5}}>
                    <Typography sx={{mr : 1}}>¿Ya tienes una cuenta?</Typography>
                  <Link component={ RouterLink } color={'inherit'}  to='/auth/login'>
                    Ingresar
                  </Link>
                </Grid>

            </Grid>
          </form>
      </AuthLayout>    

  )
}
