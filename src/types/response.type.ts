import { BaseQueryApi } from "@reduxjs/toolkit/query";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
}

export type TResponse = {
    data?: any;
    error?: any;
    meta?: TMeta;
    success?: boolean;
    message?: string;
}

export type TResponseRedux = TResponse & BaseQueryApi

