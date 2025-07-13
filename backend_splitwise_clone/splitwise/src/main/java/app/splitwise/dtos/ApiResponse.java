package app.splitwise.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResponse {
    private String message;

    public ApiResponse(String msg) {
        message=msg;
    }
}
