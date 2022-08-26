package com.codestates.pre51.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;
import lombok.Getter;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MultiResponseDTO<T> {
    private List<T> data;
    private PageInfo pageInfo;

    public MultiResponseDTO(List<T> data, Page page) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}
