package personal.reactlearning.simpleboard.board.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import personal.reactlearning.simpleboard.board.domain.Article;
import personal.reactlearning.simpleboard.board.mapper.BoardMapper;
import personal.reactlearning.simpleboard.main.LoginManager;

import java.util.List;

@Controller
@RequestMapping("/board")
public class BoardController {

    @Autowired
    BoardMapper boardMapper;
    //LoginManager loginManager = LoginManager.getInstance();

    @PostMapping("/articles")
    public int postArticle(@RequestBody Article newArticle,
                           HttpServletRequest req, HttpServletResponse res){
        newArticle.setWriterCode(LoginManager.getCurrentUserCode(req));
        return boardMapper.addNewArticle(newArticle);
    }

    @GetMapping("/articles")
    public List<Article> selectArticles(@RequestBody Article searchCondition,
                                        HttpServletRequest req, HttpServletResponse res){
        searchCondition.setWriterCode(LoginManager.getCurrentUserCode(req));
        return boardMapper.selectArticles(searchCondition);
    }

}
