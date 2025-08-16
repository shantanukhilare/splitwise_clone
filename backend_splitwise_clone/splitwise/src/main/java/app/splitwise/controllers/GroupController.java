package app.splitwise.controllers;

import app.splitwise.dtos.AddGroupMembersReqDto;
import app.splitwise.dtos.ApiResponse;
import app.splitwise.dtos.CreateGroupRequestBody;
import app.splitwise.entities.ExpenseGroup;
import app.splitwise.services.GroupService;
import org.apache.coyote.Response;
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
    public ResponseEntity<?> createGroup(@RequestBody CreateGroupRequestBody payload) {
        ApiResponse response = groupService.createGroup(payload);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getGroupById(@PathVariable Long id) {
        ExpenseGroup group = groupService.getGroupById(id);
        return ResponseEntity.ok(group);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getGroupMembers(@PathVariable Long id) {
        return ResponseEntity.ok(groupService.getGroupMembers(id));
    }

    @GetMapping("/userId")
    public ResponseEntity<?> getGroupsByUserId(@RequestParam Long userId) {
        return ResponseEntity.ok(groupService.getGroupsByUserId(userId));
    }

    @GetMapping
    public ResponseEntity<?> getAllGroups() {
        return ResponseEntity.ok(groupService.getGroupNames());
    }

    @PostMapping("/addMembers")
    public ResponseEntity<?> addGroupMembers(@RequestBody AddGroupMembersReqDto payload) {
        ApiResponse response = groupService.addGroupMembers(payload);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @GetMapping("/friends/{userId}")
    public ResponseEntity<?> friendsList(@PathVariable Long userId){
        return ResponseEntity.ok(groupService.friendsList(userId));
    }
    @GetMapping("/friendsNames/{userId}")
    public ResponseEntity<?> friendsNames(@PathVariable Long userId){
        return ResponseEntity.ok(groupService.friendsNames(userId));
    }
}
