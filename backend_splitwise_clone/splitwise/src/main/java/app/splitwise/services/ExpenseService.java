package app.splitwise.services;


import app.splitwise.dtos.ApiResponse;
import app.splitwise.dtos.CreateEvenExpenseRequestBody;
import app.splitwise.dtos.CreateUnevenExpenseRequestBody;
import app.splitwise.dtos.UserOwesDto;

import java.util.List;


public interface ExpenseService {
    ApiResponse addExpense(CreateEvenExpenseRequestBody payload);

    ApiResponse addUnevenExpense(CreateUnevenExpenseRequestBody payload);

    Double myContribution(Long paidBy, Long groupId);

    Object getExpensesByGroupId(Long groupId);
}
