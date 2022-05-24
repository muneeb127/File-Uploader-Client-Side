import * as React from 'react';
import PropTypes from 'prop-types';
import { FileIcon, defaultStyles } from 'react-file-icon';
import axios from 'axios';
import FileDownload from 'js-file-download';
import { Link } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import Alert from 'react-bootstrap/Alert';

const FileList = ({files}) => {

    console.log("File Component: ", files);

    // Axios request to download the file 
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

    //Setting the clicked file in the local storage
    const onListItemClick = (file) =>{
      console.log("Clicked Item: ", file);
      localStorage.removeItem('file');
      localStorage.setItem('file', JSON.stringify(file));
    }

    let renderFiles ;
    if(files.length === 0){
        // If there are no files in the database
        renderFiles = <Alert key="primary" variant="primary">There are no files to be shown. Please add some new files. Thank You!</Alert>;
    }
    else {
        renderFiles = files.map((file, id) => {
          let dateTime = file.uploadDate + ' ' + file.uploadTime;
          return(
              <ListItem key = {id} 
                  secondaryAction=
                  {
                    <IconButton edge="end" aria-label="download" onClick = {() => onListClick(file)}>
                      <DownloadIcon/>
                    </IconButton>
                  }
              >
                  <ListItemAvatar>
                      <div style = {{width:48}}>      
                          <FileIcon extension = {file.fileExtension} {...defaultStyles[file.fileExtension]}/>
                      </div>
                  </ListItemAvatar>
                  <Link to = {{
                      pathname : '/sharefile'
                      }}
                      target = "_blank" style = {{"textDecoration":"none", "color":"black"}}
                      onClick = {() => onListItemClick(file)}
                  >
                      <ListItemText primary={file.name} secondary={dateTime} />
                  </Link>
              </ListItem>      
          ) 
        })
    }

    return (
      <List className = "container" style = {{"width" : "70%", "margin":"auto auto"}}>
          {renderFiles}
      </List>
    );
}

FileList.propTypes = {
  files: PropTypes.array.isRequired
}

export default FileList;