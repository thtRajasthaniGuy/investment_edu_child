const CHILD_KEY = "child";
const INVESTMENT_KEY = "investmen";

export const saveChild = (child: unknown) =>
  localStorage.setItem(CHILD_KEY, JSON.stringify(child));

export const loadChild = () =>
  JSON.parse(localStorage.getItem(CHILD_KEY) || "null");

export const saveInvestment = (inv: unknown) =>
  localStorage.setItem(INVESTMENT_KEY, JSON.stringify(inv));

export const loadInvestment = () =>
  JSON.parse(localStorage.getItem(INVESTMENT_KEY) || "null");
