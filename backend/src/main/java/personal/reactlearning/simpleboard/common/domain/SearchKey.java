package personal.reactlearning.simpleboard.common.domain;

import lombok.Data;

@Data
public class SearchKey {
    private String searchKey;
    private String searchType;
    private String sortBy;
    private int order; // 0=asc, 1=desc
}
