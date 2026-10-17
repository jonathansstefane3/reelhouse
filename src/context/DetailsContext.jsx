import { createContext, useCallback, useContext, useMemo, useState } from "react";
import DetailsDialog from "../components/DetailsDialog.jsx";

const DetailsContext = createContext(null);

export function DetailsProvider({ children }) {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const openDetails = useCallback((item) => {
    setSelected(item);
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openDetails }), [openDetails]);

  return (
    <DetailsContext.Provider value={value}>
      {children}
      {selected && <DetailsDialog item={selected} open={open} onClose={() => setOpen(false)} />}
    </DetailsContext.Provider>
  );
}

export function useDetails() {
  const ctx = useContext(DetailsContext);
  if (!ctx) throw new Error("useDetails must be used inside DetailsProvider");
  return ctx;
}
