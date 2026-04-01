import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <main className="min-h-screen px-4 py-8">
      <Outlet />
    </main>
  );
};

export default App;
