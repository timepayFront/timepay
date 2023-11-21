import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBoard } from '../../api/interfaces/IPost';
import useFontSize from '../../hooks/useFontSize';
import PostStatusTag from '../PostStatusTag';
import PostTypeTag from '../PostTypeTag';
import { cssActivityPostCardStyle } from './ActivityPostCard.styles';
import dayjs from 'dayjs';
import { NavLink } from 'react-router-dom';

interface ActivityPostCardProps {
  post: IBoard;
}
const ActivityPostCard = ({ post }: ActivityPostCardProps) => {
  const { scaleValue } = useFontSize();

  const isHelpActivity = useMemo(() => {
    return post.type === 'help';
  }, [post]);

  const [profileProps, setProfileProps] = useState<{
    open: boolean;
    userId?: number | undefined;
  }>({
    open: false,
    userId: undefined,
  });

  const navigate = useNavigate();

  const handleNavLinkClick = () => {
    // 여기에 원하는 추가 동작을 수행합니다.

    // 예를 들어, 클릭한 후 어떤 작업을 수행한 다음 특정 경로로 이동하려면:
    // history.push(`/post/${post.d_boardId}`);
    setProfileProps({ open: false, userId: undefined })
    navigate(`/post/${post.d_boardId}`);
  };



  return (
    <NavLink
      css={cssActivityPostCardStyle(scaleValue)}
      to={`/post/${post.d_boardId}`}
      onClick={handleNavLinkClick}
    >
      <div className="activity-post-card-header">
        <PostTypeTag type={post.type} />
        {isHelpActivity && <PostStatusTag status={post.boardStatus} />}
      </div>
      <div className="activity-post-card-title">{post.title}</div>
      {isHelpActivity ? (
        <>
          <div className="activity-post-date-time">
            활동시간 :{' '}
            {post.startTime
              ? dayjs(post.startTime, 'YYYY-MM-DDTHH:mm:ss').format(
                  'MM월 DD일 HH시 mm분',
                )
              : '-'}{' '}
            ~{' '}
            {post.endTime
              ? dayjs(post.endTime, 'YYYY-MM-DDTHH:mm:ss').format('HH시 mm분')
              : '-'}
          </div>
          {post.type === 'help' && (
            <div className="activity-post-pay">
              소모 예정 타임페이
              <div className="pay-number">{post?.pay || '-'} TP</div>
            </div>
          )}
        </>
      ) : (
        <div className="activity-post-date-time">
          작성시간 :{' '}
          {post && post.createdAt
            ? (post.createdAt || '').split('.')[0].replaceAll('T', ' ')
            : '-'}
        </div>
      )}
    </NavLink>
  );
};

export default ActivityPostCard;
