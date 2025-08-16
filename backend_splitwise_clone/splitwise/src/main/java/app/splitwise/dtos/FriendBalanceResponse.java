package app.splitwise.dtos;

import lombok.Data;

@Data
public class FriendBalanceResponse {
    private Long friendUserId;
    private String friendName;
    private Double net;
}
