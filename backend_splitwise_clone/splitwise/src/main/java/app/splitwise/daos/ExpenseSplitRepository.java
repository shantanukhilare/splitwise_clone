package app.splitwise.daos;

import app.splitwise.dtos.UserOwesDto;
import app.splitwise.entities.ExpenseSplit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExpenseSplitRepository extends JpaRepository<ExpenseSplit,Long> {
    @Query("""
    SELECT new app.splitwise.dtos.UserOwesDto(u.name, SUM(s.amountOwed))
    FROM ExpenseSplit s
    JOIN s.expense e
    JOIN e.expenseGroup g
    JOIN s.owedTo u
    WHERE s.owedTo.id <> :userId AND s.user.id = :userId AND g.id = :groupId
    GROUP BY u.name
    """)
    List<UserOwesDto> whatYouOwe(@Param("userId") Long userId, @Param("groupId") Long groupId);

    @Query("""
    SELECT new app.splitwise.dtos.UserOwesDto(u.name, SUM(s.amountOwed))
    FROM ExpenseSplit s
    JOIN s.expense e
    JOIN e.expenseGroup g
    JOIN s.user u
    WHERE s.owedTo.id = :userId AND s.user.id <> :userId AND g.id = :groupId
    GROUP BY u.name
    """)
    List<UserOwesDto> whoOwesYou(@Param("userId") Long userId, @Param("groupId") Long groupId);

}
