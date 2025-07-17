package app.splitwise.dtos;

import lombok.Data;

import java.util.List;

@Data
public class UserOwesDtoResponse  {
    private List<UserOwesDto> list;
    private Double totalAmount;

    public UserOwesDtoResponse(List<UserOwesDto> list,Double totalAmount){
        this.list=list;
        this.totalAmount=totalAmount;
    }

}
