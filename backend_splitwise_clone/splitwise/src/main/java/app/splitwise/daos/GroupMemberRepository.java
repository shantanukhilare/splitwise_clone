package app.splitwise.daos;

import app.splitwise.dtos.ExpenseGroupResponseBody;
import app.splitwise.dtos.FriendProjection;
import app.splitwise.dtos.FriendResponse;
import app.splitwise.entities.GroupMember;
import app.splitwise.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupMemberRepository extends JpaRepository<GroupMember,Long> {
//    List<GroupMember> findAllByExpenseGroup(ExpenseGroup group);

    @Query(value = "SELECT user_id FROM group_members WHERE group_id = :groupId", nativeQuery = true)
    List<Long> findUserIdsByGroupId(@Param("groupId") Long groupId);

    @Query("SELECT gm FROM GroupMember gm WHERE gm.groupMember.id = :groupId")
    List<GroupMember> findAllByGroupId(@Param("groupId") Long groupId);

    @Query("""
    SELECT new app.splitwise.dtos.ExpenseGroupResponseBody(g.groupName, COUNT(gm))
    FROM GroupMember gm
    JOIN gm.groupMember g
    WHERE g.id IN (
        SELECT gm2.groupMember.id FROM GroupMember gm2 WHERE gm2.user.id = :userId
    )
    GROUP BY g.groupName
    """)
    List<ExpenseGroupResponseBody> findByUserId(@Param("userId") Long userId);

    @Query("""
        SELECT DISTINCT new app.splitwise.dtos.FriendResponse(
          u.id,
          gm.id,
          u.email,
          u.name,
          u.phoneNumber
        )
        FROM GroupMember gm
        JOIN gm.user u
        WHERE gm.groupMember.id IN (
          SELECT m.groupMember.id
          FROM GroupMember m
          WHERE m.user.id = :userId
        )
        AND u.id <> :userId
        
        """)
    List<FriendResponse> getFriendsList(@Param("userId") Long userId);

}
