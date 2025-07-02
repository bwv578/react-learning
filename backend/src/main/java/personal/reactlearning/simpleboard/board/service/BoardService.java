package personal.reactlearning.simpleboard.board.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import personal.reactlearning.simpleboard.board.domain.Article;
import personal.reactlearning.simpleboard.board.mapper.BoardMapper;

@Service
public class BoardService {
    @Autowired
    BoardMapper boardMapper;

    @Transactional
    public Article getArticle(Article target){
        boardMapper.increaseArticleViews(target);
        return boardMapper.selectArticle(target);
    }
}
