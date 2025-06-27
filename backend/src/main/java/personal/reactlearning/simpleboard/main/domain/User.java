package personal.reactlearning.simpleboard.main.domain;

import lombok.Data;

@Data
public class User {
    private int userCode;
    private String name;
    private String id;
    private String pw;
    private String sessionId;
}
