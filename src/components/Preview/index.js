import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { FileIcon, defaultStyles } from 'react-file-icon';

export const Preview = ({files}) => {

    console.log('Preview Files:', files)

    if (!files.length){
        return null;
    }

    const uploadedFiles = files.map((file, id)=> {
        
        let name = file.originalname;
        let fileExtension = name.substring(name.indexOf('.')+1);
        
        return (
            <Col sm key = {id}>
                <div className ="container card" style={{width: 350, marginTop: 20, height: 350}}>
                    <div style = {{width:200, "padding": "20px", "margin": "auto auto"}}>      
                        <FileIcon extension = {fileExtension} {...defaultStyles[fileExtension]}/>
                    </div>
                    <div className ="card-body">
                        <h5 className ="card-title">{file.filename}</h5>
                    </div>
                </div>
            </Col>
            )
        });

    return (
        <Row>
            {uploadedFiles}
        </Row>
    )
}