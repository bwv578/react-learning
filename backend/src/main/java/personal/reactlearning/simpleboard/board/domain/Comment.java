package personal.reactlearning.simpleboard.board.domain;

import lombok.Data;
import personal.reactlearning.simpleboard.common.domain.SearchKey;

@Data
public class Comment extends SearchKey {
    private int commentCode;
    private int writerCode;
    private int articleCode;
    private int parentCode;
    private String content;
    private String registeredAt;
    private int status;
}
