import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import {
  increase,
  decrease,
  removeItem,
  clearCart,
  calculateTotals,
} from "../slices/cartSlice";
import { openModal, closeModal } from "../slices/modalSlice";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCartInfo = () => {
  return useAppSelector((state) => state.cart);
};

export const useCartActions = () => {
  const dispatch = useAppDispatch();

  return {
    increase: (id: string) => dispatch(increase(id)),
    decrease: (id: string) => dispatch(decrease(id)),
    removeItem: (id: string) => dispatch(removeItem(id)),
    clearCart: () => dispatch(clearCart()),
    calculateTotals: () => dispatch(calculateTotals()),
  };
};

export const useModalInfo = () => {
  return useAppSelector((state) => state.modal);
};

export const useModalActions = () => {
  const dispatch = useAppDispatch();

  return {
    openModal: () => dispatch(openModal()),
    closeModal: () => dispatch(closeModal()),
  };
};