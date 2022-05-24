import { useState } from 'react';
import React from "react";
import {FileUploader} from '../components/FileUploader/index';
import {Preview} from '../components/Preview/index';

const Home = () => {
    const [files, setFiles] = useState([]);

    const onSuccess = (savedFiles) => {
      setFiles(savedFiles);
      console.log("Files: ", files);
    };

    return (
        <>
            <h4 className='display-4 text-center mb-4'>
                  <i className='fa fa-file'/> File System
            </h4>
            <FileUploader onSuccess={onSuccess}/>
            <Preview files = {files}/> 
        </>
    )
};

export default Home;