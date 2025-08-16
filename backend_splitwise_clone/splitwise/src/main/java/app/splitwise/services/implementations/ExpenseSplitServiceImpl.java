package app.splitwise.services.implementations;

import app.splitwise.daos.ExpenseSplitRepository;
import app.splitwise.daos.UserRepository;
import app.splitwise.dtos.UserBalanceDto;
import app.splitwise.dtos.UserOwesDto;
import app.splitwise.entities.ExpenseSplit;
import app.splitwise.services.ExpenseSplitService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class ExpenseSplitServiceImpl implements ExpenseSplitService {
    @Autowired
    private ModelMapper mapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExpenseSplitRepository expenseSplitRepository;

    public List<UserOwesDto> calculateNetBalances(Long userId, Long groupId) {
        List<UserBalanceDto> amountsOwed = expenseSplitRepository.getAmountsOwedByUser(userId, groupId);
        List<UserBalanceDto> amountsOwedToMe = expenseSplitRepository.getAmountsOwedToUser(userId, groupId);

        Map<Long, Double> netBalances = new HashMap<>(); // Changed to Double
        Map<Long, String> userNames = new HashMap<>();

        // Add what I owe (positive) and store names
        amountsOwed.forEach(debt -> {
            netBalances.put(debt.getUserId(), debt.getAmount());
            userNames.put(debt.getUserId(), debt.getUserName());
        });

        // Subtract what they owe me (negative) and store names
        amountsOwedToMe.forEach(credit -> {
            netBalances.merge(credit.getUserId(), -credit.getAmount(), Double::sum); // Changed logic for Double
            userNames.put(credit.getUserId(), credit.getUserName());
        });

        // Convert to final result, filtering out zero balances
        return netBalances.entrySet().stream()
                .filter(entry -> Math.abs(entry.getValue()) > 0.01) // Use epsilon comparison for doubles
                .map(entry -> new UserOwesDto(
                        userNames.get(entry.getKey()),
                        Math.abs(entry.getValue()) // Use Math.abs() instead of .abs()
                ))
                .collect(Collectors.toList());
    }
    public ExpenseSplit updateExpenseSplit(Long id, ExpenseSplit updatedSplit) {
        Optional<ExpenseSplit> optionalSplit = expenseSplitRepository.findById(id);

        if (optionalSplit.isEmpty()) {
            throw new IllegalArgumentException("Expense split not found with ID: " + id);
        }

        ExpenseSplit existingSplit = optionalSplit.get();

        // Update only allowed fields
        existingSplit.setAmountOwed(updatedSplit.getAmountOwed());
        existingSplit.setUser(updatedSplit.getUser());
        existingSplit.setOwedTo(updatedSplit.getOwedTo());
        existingSplit.setExpense(updatedSplit.getExpense());

        return expenseSplitRepository.save(existingSplit);
    }
    public List<UserBalanceDto> getGroupWiseAmountsIOwe(Long userId, Long groupId) {
        return expenseSplitRepository.getAmountsOwedByUser(userId, groupId);
    }

    // How much others owe the user in a given group
    public List<UserBalanceDto> getGroupWiseAmountsOwedToMe(Long userId, Long groupId) {
        return expenseSplitRepository.getAmountsOwedToUser(userId, groupId);
    }
    public List<UserBalanceDto> getGroupWiseNetWithCounterparties(Long userId, Long groupId) {
        // 1) Totals others owe me (positive)
        List<UserBalanceDto> owedToMe = expenseSplitRepository.getAmountsOwedToUser(userId, groupId);
        // 2) Totals I owe others (negative)
        List<UserBalanceDto> iOwe = expenseSplitRepository.getAmountsOwedByUser(userId, groupId);

        // counterpartyId -> aggregated
        Map<Long, UserBalanceDto> net = new LinkedHashMap<>();

        // Initialize with positives (they owe me)
        for (UserBalanceDto dto : owedToMe) {
            net.put(
                    dto.getUserId(),
                    new UserBalanceDto(dto.getUserId(), dto.getUserName(), safe(dto.getAmount()))
            );
        }

        // Merge negatives (I owe them)
        for (UserBalanceDto dto : iOwe) {
            net.merge(
                    dto.getUserId(),
                    new UserBalanceDto(dto.getUserId(), dto.getUserName(), -safe(dto.getAmount())),
                    (existing, incoming) -> new UserBalanceDto(
                            existing.getUserId(),
                            existing.getUserName(),
                            safe(existing.getAmount()) + safe(incoming.getAmount())
                    )
            );
        }

        return List.copyOf(net.values());
    }
    private static double safe(Double v) {
        return v == null ? 0.0 : v;
    }



}
