package app.splitwise.services;

import app.splitwise.dtos.UserOwesDto;
import app.splitwise.dtos.UserOwesDtoResponse;

import java.util.List;

public interface ExpenseSplitService {

    UserOwesDtoResponse whoOwesYou(Long userId, Long groupId);
    List<UserOwesDto> whoYouOwe(Long userId, Long groupId);

}
