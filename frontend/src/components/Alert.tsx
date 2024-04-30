import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Alert({ error, route }: { error: string; route: string }) {
  const navigate = useNavigate();
  toast.error(`${error}`, { duration: 3000 });
  useEffect(() => {
    navigate(`/${route}`);
  });
  return <>error</>;
}

export default Alert;
