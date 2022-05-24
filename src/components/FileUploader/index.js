import { useState } from 'react';
import React, {Fragment} from 'react';
import Message from '../Message/index';
import Progress from '../ProgressBar/index';
import axios from 'axios';
import './style.css'

export const FileUploader = ({onSuccess}) => {
    const [files, setFiles] = useState([]) ;
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onInputChange = (e) => {
        console.log(e.target.files);
        setFiles(e.target.files);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        for(let i = 0; i < files.length; i++){
            data.append('file', files[i]);
        }

        axios.post('//localhost:8000/upload', data, {
            onUploadProgress : ProgressEvent => {
                setUploadPercentage(parseInt(Math.round((ProgressEvent.loaded * 100)/ ProgressEvent.total)))
                
                //Clear Percentage
                setTimeout(()=> setUploadPercentage(0), 5000);
            }
        })
            .then((response)=>{
                console.log('Success: ', response.data);
                onSuccess(response.data);
                setMessage('File Uploaded Successfully');
            })
            .catch((e) => {
                if(e.response.status == 500){
                    console.log('Error: ', e);
                    setMessage('There was a problem with the server');
                    setUploadPercentage(0);
                }
                else{
                    setMessage(e.response.data.msg);
                    setUploadPercentage(0);
                }
            })

    }

    return (
        <Fragment>
            {message ? <Message msg={message} /> : null}
            <form method="post" action="#" id="#" onSubmit={onSubmit}>
                <div className="form-group mb-4">
                    <input 
                        type="file" 
                        onChange={onInputChange}
                        className="form-control" 
                        multiple
                    />
                </div>

                <Progress percentage={uploadPercentage} />
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" style={{marginTop: 10}}>Submit File</button>
                </div>
            </form>
        </Fragment>
    )
}
