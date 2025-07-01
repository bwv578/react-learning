package personal.reactlearning.simpleboard.board.mapper;

import org.apache.ibatis.annotations.Mapper;
import personal.reactlearning.simpleboard.board.domain.Article;
import personal.reactlearning.simpleboard.board.domain.Comment;

import java.util.List;

@Mapper
public interface BoardMapper {
    int insertArticle(Article newArticle);
    int deleteArticle(Article target);
    List<Article> selectArticles(Article searchCondition);
    Article selectArticle(Article target);
    List<Comment> selectComments(Comment searchCondition);
    int insertComment(Comment newComment);
}
