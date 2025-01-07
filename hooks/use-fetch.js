import { set } from "date-fns";
import { toast } from "sonner";

const { useState, useEffect } = require("react");

const USEFETCH = (callback) => {
  const [data, setData] = useFormState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fn = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await callback(...args);
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, setData };
};

export default USEFETCH;
