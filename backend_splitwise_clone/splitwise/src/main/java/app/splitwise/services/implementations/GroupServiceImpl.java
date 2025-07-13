package app.splitwise.services.implementations;

import app.splitwise.daos.GroupMemberRepository;
import app.splitwise.daos.GroupRepository;
import app.splitwise.daos.UserRepository;
import app.splitwise.dtos.ApiResponse;
import app.splitwise.dtos.CreateGroupRequestBody;
import app.splitwise.dtos.ExpenseGroupResponseBody;
import app.splitwise.entities.ExpenseGroup;
import app.splitwise.entities.GroupMember;
import app.splitwise.entities.User;
import app.splitwise.services.GroupService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupServiceImpl implements GroupService {
    // <editor-fold desc="Properties">
    @Autowired
    GroupRepository groupRepository;

    @Autowired
    GroupMemberRepository groupMemberRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ModelMapper mapper;
    // </editor-fold>

    @Override
    public ApiResponse createGroup(CreateGroupRequestBody payload) {
        User createdBy=userRepository.findById(payload.getCreatedBy()).orElseThrow(()-> new RuntimeException("User not found..."));
        ExpenseGroup group=new ExpenseGroup();
        group.setCreatedBy(createdBy);
        group.setGroupName(payload.getName());

        ExpenseGroup savedGroup=groupRepository.save(group);

        for(Long id:payload.getUserIds()){
            User user=userRepository.findById(id).orElseThrow(()-> new RuntimeException("User not found..."));
            if(user!=null){
                GroupMember groupMember=new GroupMember();
                groupMember.setUser(user);
                groupMember.setGroupMember(group);
                groupMemberRepository.save(groupMember);
            }
        }
        return new ApiResponse("Group created Successfully!!!");
    }

    @Override
    public ExpenseGroup getGroupById(Long id) {
        return groupRepository.findById(id).orElseThrow(()-> new RuntimeException("Group not found"));
    }

    @Override
    public List<GroupMember> getGroupMembers(Long groupId) {
        return groupMemberRepository.findAllByGroupId(groupId);
    }

    @Override
    public List<ExpenseGroupResponseBody> getGroupsByUserId(Long userId) {
        return groupMemberRepository.findByUserId(userId);
    }


}
