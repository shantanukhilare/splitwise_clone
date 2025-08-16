package app.splitwise.dtos;

import app.splitwise.entities.SplitType;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class ExpenseResponse {
    private Long id;
    private Long groupId;            // null for friend expense
    private Long friendId;           // null for group expense
    private Long paidByUserId;
    private String description;
    private Double amount;
    private SplitType splitType;
    private Long categoryId;
    private Instant createdAt;
    private Instant updatedAt;
    private List<ExpenseSplitItem> splits;
}
