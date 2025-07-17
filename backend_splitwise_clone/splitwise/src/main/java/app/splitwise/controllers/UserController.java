package app.splitwise.controllers;

import app.splitwise.dtos.ApiResponse;
import app.splitwise.dtos.LoginRequestDto;
import app.splitwise.dtos.UserCreateRequestBody;
import app.splitwise.entities.User;
import app.splitwise.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse("User not found: " + e.getMessage()));
        }
    }
    @GetMapping()
    public ResponseEntity<?> getUserById() {
        try {
            var user = userService.getAllUsers();
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse("User not found: " + e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody UserCreateRequestBody payload) {
        try {
            ApiResponse msg = userService.registerUser(payload);
            return ResponseEntity.status(HttpStatus.CREATED).body(msg);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error creating user: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto payload){
        try{
            ApiResponse msg=userService.login(payload);
            return ResponseEntity.ok(msg);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error creating user: " + e.getMessage()));
        }

    }
}
