package app.splitwise.services.implementations;

import app.splitwise.daos.ExpenseRepository;
import app.splitwise.daos.ExpenseSplitRepository;
import app.splitwise.daos.UserRepository;
import app.splitwise.dtos.UserOwesDto;
import app.splitwise.services.ExpenseSplitService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseSplitServiceImpl implements ExpenseSplitService {
    @Autowired
    private ModelMapper mapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExpenseSplitRepository expenseSplitRepository;


    @Override
    public List<UserOwesDto> whoOwesYou(Long userId, Long groupId) {
        return expenseSplitRepository.whoOwesYou(userId,groupId);
    }

    @Override
    public List<UserOwesDto> whoYouOwe(Long userId, Long groupId) {
        return expenseSplitRepository.whatYouOwe(userId,groupId);
    }


}
