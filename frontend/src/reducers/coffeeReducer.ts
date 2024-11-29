import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import coffeeService from "../services/coffee";
import { AppDispatch } from "../store";
import { Coffee, NewCoffee } from "../utils/types";

interface CoffeeState {
  items: Coffee[];
  loading: boolean;
  error: string | null;
}

const initialState: CoffeeState = {
  items: [],
  loading: false,
  error: null,
};

const coffeeSlice = createSlice({
  name: "coffees",
  initialState,
  reducers: {
    operationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    operationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCoffeesSuccess: (state, action: PayloadAction<Coffee[]>) => {
      state.items = action.payload;
      state.loading = false;
    },
    addCoffeeSuccess: (state, action: PayloadAction<Coffee>) => {
      state.items.push(action.payload);
      state.loading = false;
    },
    removeCoffeeSuccess: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter(
        (coffee) => coffee.id !== action.payload.id
      );
      state.loading = false;
    },
    updateCoffeeSuccess: (state, action: PayloadAction<Coffee>) => {
      state.items = state.items.map((coffee) =>
        coffee.id === action.payload.id ? action.payload : coffee
      );
    },
  },
});

export const {
  operationStart,
  operationFailure,
  fetchCoffeesSuccess,
  addCoffeeSuccess,
  removeCoffeeSuccess,
  updateCoffeeSuccess,
} = coffeeSlice.actions;

export const initializeCoffees = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(operationStart());
    try {
      const coffees = await coffeeService.getAll();
      dispatch(fetchCoffeesSuccess(coffees));
    } catch (error) {
      dispatch(
        operationFailure(
          error instanceof Error ? error.message : "Unknown error"
        )
      );
    }
  };
};

export const addCoffee = (coffeeData: NewCoffee) => {
  return async (dispatch: AppDispatch) => {
    dispatch(operationStart());
    try {
      const createdCoffee: Coffee = await coffeeService.addNew(coffeeData);
      dispatch(addCoffeeSuccess(createdCoffee));
    } catch (error) {
      dispatch(
        operationFailure(
          error instanceof Error ? error.message : "Unknown error"
        )
      );
    }
  };
};

export const updateCoffee = (id: string, coffeeData: Partial<Coffee>) => {
  return async (dispatch: AppDispatch) => {
    dispatch(operationStart());
    try {
      const updatedCoffee = await coffeeService.update(id, coffeeData);
      dispatch(updateCoffeeSuccess(updatedCoffee));
    } catch (error) {
      dispatch(
        operationFailure(
          error instanceof Error ? error.message : "Unknown error"
        )
      );
    }
  };
};

export const removeCoffee = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(operationStart());
    try {
      await coffeeService.remove(id);
      dispatch(removeCoffeeSuccess({ id }));
    } catch (error) {
      dispatch(
        operationFailure(
          error instanceof Error ? error.message : "Unknown error"
        )
      );
    }
  };
};

export default coffeeSlice.reducer;
