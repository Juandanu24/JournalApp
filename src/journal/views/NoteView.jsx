import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { SaveOutlined, UploadOutlined, DeleteOutline } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from "../../hooks"
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from "../../store/journal"
import { ImageGallery } from "../components"


export const NoteView = () => {
  
    const fileInputRef = useRef();

    const dispatch = useDispatch();

    const { activeNote, messageSave, isSaving } =  useSelector( state => state.journal);

    const { notes } = useSelector( state => state.journal)
    
    const { body, title, date, onInputChange, formState} = useForm( activeNote )
    
    const stringDate = useMemo( () => {
      const newDate = new Date( date );
      return newDate.toUTCString();
    },[ date ]);


    
    useEffect(() => {
      dispatch( setActiveNote( formState ))
    }, [formState])
    
    useEffect(() => {
      if( messageSave.length > 0 ) {
        Swal.fire('Nota Actualizada', messageSave, 'success');
      }
    }, [messageSave]);
    
    const saveNote = () => {
      dispatch( startSavingNote() )
    };
    
    const onInputChangeFile = ({ target }) => {      
      if( target.files === 0) return;
      dispatch( startUploadingFiles ( target.files ))
    }

    const onDelete = () => {
      dispatch( startDeletingNote() )
    };

    return (
      <Grid 
        container 
        direction='row' 
        justifyContent={'space-between'} 
        alignItems={'center'} 
        sx={{mb: 1}}
        className="animate__animated animate__fadeIn animate__faster"
        >
          <Grid>
              <Typography fontSize={39} fontWeight={'light'}>{ stringDate }</Typography>
          </Grid>

          <Grid item>
            <input
              type={'file'}
              multiple
              ref = { fileInputRef }
              onChange={ onInputChangeFile }
              style = {{ display: 'none'}}
            />
            <IconButton 
              onClick = { () => fileInputRef.current.click() }
              disabled = { isSaving }
              color={ 'primary'}
            >
              <UploadOutlined />
            </IconButton>
              <Button 
                color={'primary'} 
                sx = {{padding: 2}}
                onClick={ saveNote }
                disabled={ isSaving }
              >
                  <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
                  Guardar
              </Button>
          </Grid>

          <Grid container>
            <TextField
              type ='text'
              variant= 'filled'
              fullWidth
              placeholder="Ingrese un título"
              label='Título'
              sx ={{mb: 1, border: 'none'}}
              name ='title'
              value={ title }
              onChange ={ onInputChange }
            />
            <TextField
              type ='text'
              variant= 'filled'
              fullWidth
              multiline
              placeholder='¿Qué sucedió hoy?'
              minRows={4}
              name ='body'
              value={ body }
              onChange ={ onInputChange }
            />
            <Grid container justifyContent={'end'} >
              <Button
                onClick={ onDelete }
                sx={{ mt: 2}}
                color='error'
              >
                <DeleteOutline/>
                Borrar
              </Button>
            </Grid>
            
          </Grid>
          
          <ImageGallery
            images={ activeNote.imageURLs }
          />

      </Grid>
    )
}
