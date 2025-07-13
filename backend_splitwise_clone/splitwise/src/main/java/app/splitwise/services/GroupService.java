package app.splitwise.services;

import app.splitwise.dtos.ApiResponse;
import app.splitwise.dtos.CreateGroupRequestBody;
import app.splitwise.dtos.ExpenseGroupResponseBody;
import app.splitwise.entities.ExpenseGroup;
import app.splitwise.entities.GroupMember;

import java.util.List;

public interface GroupService {
    ApiResponse createGroup(CreateGroupRequestBody payload);
    ExpenseGroup getGroupById(Long id);

    List<GroupMember> getGroupMembers(Long id);

    List<ExpenseGroupResponseBody> getGroupsByUserId(Long userId);
}
