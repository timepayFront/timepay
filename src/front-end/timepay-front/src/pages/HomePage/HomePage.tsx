import {
  cssBox,
  cssCategoryListStyle,
  cssHomePageStyle,
  cssSearch,
  cssBtnStyle1,
  cssWriteContainer,
} from './HomePage.styles';
import { ReactComponent as Logo } from '../../assets/images/icons/timepay-character-logo.svg';
import { Button, Dropdown, Input, Modal, Spin } from 'antd';
import { useGetCategory } from '../../api/hooks/category';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState, useMemo,useEffect } from 'react';
import { PATH } from '../../utils/paths';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AlignRightOutlined, BellOutlined, UserOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import {
  boardSearchState,
  initialBoardSearchState,
} from '../../states/boardSearch';
import useFontSize from '../../hooks/useFontSize';
import {
  getMultiTokenFromCookie,
  setMultiTokenToCookie,
} from '../../utils/token';
import { COMMON_COLOR } from '../../styles/constants/colors';
import InstantActivityQRModal from '../../components/InstantActivityQRModal';

//*********/
import {Link} from 'react-router-dom';
import { useGetUserInfo } from '../../api/hooks/user';
import { headerTitleState } from '../../states/uiState';

const HomePage = () => {
  const navigate = useNavigate();

  const boardSearchValue = useRecoilValue(boardSearchState);
  const setBoardSearchState = useSetRecoilState(boardSearchState);
  const { scaleValue } = useFontSize();

  const handleOnCloseQRModal = useCallback(() => {
    setIsOpenQR(false);
  }, []);

  const { data, isLoading } = useGetCategory({
    type: '도움요청',
    useYn: 'Y',
  });

  const [searchTitleValue, setSearchTitleValue] = useState(
    boardSearchValue?.title,
  );

  const handleOnChange = useCallback((e: any) => {
    setSearchTitleValue(e.target.value);
  }, []);

  const handleOnLinkNotification = useCallback(() => {
    navigate(PATH.NOTIFICATION);
  }, [navigate]);

  const handleOnSearchTitle = useCallback(() => {
    setBoardSearchState({
      ...initialBoardSearchState,
      title: searchTitleValue,
    });
    navigate(PATH.SEARCH);
    window.scrollTo(0, 0);
  }, [searchTitleValue, setBoardSearchState, navigate]);

  const handleOnSearchCategory = useCallback(
    (categoryName: string) => {
      setBoardSearchState({
        ...initialBoardSearchState,
        category: categoryName,
      });
      navigate(PATH.SEARCH);
      window.scrollTo(0, 0);
    },
    [navigate, setBoardSearchState],
  );

  const { confirm } = Modal;
  const token = getMultiTokenFromCookie();

  const logoutToken = useCallback(() => {
    setMultiTokenToCookie('undefined', 0);
    navigate('/my');
  }, [navigate]);

  const openMuliTokenModal = useCallback(() => {
    confirm({
      title: '대리인 활동 종료',
      content: (
        <span>
          <p />
          대리인 활동을 종료할 수 있습니다. <p />
          <p />
        </span>
      ),
      onOk: logoutToken,
      okText: '대리인 활동 종료하기',
      okButtonProps: { style: { backgroundColor: COMMON_COLOR.MAIN2 } },
      onCancel() {},
      cancelText: '취소',
    });
  }, [confirm, logoutToken]);

  //write
  const setHeaderTitle = useSetRecoilState(headerTitleState);
  
  const { data:userInfoData } = useGetUserInfo();

  const [isOpenQR, setIsOpenQR] = useState(false);

  const isAgency = useMemo(() => {
    if (userInfoData?.data.body.manager_name) return true;
    return false;
  }, [userInfoData]);

  const handleOnLinkRequest = () => {
    navigate(PATH.Register_HR);
  };

  const handleOnLinkWith = () => {
    navigate(PATH.Register_HS);
  };


  const handleOnShowQRModal = useCallback(() => {
    Modal.confirm({
      content: '도움이 필요한 분만 눌러주세요!',
      okText: '도움이 필요합니다',
      cancelText: '취소',
      onOk: () => {
        setIsOpenQR(true);
      },
    });
  }, [userInfoData]);

  return (
    <div css={cssHomePageStyle(scaleValue)}>
      {!token || token === 'undefined' ? (
        <div></div>
      ) : (
        <div css={cssBox}>
          <Button
            className="agentAction"
            type="primary"
            block
            onClick={openMuliTokenModal}
          >
            대리인 활동중입니다
          </Button>
        </div>
      )}
      <div className="title-search-container" >
      <Button className="cssHomeHeaderNotificationStyle" css={cssSearch}>
            <BellOutlined onClick={handleOnLinkNotification} />
          {/* 알림 */}
      </Button>
      <Logo />
        {/* <div className="title-search">
          <Input
            defaultValue={boardSearchValue.title}
            onChange={handleOnChange}
            onPressEnter={handleOnSearchTitle}
          />
          <Button type="ghost" onClick={handleOnSearchTitle}>
            검색
          </Button>
        </div> */}
      </div>
      {/* <div className="category-search-container">
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <div>당신의 도움이 필요해요!</div>
            <div css={cssCategoryListStyle(scaleValue)}>
              {data?.data.map((category) => (
                <Button
                  key={category.categoryId}
                  onClick={() => handleOnSearchCategory(category.categoryName)}
                >
                  {category.categoryName}
                </Button>
              ))}
            </div>
          </>
        )}
      </div> */}
      <div className="info-container">
        타임페이 커뮤니티에서 모든 사용자는 도움을 주는 대가로 타임페이를 받을
        수 있어요. <br />
        받은 타임페이로 필요한 곳에 도움을 요청해보세요!
      </div>
      <div css={cssWriteContainer}>
        {/* <div style={{position: 'fixed', width: '100vw', height: '79vh', display: 'flex', flexDirection: 'column'}}> */}
          <Button onClick={handleOnLinkRequest} css={cssBtnStyle1}><Link to={PATH.Register_HR}><span style={{font:'20px'}}>도움요청</span><br/>도움이 필요할 때<br/>다른 분에게 요청해보세요!</Link></Button>
          <Button onClick={handleOnLinkWith} css={cssBtnStyle1}><Link to={PATH.Register_HS}><span>같이하기</span><br/>마음이 맞는 사람끼리<br/>같이 활동해보세요!</Link></Button>
          <Button onClick={handleOnShowQRModal} css={cssBtnStyle1}><Link to={PATH.Register_HR}><span>바로도움요청</span><br/>급하게 도움이 필요할 때<br/>도움을 요청해보세요!</Link></Button>
        {/* </div> */}
      </div>
      <div>
      <InstantActivityQRModal
        isOpen={isOpenQR}
        onCancel={handleOnCloseQRModal}
        helpPk={useGetUserInfo().data?.data.body.id}
      />
      </div>
    </div>
    
  );
};

export default HomePage;
