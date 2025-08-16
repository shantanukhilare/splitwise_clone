package app.splitwise.dtos;

import lombok.Data;

@Data
public class ActivityQuery {
    private Long groupId;
    private Integer page;
    private Integer limit;
}
