import {useEffect, useState} from 'react';
import React from 'react';
import axios from 'axios';
import FileDownload from 'js-file-download';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { ExpirationMessage } from '../components/ExpirationMessage';

import Card from 'react-bootstrap/Card';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import Alert from 'react-bootstrap/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ShareFile = () => {
    
    const [file, setFile] = useState({});
    const [shouldRender, setShouldRender] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const file = JSON.parse(localStorage.getItem('file'));
        if(file){
            setFile(file);
            setIsLoading(false);
        }
        else{
            setIsLoading(false);
        }

        setTimeout(()=> {
            setShouldRender(false);
            localStorage.removeItem('file');
        }, 10000)

    }, [])

    const onListClick = (file) => {
        console.log(file);

        axios.get('//localhost:8000/download', {
          params: {
              name : file.name
          },
          responseType: "blob"
        })
          .then((response) => {
              console.log(response.data);
              FileDownload(response.data, file.name);
          })
          .catch((error) =>{
              console.log(error);
          })
    }

    const RenderedFile = () => {
        //To display expiration message when the link has expired and page is refreshed
        if(Object.keys(file).length === 0){
            return(
                <ExpirationMessage />
            )
        }
        else{
            return (
                <div>
                    <h4 className='display-4 text-center mb-4'>
                        <i className='fa fa-file'/> Shared File
                    </h4>
                    <p style = {{color: "grey", textAlign: "center"}}>This a shareable link. It will expire in 10 seconds</p>
                
                    <Card style={{ width: '30rem' , "margin":"auto"}}>
                        <div style = {{width:200, "margin": "auto", "padding":"10px"}}> 
                            <FileIcon extension = {file.fileExtension} {...defaultStyles[file.fileExtension]} />
                        </div>
                        <Card.Body>
                            <Card.Title>{file.name}</Card.Title>
                            <IconButton edge="end" aria-label="download" onClick = {() => onListClick(file)}>
                                <DownloadIcon/>
                            </IconButton>
                        </Card.Body>
                    </Card>
                </div>
            )
        }
    }

    console.log("File: ", file);

    return (
        <>
            <div className='text-center'>
                {
                    isLoading ? 
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box> :
                    (shouldRender ? <RenderedFile /> : <ExpirationMessage />)
                }
                
            </div>
        </>
    )
}

export default ShareFile;
