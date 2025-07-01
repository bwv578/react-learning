package personal.reactlearning.simpleboard.board.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import personal.reactlearning.simpleboard.board.domain.Article;
import personal.reactlearning.simpleboard.board.domain.Comment;
import personal.reactlearning.simpleboard.board.mapper.BoardMapper;
import personal.reactlearning.simpleboard.main.LoginManager;

import java.util.List;

@Controller
@RequestMapping("/board")
public class BoardController {

    @Autowired
    BoardMapper boardMapper;

    @GetMapping("/articles")
    @ResponseBody
    public List<Article> getArticles(@ModelAttribute Article searchCondition,
                                        HttpServletRequest req, HttpServletResponse res){
        searchCondition.setWriterCode(LoginManager.getCurrentUserCode(req));
        return boardMapper.selectArticles(searchCondition);
    }

    @PostMapping("/article")
    @ResponseBody
    public int postArticle(@RequestBody Article newArticle,
                           HttpServletRequest req, HttpServletResponse res){
        newArticle.setWriterCode(LoginManager.getCurrentUserCode(req));
        return boardMapper.insertArticle(newArticle);
    }

    @DeleteMapping("/article")
    @ResponseBody
    public int deleteArticle(@RequestBody Article target,
                             HttpServletRequest req, HttpServletResponse res){
        target.setWriterCode(LoginManager.getCurrentUserCode(req));
        return boardMapper.deleteArticle(target);
    }

    @GetMapping("/article")
    @ResponseBody
    public Article getArticle(@ModelAttribute Article target,
                              HttpServletRequest req, HttpServletResponse res){
        target.setWriterCode(LoginManager.getCurrentUserCode(req));
        return boardMapper.selectArticle(target);
    }

    @GetMapping("/comments")
    @ResponseBody
    public List<Comment> getComments(@ModelAttribute Comment searchCondition,
                                     HttpServletRequest req, HttpServletResponse res){
        searchCondition.setWriterCode(LoginManager.getCurrentUserCode(req));
        return boardMapper.selectComments(searchCondition);
    }

    @PostMapping("/comment")
    @ResponseBody
    public int postComment(@RequestBody Comment newComment,
                           HttpServletRequest req, HttpServletResponse res){
        newComment.setWriterCode(LoginManager.getCurrentUserCode(req));
        return boardMapper.insertComment(newComment);
    }

}
