package app.splitwise.services;

import app.splitwise.dtos.*;
import app.splitwise.entities.ExpenseGroup;
import app.splitwise.entities.GroupMember;

import java.util.List;

public interface GroupService {
    ApiResponse createGroup(CreateGroupRequestBody payload);
    ExpenseGroup getGroupById(Long id);

    List<GroupMember> getGroupMembers(Long id);

    List<ExpenseGroupResponseBody> getGroupsByUserId(Long userId);

    List<String> getGroupNames();

    ApiResponse addGroupMembers(AddGroupMembersReqDto payload);

    List<FriendResponse> friendsList(Long userId);
    List<String> friendsNames(Long userId);

}
