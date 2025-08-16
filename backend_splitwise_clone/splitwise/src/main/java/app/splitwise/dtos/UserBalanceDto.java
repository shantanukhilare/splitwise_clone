package app.splitwise.dtos;

import lombok.Data;

@Data
public class UserBalanceDto {
    private Long userId;
    private String userName;
    private Double amount;

    public UserBalanceDto(Long userId, String userName, Double amount) {
        this.userId = userId;
        this.userName = userName;
        this.amount = amount;
    }
}
