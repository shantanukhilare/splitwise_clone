package app.splitwise.services.implementations;

import app.splitwise.daos.*;
import app.splitwise.dtos.ApiResponse;
import app.splitwise.dtos.CreateEvenExpenseRequestBody;
import app.splitwise.dtos.CreateUnevenExpenseRequestBody;
import app.splitwise.entities.*;
import app.splitwise.services.ExpenseService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class ExpenseServiceImpl implements ExpenseService {
    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private GroupMemberRepository groupMemberRepository;

    @Autowired
    private ExpenseSplitRepository expenseSplitRepository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public ApiResponse addExpense(CreateEvenExpenseRequestBody payload) {
        User paidBy=userRepository.findById(payload.getUserId()).orElseThrow(()-> new RuntimeException("user for not found"));
        ExpenseGroup group=groupRepository.findById(payload.getGroupId()).orElseThrow(()-> new RuntimeException("Group for not found"));
        List<Long> userIds=groupMemberRepository.findUserIdsByGroupId(payload.getGroupId());

        Expense expense=mapper.map(payload,Expense.class);
        expense.setPaidBy(paidBy);
        expense.setExpenseGroup(group);
        expenseRepository.save(expense);

        if(payload.getSplitType() == SplitType.EVENLY) {
            Double amount=payload.getAmount()/userIds.size();
            for (Long id : userIds) {
                ExpenseSplit split = new ExpenseSplit();
                split.setExpense(expense);
                split.setAmountOwed(amount);
                split.setUser(userRepository.findById(id).orElseThrow(() -> new RuntimeException("user not found")));
                split.setOwedTo(paidBy);
                expenseSplitRepository.save(split);
            }
        }
        return new ApiResponse("Expense added successfully!!!");
    }

    @Override
    public ApiResponse addUnevenExpense(CreateUnevenExpenseRequestBody payload) {
        User paidBy=userRepository.findById(payload.getPaidByUserId()).orElseThrow(()->new RuntimeException("user not found"));
        ExpenseGroup group=groupRepository.findById(payload.getGroupId()).orElseThrow(()->new RuntimeException("Group not found"));

        Expense expense=new Expense();
        expense.setPaidBy(paidBy);
        expense.setExpenseGroup(group);
        Collection<Double> amounts=payload.getUnevenAmounts().values();
        Double amount=amounts.stream().mapToDouble(Double::doubleValue).sum();
        expense.setAmount(amount);
        expense.setSplitType(payload.getType());
        expenseRepository.save(expense);

        for(var map:payload.getUnevenAmounts().entrySet()){
            User user=userRepository.findById(map.getKey()).orElseThrow(()->new RuntimeException("user not found"));
            ExpenseSplit split=new ExpenseSplit();
            split.setUser(user);
            split.setExpense(expense);
            split.setAmountOwed(map.getValue());
            expenseSplitRepository.save(split);
        }

        return new ApiResponse("Expense added successfully!!!");
    }

    @Override
    public Double myContribution(Long paidBy, Long groupId) {
        return expenseRepository.myContributionInGroup(paidBy,groupId);
    }

    @Override
    public Object getExpensesByGroupId(Long groupId) {
        return expenseRepository.findByGroup(groupId);
    }
}
