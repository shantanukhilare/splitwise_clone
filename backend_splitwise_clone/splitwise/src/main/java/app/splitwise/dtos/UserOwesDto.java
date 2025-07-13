package app.splitwise.dtos;

import lombok.Data;

@Data
public class UserOwesDto {
    private String name;
    private Double amount;

    public UserOwesDto(String name, Double amount) {
        this.name = name;
        this.amount = amount;
    }
}
