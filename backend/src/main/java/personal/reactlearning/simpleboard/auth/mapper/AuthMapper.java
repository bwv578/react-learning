package personal.reactlearning.simpleboard.auth.mapper;

import org.apache.ibatis.annotations.Mapper;
import personal.reactlearning.simpleboard.auth.domain.User;

@Mapper
public interface AuthMapper {
    int insertTest();
    int insertUser(User newUser);
    User selectUser(User user);
}
