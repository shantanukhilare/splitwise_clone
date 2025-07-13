package app.splitwise.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "expense_splits")
@Getter
@Setter
public class ExpenseSplit extends BaseEntity{

	@Column(name = "amount_owed")
	private Double amountOwed;

	@ManyToOne
	@JoinColumn(name = "expense_id")
	private Expense expense;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;


	@ManyToOne
	@JoinColumn(name = "owed_to")
	private User owedTo;
}
