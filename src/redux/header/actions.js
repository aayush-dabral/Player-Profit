import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_HEADER, GET_MENUS } from "./types";
import { header, menus } from "../../services/apis";

export const getHeaderData = createAsyncThunk(GET_HEADER, async (data) => {
  const response = await header(data);
  return response;
});

export const getMenus = createAsyncThunk(GET_MENUS, async (data) => {
  const response = await menus(data);
  return response;
});
