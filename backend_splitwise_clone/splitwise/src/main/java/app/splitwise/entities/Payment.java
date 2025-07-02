package app.splitwise.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "payments")
public class Payment extends BaseEntity{

	@ManyToOne
	@JoinColumn(name = "paid_by")
	private User paidBy;
	
	@ManyToOne
	@JoinColumn(name = "paid_to")
	private User paidTo;
	
	@Column(name = "amount")
	private Double amount;
	
	@Column(name = "description")
	private String description;
	
}
