
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