import { createAction } from "@reduxjs/toolkit";

export const apiRequestBegan = createAction("api/requestBegan");
export const apiRequestSuccess = createAction("api/requestSuccess");
export const apiRequestFailed = createAction("api/requestFailed");
