package personal.reactlearning.simpleboard.main.mapper;

import org.apache.ibatis.annotations.Mapper;
import personal.reactlearning.simpleboard.main.domain.User;

@Mapper
public interface MainMapper {
    int insertTest();
    int insertUser(User newUser);
    User selectUser(User user);
}
