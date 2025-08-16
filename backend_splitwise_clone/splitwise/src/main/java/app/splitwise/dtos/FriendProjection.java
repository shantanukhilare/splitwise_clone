package app.splitwise.dtos;

public interface FriendProjection {
    Long getGroupMemberId();
    Long getGroupId();
    Long getUserId();
    String getGroupName();
    String getEmail();
    String getName();
    String getPhoneNumber();
}
