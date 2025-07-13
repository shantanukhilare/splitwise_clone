package app.splitwise.services.implementations;

import app.splitwise.daos.UserRepository;
import app.splitwise.dtos.ApiResponse;
import app.splitwise.dtos.UserCreateRequestBody;
import app.splitwise.entities.User;
import app.splitwise.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("user not found"));
    }

    @Override
    public ApiResponse registerUser(UserCreateRequestBody payload) {
        if(!userRepository.existsByNameOrPhoneNumberOrEmail(payload.getName(),payload.getPhoneNumber(),payload.getEmail())){
        User user= modelMapper.map(payload,User.class);
        User user1=userRepository.save(user);
        return new ApiResponse("User created successfully");
        }
        else
            return new ApiResponse("User already Exists bro...");
    }


}
