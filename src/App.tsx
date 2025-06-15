import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </LocalizationProvider>
  );
}

export default App;
