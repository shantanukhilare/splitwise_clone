package app.splitwise.services;

import app.splitwise.dtos.ApiResponse;
import app.splitwise.dtos.LoginRequestDto;
import app.splitwise.dtos.UserCreateRequestBody;
import app.splitwise.entities.User;

import java.util.List;

public interface UserService {
    User getUserById(Long id);

    List<User> getAllUsers();

    ApiResponse registerUser(UserCreateRequestBody payload);

    ApiResponse login(LoginRequestDto payload);

    


}
