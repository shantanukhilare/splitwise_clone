package app.splitwise.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "expense_splits")
public class ExpenseSplit extends BaseEntity{

	@Column(name = "amount_owed")
	private Double amountOwed;

	@ManyToOne
	@JoinColumn(name = "expense_id")
	private Expense expense;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
}
