package app.splitwise.dtos;

import lombok.Data;

@Data
public class LoginRequestDto {
    private String credentials;
    private String password;
}
