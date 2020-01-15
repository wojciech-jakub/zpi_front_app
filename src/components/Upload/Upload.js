import React, { useCallback, useContext, useState, useMemo } from "react";
import { Button, Loader } from "semantic-ui-react";
import { SessionContext } from "../../hooks/useAuth";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  marginBottom: "16px"
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

const useFileUpload = file => {
  const [isLoading, setLoading] = useState(false);
  const { state } = useContext(SessionContext);
  const uploadAction = useCallback(async () => {
    setLoading(true);
    const image = `${new Date().getTime().toString()}".jpg"`;
    const body = {
      token: state.session.body,
      image_name: image,
      force: 1,
      image: file
    };

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/uploadimage`, {
        method: "POST",
        headers: {},
        body: JSON.stringify(body)
      });
      setLoading(false);
    } catch (ex) {
      setLoading(false);
    }
  });

  return [uploadAction, isLoading];
};

const Upload = () => {
  const [file, setFile] = useState(null);
  const [upload, isLoading] = useFileUpload(file);

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();

    reader.onload = function() {
      let image = new Date().getTime().toString();
      image += ".jpg";
      setFile(reader.result.replace("data:image/jpeg;base64,", ""));
    };

    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone({ accept: "image/*", onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject]
  );

  const files = acceptedFiles.map(file => <li key={file.path}>{file.path}</li>);

  return (
    <React.Fragment>
      <Loader active={isLoading} size="large" />
      <div>
        <div {...getRootProps({ style })}>
          <input {...getInputProps({ multiple: false })} />
          {isDragActive ? (
            <p>Drop the file here ...</p>
          ) : (
            <p>Drag 'n' drop some file here, or click to select file</p>
          )}
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
        <Button disabled={!file} onClick={upload}>
          Submit
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Upload;
