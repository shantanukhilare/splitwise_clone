package app.splitwise.dtos;

import lombok.Data;

@Data
public class GroupBalanceItem {
    private Long userId;
    private String userName;
    private Double net; // positive means owes, negative means owed (or vice versa; document)
}
