package personal.reactlearning.simpleboard.board.mapper;

import org.apache.ibatis.annotations.Mapper;
import personal.reactlearning.simpleboard.board.domain.Article;
import personal.reactlearning.simpleboard.board.domain.Comment;

import java.util.List;

@Mapper
public interface BoardMapper {
    public int insertArticle(Article newArticle);
    public List<Article> selectArticles(Article searchCondition);
    public Article selectArticle(Article target);
    public int insertComment(Comment newComment);
}
