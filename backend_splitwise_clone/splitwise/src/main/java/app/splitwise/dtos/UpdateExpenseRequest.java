package app.splitwise.dtos;

import app.splitwise.entities.SplitType;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.Map;

@Data
public class UpdateExpenseRequest {
    @Size(min = 1, max = 255)
    private String description;

    @Positive
    private Double amount;

    private SplitType splitType;

    private Map<Long, @Positive Double> unevenAmounts;

    private Long paidByUserId;
    // Optional: if you later support percentage or shares:
    // private Map<Long, @Positive Double> percentages; // sum to 100
    // private Map<Long, @Positive Double> shares;      // relative weights

    // Optional future fields:
    // private Long categoryId;
    // private String currency;

}
