import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

type FilledAlertProps = {
  message: string | null;
  severity: "error" | "info";
};

export const FilledAlert = ({ message, severity }: FilledAlertProps) => {
  return (
    <Stack sx={{ width: "50%" }} spacing={2}>
      <Alert variant="filled" severity={severity}>
        {message}
      </Alert>
    </Stack>
  );
};
