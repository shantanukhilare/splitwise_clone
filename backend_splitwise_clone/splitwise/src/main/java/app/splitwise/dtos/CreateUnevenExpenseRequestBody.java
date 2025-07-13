package app.splitwise.dtos;

import app.splitwise.entities.SplitType;
import lombok.Data;

import java.util.Map;

@Data
public class CreateUnevenExpenseRequestBody {
    private Long groupId;

    private Long paidByUserId;

    private String description;

    private Map<Long,Double> unevenAmounts;

    private SplitType type;


}
