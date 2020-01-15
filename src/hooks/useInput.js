import { useState, useCallback } from "react";

const useInput = () => {
  const [value, setValue] = useState();

  const setInputValue = useCallback(ev => {
    setValue(ev.target.value);
  }, []);

  return [value, setInputValue];
};

export default useInput;
