package app.splitwise.services.implementations;

import app.splitwise.daos.UserRepository;
import app.splitwise.dtos.ApiResponse;
import app.splitwise.dtos.LoginRequestDto;
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
    public List<User> getAllUsers() {
        return userRepository.findAll();
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

    @Override
    public ApiResponse login(LoginRequestDto payload) {
        var credentials= userRepository.findByNameOrPhoneNumberOrEmail(payload.getCredentials(),payload.getCredentials(),payload.getCredentials());
        if(!payload.getPassword().equals(credentials.getPassword()))
            return new ApiResponse("Invalid Password...");
        else if(credentials.getName().equals(payload.getCredentials()) || credentials.getEmail().equals(payload.getCredentials()) || credentials.getPhoneNumber().equals(payload.getCredentials()))
            return new ApiResponse("Invalid Credentials...");
        else
            return new ApiResponse("Login Successful!!!");
    }


}
