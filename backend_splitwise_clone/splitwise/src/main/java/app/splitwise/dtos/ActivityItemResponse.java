package app.splitwise.dtos;

import lombok.Data;

import java.time.Instant;

@Data
public class ActivityItemResponse {
    private Long id;
    private String type; // EXPENSE_CREATED|EXPENSE_UPDATED|EXPENSE_DELETED|SETTLEMENT|COMMENT
    private Long actorUserId;
    private Long groupId;
    private Long expenseId;     // nullable
    private Long settlementId;  // nullable
    private String summary;     // "Alice added Dinner: 1,200.00"
    private Instant timestamp;
}
