package app.splitwise.dtos;

import lombok.Data;

@Data
public class UserCreateRequestBody {
    private String name;
    private String phoneNumber;
    private String email;
}
