package app.splitwise.dtos;

import lombok.Data;

@Data
public class GetExpenseRequest {
    private Boolean includeSplits; // default true
}
