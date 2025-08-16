package app.splitwise.dtos;

import lombok.Data;

@Data
public class ExpenseSplitItem {
    private Long id;
    private Long userId;       // participant
    private Long owedToUserId; // usually paidBy
    private Double amountOwed;
}
