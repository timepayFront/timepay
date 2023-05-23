import React, { useCallback, useState, useMemo } from 'react';
import { css } from '@emotion/react';
import {
  cssComments,
  cssMyCommentItem,
  cssAppliedCommentItem,
  cssOtherCommentItem,
  cssPostDetailProfile,
  cssCommentUser,
  cssEditDelete,
  cssCommentText,
  cssCommentProfile,
} from './Item.style';
import { Form, Input, Modal, Button } from 'antd';
import { useDeleteComment } from '../../api/hooks/comment';
import { useQueryClient } from 'react-query';
import { useGetUserInfo } from '../../api/hooks/user';

const Item = ({ a, c, messageApi, onShowProfile }: any) => {
  const queryClient = useQueryClient();

  const { data: userInfo } = useGetUserInfo();
  const userNickname = useMemo(() => {
    return userInfo?.data.body.nick_name;
  }, [userInfo]);

  const isAgency = useMemo(() => {
    if (userInfo?.data.body.manager_name) return true;
    return false;
  }, [userInfo]);

  console.log(userNickname);

  const isAuthor = useMemo(() => {
    // 게시글 작성자일 때 true
    return isAgency
      ? c.userId === userInfo?.data.body.uid
      : c.userNickname === userNickname;
  }, [isAgency, c, userInfo, userNickname]);

  console.log('A', isAuthor);

  const write_user = false; // true = 수정 / false = 신고

  // 수정 기능
  const { TextArea } = Input;
  const [isOpenReportModal, setIsOpenReportModal] = useState(false);

  // 수정 기능
  const showReportModal = () => {
    setIsOpenReportModal(true);
  };
  const onOk = () => {
    setIsOpenReportModal(false);
  };
  const onCancel = () => {
    setIsOpenReportModal(false);
  };

  const url = window.location.pathname;
  const real_id = url.substring(6);

  const useDeleteCommentMutation = useDeleteComment();

  const handleDeleteComment = useCallback(
    async (id: number) => {
      await useDeleteCommentMutation.mutateAsync(
        { postPk: parseInt(real_id), id },
        {
          onSuccess: (data) => {
            messageApi.success('댓글이 성공적으로 삭제되었습니다.');
            queryClient.invalidateQueries({
              queryKey: ['useGetBoard'],
            });
            queryClient.invalidateQueries({
              queryKey: ['useGetComments'],
            });
          },
          onError: (error) => {
            console.log('ERROR');
            messageApi.error('댓글 삭제 중 오류가 발생했습니다.');
          },
        },
      );
    },
    [messageApi, real_id, queryClient, useDeleteCommentMutation],
  );

  return (
    <div css={cssComments}>
      <div css={cssEditDelete}>
        {write_user ? (
          <Button className="edit">수정</Button>
        ) : (
          <Button className="edit" onClick={showReportModal}>
            신고
          </Button>
        )}
        <Modal
          title="댓글 신고하기"
          open={isOpenReportModal}
          onOk={onOk}
          onCancel={onCancel}
          footer={null}
        >
          <Form style={{ width: '100%' }}>
            <Form.Item
              name="content"
              label="신고사유"
              rules={[{ required: true, message: '신고 사유를 적어주세요.' }]}
            >
              <TextArea
                rows={10}
                maxLength={100}
                style={{ resize: 'none', fontSize: 20 }}
              />
            </Form.Item>
            <div className="control-box">
              <Button style={{ marginRight: 20 }} onClick={onCancel}>
                취소
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ resize: 'none' }}
              >
                신고하기
              </Button>
            </div>
          </Form>
        </Modal>
        <div className="sidebar">|</div>
        <Button className="delete" onClick={() => handleDeleteComment(c.id)}>
          삭제
        </Button>
      </div>

      <div
        css={
          isAuthor
            ? cssMyCommentItem
            : a
            ? cssAppliedCommentItem
            : cssOtherCommentItem
        }
      >
        <div css={cssPostDetailProfile} onClick={() => onShowProfile(c.userId)}>
          <div css={cssCommentProfile}></div>
          <div css={cssCommentUser}>{c.userNickname}</div>
        </div>

        <div css={cssCommentText}>
          <span id="commentsSpan">{c.content}</span>
        </div>
      </div>
    </div>
  );
};

export default Item;
