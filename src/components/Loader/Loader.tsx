import CircularProgress from "@mui/material/CircularProgress";

import "./Loader.css";

export const Loader = () => {
  return (
    <div className="loader-container">
      <CircularProgress />
    </div>
  );
};
