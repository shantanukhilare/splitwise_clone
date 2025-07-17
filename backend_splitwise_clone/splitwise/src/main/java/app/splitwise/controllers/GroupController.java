package app.splitwise.controllers;

import app.splitwise.dtos.ApiResponse;
import app.splitwise.dtos.CreateGroupRequestBody;
import app.splitwise.entities.ExpenseGroup;
import app.splitwise.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/groups")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @PostMapping
    public ResponseEntity<?> createGoup(@RequestBody CreateGroupRequestBody payload){
        try {
            ApiResponse response = groupService.createGroup(payload);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error creating group: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getGroupById (@PathVariable Long id){
        try{
            ExpenseGroup group=groupService.getGroupById(id);
            return ResponseEntity.ok(group);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getGroupMembers(@PathVariable Long id){
        try {
            return ResponseEntity.ok(groupService.getGroupMembers(id));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
    @GetMapping("/userId")
    public ResponseEntity<?> getGroupsByUserId(@RequestParam Long userId){
        try {
            return ResponseEntity.ok(groupService.getGroupsByUserId(userId));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllGroups(){
        try {
            return ResponseEntity.ok(groupService.getGroupNames());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}


