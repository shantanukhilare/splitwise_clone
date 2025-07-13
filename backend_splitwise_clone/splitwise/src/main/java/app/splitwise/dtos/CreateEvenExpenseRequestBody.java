package app.splitwise.dtos;

import app.splitwise.entities.SplitType;
import lombok.Data;

import java.util.Map;

@Data
public class CreateEvenExpenseRequestBody {

    private Long groupId;

    private Long userId;

    private String description;

    private Double amount;

    private SplitType splitType;
}
