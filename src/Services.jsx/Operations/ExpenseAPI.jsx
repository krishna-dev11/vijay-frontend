import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { setLoading } from "../../Slices/Auth";
import { setExpenseData } from "../../Slices/expenseSlice";
import { ExpenseEndPoints } from "../apis";
import { setUser } from "../../Slices/Profile";

const BASE = "http://localhost:4000/api/v1/expense";
const {ADD_EXPENSE_API} = ExpenseEndPoints

export function addExpense(form, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const res = await apiConnector(
        "POST",
        ADD_EXPENSE_API,
        form,
        { Authorization: `Bearer ${token}` }
      );

                  dispatch(setUser(res.data.User))
                  localStorage.setItem("user" , JSON.stringify(res.data.User))

      toast.success("Expense Added");
    } catch (e) {
      toast.error("Failed to add expense");
    }

    dispatch(setLoading(false));
  };
}

export function getExpenseByMonth(year, month, token) {
  return async (dispatch) => {
    const res = await apiConnector(
      "GET",
      `${BASE}/getExpenseByMonth?year=${year}&month=${month}`,
      null,
      { Authorization: `Bearer ${token}` }
    );

    dispatch(setExpenseData(res.data.data));
  };
}

export function getExpenseByWeek(year, month, week, token) {
  return async (dispatch) => {
    const res = await apiConnector(
      "GET",
      `${BASE}/getExpenseByWeek?year=${year}&month=${month}&week=${week}`,
      null,
      { Authorization: `Bearer ${token}` }
    );

    dispatch(setExpenseData(res.data.data));
  };
}

export function getExpenseByDay(year, month, day, token) {
  return async (dispatch) => {
    const res = await apiConnector(
      "GET",
      `${BASE}/getExpenseByDay?year=${year}&month=${month}&day=${day}`,
      null,
      { Authorization: `Bearer ${token}` }
    );

    dispatch(setExpenseData(res.data.data));
  };
}

export function getExpenseByYear(year, token) {
  return async (dispatch) => {
    const res = await apiConnector(
      "GET",
      `${BASE}/fetchAllExpenseListOfTheYear?year=${year}`,
      null,
      { Authorization: `Bearer ${token}` }
    );

    dispatch(setExpenseData(res.data.data));
  };
}

export function deleteExpense(expenseId, token) {
  return async (dispatch) => {
    await apiConnector(
      "DELETE",
      `${BASE}/deleteExpense`,
      { expenseId },
      { Authorization: `Bearer ${token}` }
    );

    toast.success("Deleted");
  };
}
