package app.splitwise.daos;

import app.splitwise.dtos.ExpenseGroupResponseBody;
import app.splitwise.entities.ExpenseGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<ExpenseGroup,Long> {

}
