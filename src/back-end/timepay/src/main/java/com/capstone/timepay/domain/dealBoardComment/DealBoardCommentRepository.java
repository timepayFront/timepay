package com.capstone.timepay.domain.dealBoardComment;

import com.capstone.timepay.domain.dealBoard.DealBoard;
import com.capstone.timepay.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DealBoardCommentRepository extends JpaRepository<DealBoardComment,Long> {
    List<DealBoardComment> findAllByDealBoard(DealBoard dealBoard);

    List<DealBoardComment> findAllByUser(User user);
    Page<DealBoardComment> findAllByUser(User user, Pageable pageable);
}
