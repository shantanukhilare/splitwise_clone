package app.splitwise.services;

import app.splitwise.dtos.UserOwesDto;
import app.splitwise.entities.ExpenseSplit;

import java.util.List;

public interface ExpenseSplitService {

    List<UserOwesDto> whoOwesYou(Long userId, Long groupId);
    List<UserOwesDto> whoYouOwe(Long userId, Long groupId);

}
