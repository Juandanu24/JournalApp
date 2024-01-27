

export const fileUpload = async( file ) => {

    if( !file ) throw new Error(`No se encuentre ningún archivo a subir`);

    const cloudUrl = `https://api.cloudinary.com/v1_1/diybegsry/upload`;

    const formData = new FormData();
    formData.append( 'upload_preset', 'journalApp-react');
    formData.append('file', file);

    try {
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });
        // console.log(resp);
        if( !resp.ok ) throw new Error( `No se pudieron cargar los archivos`);

        const cloudResp = await resp.json();
        // console.log(cloudResp);

        return cloudResp.secure_url;



    } catch (error) {
        console.log(error);
        throw new Error( error.message );
    }
}