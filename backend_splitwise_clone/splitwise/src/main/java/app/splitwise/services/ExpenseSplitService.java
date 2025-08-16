package app.splitwise.services;

import app.splitwise.dtos.UserBalanceDto;
import app.splitwise.dtos.UserOwesDto;
import app.splitwise.dtos.UserOwesDtoResponse;
import app.splitwise.entities.ExpenseSplit;

import java.util.List;

public interface ExpenseSplitService {

    List<UserOwesDto> calculateNetBalances(Long userId, Long groupId);
    ExpenseSplit updateExpenseSplit(Long id, ExpenseSplit updatedSplit);
    List<UserBalanceDto> getGroupWiseAmountsIOwe(Long userId, Long groupId);
    List<UserBalanceDto> getGroupWiseAmountsOwedToMe(Long userId, Long groupId);
    List<UserBalanceDto> getGroupWiseNetWithCounterparties(Long userId, Long groupId);

}
