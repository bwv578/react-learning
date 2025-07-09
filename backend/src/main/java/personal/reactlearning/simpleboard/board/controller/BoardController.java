package personal.reactlearning.simpleboard.board.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import personal.reactlearning.simpleboard.board.domain.Article;
import personal.reactlearning.simpleboard.board.domain.Comment;
import personal.reactlearning.simpleboard.board.mapper.BoardMapper;
import personal.reactlearning.simpleboard.board.service.BoardService;
import personal.reactlearning.simpleboard.auth.util.LoginManager;

import java.util.List;

@RestController
@RequestMapping("/board")
public class BoardController {

    @Autowired
    BoardMapper boardMapper;
    @Autowired
    private BoardService boardService;

    @GetMapping("/articles")
    public List<Article> getArticles(@ModelAttribute Article searchCondition,
                                        HttpServletRequest req, HttpServletResponse res){
        searchCondition.setWriterCode(LoginManager.getCurrentUserCode(req));
        return boardMapper.selectArticles(searchCondition);
    }

    @PostMapping("/article")
    public int postArticle(@RequestBody Article newArticle,
                           HttpServletRequest req, HttpServletResponse res){
        newArticle.setWriterCode(LoginManager.getCurrentUserCode(req));
        return boardMapper.insertArticle(newArticle);
    }

    @DeleteMapping("/article")
    public int deleteArticle(@RequestBody Article target,
                             HttpServletRequest req, HttpServletResponse res){
        target.setWriterCode(LoginManager.getCurrentUserCode(req));
        return boardMapper.deleteArticle(target);
    }

    @GetMapping("/article")
    public Article getArticle(@ModelAttribute Article target,
                              HttpServletRequest req, HttpServletResponse res){
        target.setWriterCode(LoginManager.getCurrentUserCode(req));
        return boardService.getArticle(target);
    }

    @PatchMapping("/article")
    public int updateArticle(@RequestBody Article modifiedArticle,
                             HttpServletRequest req, HttpServletResponse res){
        modifiedArticle.setWriterCode(LoginManager.getCurrentUserCode(req));
        return boardMapper.updateArticle(modifiedArticle);
    }

    @GetMapping("/comments")
    public List<Comment> getComments(@ModelAttribute Comment searchCondition,
                                     HttpServletRequest req, HttpServletResponse res){
        searchCondition.setWriterCode(LoginManager.getCurrentUserCode(req));
        return boardMapper.selectComments(searchCondition);
    }

    @PostMapping("/comment")
    public int postComment(@RequestBody Comment newComment,
                           HttpServletRequest req, HttpServletResponse res){
        newComment.setWriterCode(LoginManager.getCurrentUserCode(req));
        return boardMapper.insertComment(newComment);
    }

    @DeleteMapping("/comment")
    public int deleteComment(@RequestBody Comment target,
                             HttpServletRequest req, HttpServletResponse res){
        target.setWriterCode(LoginManager.getCurrentUserCode(req));
        return boardMapper.deleteComment(target);
    }
}
