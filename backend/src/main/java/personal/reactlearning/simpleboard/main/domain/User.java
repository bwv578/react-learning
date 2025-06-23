package personal.reactlearning.simpleboard.main.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class User {
    private String unique;
    private String name;
    private String id;
    private String pw;

}
