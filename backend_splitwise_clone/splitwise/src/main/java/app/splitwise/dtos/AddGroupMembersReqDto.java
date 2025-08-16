package app.splitwise.dtos;

import lombok.Data;

import java.util.List;

@Data
public class AddGroupMembersReqDto {
    private List<Long> userIds;
    private Long groupId;
}
