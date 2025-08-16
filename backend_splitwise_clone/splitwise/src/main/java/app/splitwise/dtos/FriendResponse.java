package app.splitwise.dtos;

import lombok.Data;

@Data
public class FriendResponse {
    private Long userId;
    private Long groupMemberId;
    private String email;
    private String name;
    private String phoneNumber;

    public FriendResponse(Long userId, Long groupMemberId, String email, String name, String phoneNumber) {
        this.userId = userId;
        this.groupMemberId = groupMemberId;
        this.email = email;
        this.name = name;
        this.phoneNumber = phoneNumber;
    }
}
