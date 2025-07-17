package personal.reactlearning.simpleboard.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import personal.reactlearning.simpleboard.auth.interceptor.AuthInterceptor;
import personal.reactlearning.simpleboard.battleField.lobby.LobbyInterceptor;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {
    @Autowired
    AuthInterceptor authInterceptor;
    @Autowired
    LobbyInterceptor lobbyInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        WebMvcConfigurer.super.addInterceptors(registry);
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/board/**")
                .addPathPatterns("/community/**")
                .addPathPatterns("/battlefield/**");
        registry.addInterceptor(lobbyInterceptor)
                .addPathPatterns("/battlefield/api/lobby/**");
    }

}
