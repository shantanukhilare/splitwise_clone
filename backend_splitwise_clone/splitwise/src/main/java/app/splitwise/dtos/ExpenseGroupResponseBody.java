package app.splitwise.dtos;

import lombok.Data;

@Data
public class ExpenseGroupResponseBody {
    private String groupName;
    private Long memberCount;

    public ExpenseGroupResponseBody(String groupName, Long memberCount) {
        this.groupName = groupName;
        this.memberCount = memberCount;
    }
}
