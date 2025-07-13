package app.splitwise.services;

import app.splitwise.dtos.ApiResponse;
import app.splitwise.dtos.UserCreateRequestBody;
import app.splitwise.entities.User;

public interface UserService {
    User getUserById(Long id);


    ApiResponse registerUser(UserCreateRequestBody payload);

}
