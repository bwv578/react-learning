package personal.reactlearning.simpleboard.board.mapper;

import org.apache.ibatis.annotations.Mapper;
import personal.reactlearning.simpleboard.board.domain.Article;
import personal.reactlearning.simpleboard.main.domain.User;

import java.util.List;

@Mapper
public interface BoardMapper {
    public int addNewArticle(Article newArticle);
    public List<Article> selectArticles(Article searchCondition);
}
