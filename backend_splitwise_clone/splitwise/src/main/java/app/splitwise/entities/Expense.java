package app.splitwise.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "expenses")
public class Expense extends BaseEntity{
	
	@ManyToOne
	@JoinColumn(name = "expense_group")
	private ExpenseGroup expenseGroup;

	@ManyToOne
	@JoinColumn(name = "paid_by")
	private User paidBy;

	@Column(name = "description")
	private String description;
	

	@Column(name = "amount")
	private Double amount;
	
	@Column(name = "split_type")
	@Enumerated(EnumType.STRING)
	private SplitType splitType;
	
}
