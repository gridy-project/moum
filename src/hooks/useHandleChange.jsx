import { useCallback, useState } from "react";

function useHandleChange (init) {
  const [input, setInput] = useState(init);
  const handleChange = useCallback((name) => (e) => setInput((current) => ({...current, [name]: e.target.value})), []);
  return {input, setInput, handleChange};
}

export default useHandleChange;