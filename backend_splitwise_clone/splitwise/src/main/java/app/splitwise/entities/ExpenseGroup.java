package app.splitwise.entities;

import org.antlr.v4.runtime.misc.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "expense_groups")
public class ExpenseGroup extends BaseEntity{

	@Column(name = "group_name" , nullable = false, unique = true)
    private String groupName;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

}
