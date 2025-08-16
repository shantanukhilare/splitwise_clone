package app.splitwise.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class CreateSettlementRequest {
    private Long groupId; // either group or friend required
    private Long friendId;

    @NotNull
    private Long payerUserId;

    @NotNull
    private Long payeeUserId;

    @NotNull
    @Positive
    private Double amount;

    private String currency; // optional if single-currency app
    private String notes;
    private String date; // ISO date, or use Instant in entity/service
}
