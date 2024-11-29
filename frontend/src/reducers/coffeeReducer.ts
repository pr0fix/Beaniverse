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
    fetchCoffeesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCoffeesSuccess: (state, action: PayloadAction<Coffee[]>) => {
      state.items = action.payload;
      state.loading = false;
    },
    fetchCoffeesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addCoffeeSuccess: (state, action: PayloadAction<Coffee>) => {
      state.items.push(action.payload);
    },
  },
});

export const {
  fetchCoffeesStart,
  fetchCoffeesSuccess,
  fetchCoffeesFailure,
  addCoffeeSuccess,
} = coffeeSlice.actions;

export const initializeCoffees = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchCoffeesStart());
      const coffees = await coffeeService.getAll();
      dispatch(fetchCoffeesSuccess(coffees));
    } catch (error) {
      dispatch(
        fetchCoffeesFailure(
          error instanceof Error ? error.message : "Unknown error"
        )
      );
    }
  };
};

export const addCoffee = (coffeeData: NewCoffee) => {
  return async (dispatch: AppDispatch) => {
    try {
      const createdCoffee: Coffee = await coffeeService.addNew(coffeeData);
      dispatch(addCoffeeSuccess(createdCoffee));
    } catch (error) {}
  };
};

export default coffeeSlice.reducer;
