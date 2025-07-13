package app.splitwise.dtos;

import app.splitwise.entities.User;
import lombok.Data;

import java.util.List;

@Data
public class CreateGroupRequestBody {
    private String name;
    private Long createdBy;
    private List<Long> userIds;
}
