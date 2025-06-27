package personal.reactlearning.simpleboard.board.domain;

import lombok.Data;
import personal.reactlearning.simpleboard.common.domain.SearchKey;

@Data
public class Article extends SearchKey {
    private int articleCode;
    private String title;
    private int writerCode;
    private String writerName;
    private String content;
    private int status;
    private String registeredAt;
    private int views;
    private boolean isMyArticle;
}
