import {
    cssBtnStyle1 ,
  } from './WritePage.styles';
  import { MenuProps, Modal } from 'antd';
  import { Button } from 'antd';
  import { Link, useNavigate } from 'react-router-dom';
  import { PATH } from '../../utils/paths';
  import { useCallback, useMemo, useState, useEffect } from 'react';
  import { useGetUserInfo } from '../../api/hooks/user';
  import { headerTitleState } from '../../states/uiState';
  import { useSetRecoilState } from 'recoil';
  import { ReactComponent as BackArrow } from '../../assets/images/icons/header-back-arrow.svg';
  import { cssMainHeaderStyle } from '../../components/MainHeader/MainHeader.styles';

  const WritePage = () => {
  
    const setHeaderTitle = useSetRecoilState(headerTitleState);
    const { data } = useGetUserInfo();
    const navigate = useNavigate();
  
    const [isOpenQR, setIsOpenQR] = useState(false);
  
    const isAgency = useMemo(() => {
      if (data?.data.body.manager_name) return true;
      return false;
    }, [data]);
  
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
          if (data?.data.body.id) setIsOpenQR(true);
        },
      });
    }, [data]);
  
    useEffect(() => {
      setHeaderTitle('글쓰기');
    }, [setHeaderTitle]);

    const handleClickBack = useCallback(() => {
      navigate(PATH.HOME);
    }, [navigate]);
  
    return (
      <>
      {/* <div css={cssWriteContainer}> */}
      <div css={cssMainHeaderStyle}>
        <BackArrow onClick={handleClickBack} />
        <span>글쓰기</span>
      </div>
      <div style={{position: 'fixed', width: '100vw', height: '79vh', display: 'flex', flexDirection: 'column'}}>
          <Button onClick={handleOnLinkRequest} css={cssBtnStyle1}><Link to={PATH.Register_HR}>도움요청<br/>도움이 필요할 때<br/>다른 분에게 요청해보세요!</Link></Button>
          <Button onClick={handleOnLinkWith} css={cssBtnStyle1}><Link to={PATH.Register_HS}>같이하기<br/>마음이 맞는 사람끼리<br/>같이 활동해보세요!</Link></Button>
          <Button onClick={handleOnShowQRModal} css={cssBtnStyle1}><Link to={PATH.Register_HR}>바로도움요청<br/>급하게 도움이 필요할 때<br/>도움을 요청해보세요!</Link></Button>
        {/* </div> */}
      </div>
      </>
    );
  };
  
  export default WritePage;
  export function handleOnLinkWrite() {};
  
