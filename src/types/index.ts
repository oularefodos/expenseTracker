import { string } from "yup"

export enum ExpenseType {
    EXPENSED,
    INCOME
}

export enum UserRoles {
    ADMIN,
    USER
}

export interface User {
    name : string,
    email : string,
    balance : number
}

export enum EmailType {
    PASSWORD,
    EMAIL
}

export interface EmailValidationParams {
    token : string
};