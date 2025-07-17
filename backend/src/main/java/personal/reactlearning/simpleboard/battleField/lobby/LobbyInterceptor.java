package personal.reactlearning.simpleboard.battleField.lobby;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import personal.reactlearning.simpleboard.auth.domain.User;
import personal.reactlearning.simpleboard.auth.util.LoginManager;

@Component
public class LobbyInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        User currentUser = LoginManager.getCurrentUser(request);
        boolean inLobby = LobbyManager.getUser(currentUser.getId())!=null;

        if(!inLobby && request.getMethod().equals("POST")){
            LobbyManager.putLobbyUser(
                    new LobbyUser().patchUserInfo(currentUser)
            );
        }

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
