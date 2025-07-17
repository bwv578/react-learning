package personal.reactlearning.simpleboard.auth.domain;

import lombok.Data;

@Data
public class User {
    protected int userCode;
    protected String name;
    protected String id;
    protected String pw;
    protected String sessionId;
}
