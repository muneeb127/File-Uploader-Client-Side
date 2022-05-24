import { useState, useEffect } from 'react';
import React from "react";
import axios from 'axios';
import FileList from '../components/FileList/index';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Files = () => {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Request to get all file names
    const getAllFiles = () => {
        axios.get('//localhost:8000/allfiles')
            .then((response) => {
                console.log("All Files: ", response.data);
                setFiles(response.data);
                setIsLoading(false);
            })
            .catch((e)=> {
                console.log("Error: ", e);
            })
    }

    useEffect (() => {
        getAllFiles();
    }, []);

    // Creating file Object for rendering
    let fileData = files.map((file) => {
        console.log("File List: ", file);
        let fileInfo = {};

        //Processing the date 
        let uploadDate = file.substring(0, file.indexOf("-"));
        uploadDate = Number(uploadDate);
        const date = new Date(uploadDate);
        uploadDate = date.toLocaleDateString();
        let uploadTime = date.toLocaleTimeString();

        //Getting file extension
        let fileExtension = file.substring(file.indexOf('.')+1);
        fileInfo = {
            name: file,
            uploadDate,
            uploadTime,
            fileExtension
        };

        console.log("File: ", fileInfo);
        return fileInfo;
    });

    console.log(fileData);

    return(
        <>
        <h4 className='display-4 text-center mb-4'>
            <i className='fa fa-file'/> List of Files
        </h4>
        <p style = {{color: "grey", textAlign: "center"}}>Please click filename to share it with others or click download button to download the file.</p>
        {
            isLoading ? 
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box> : 
            <FileList files = {fileData}/>
        }
        </>
    )
};

export default Files;