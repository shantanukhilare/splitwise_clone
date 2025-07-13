package app.splitwise.daos;

import app.splitwise.entities.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense,Long> {

    @Query(value = "SELECT SUM(e.amount) from Expense e where e.paidBy.id = :paidBy and e.expenseGroup.id = :groupId")
    Double myContributionInGroup(@Param("paidBy") Long paidBy, @Param("groupId") Long groupId);
}
