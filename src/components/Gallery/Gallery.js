import React, { useState, useEffect, useContext, useMemo } from "react";
import { SessionContext } from "../../hooks/useAuth";
import ReactImageGallery from "react-image-gallery";
import { Loader } from "semantic-ui-react";

const useImages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useContext(SessionContext);
  const [data, setData] = useState([]);

  const body = { token: state.session.body };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetch(
          `${process.env.REACT_APP_API_URL}/imagelist`,
          {
            method: "POST",
            headers: {},
            body: JSON.stringify(body)
          }
        );

        const files = await result.json();

        setData(files.body);
        setIsLoading(false);
      } catch (ex) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [body.token]);

  return [data, isLoading];
};

export const GalleryComponent = () => {
  const [files, isLoading] = useImages();

  const images = useMemo(() => {
    return (files || []).map(file => ({ original: file, thumbnail: file }));
  }, [files]);

  return (
    <div>
      <Loader active={isLoading} size="large" />
      <ReactImageGallery items={images} />
    </div>
  );
};

export default GalleryComponent;
