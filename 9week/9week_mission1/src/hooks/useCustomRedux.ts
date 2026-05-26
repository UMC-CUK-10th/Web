import { 
  useSelector as useDefaultSelector, 
  useDispatch as useDefaultDispatch, 
  type TypedUseSelectorHook 
} from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

export const useDispatch = () => useDefaultDispatch<AppDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;