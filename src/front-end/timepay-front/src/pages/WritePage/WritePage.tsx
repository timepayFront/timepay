import {
  cssBtnStyle1,
} from './WritePage.styles';
import { MenuProps, Modal } from 'antd';
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/paths';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { useGetUserInfo } from '../../api/hooks/user';
import { headerTitleState } from '../../states/uiState';
import { useSetRecoilState } from 'recoil';

const WritePage = () => {

  const setHeaderTitle = useSetRecoilState(headerTitleState);
  const { data } = useGetUserInfo();
  const navigate = useNavigate();
  
  const [isOpenQR, setIsOpenQR] = useState(false);

  const isAgency = useMemo(() => {
    if (data?.data.body.manager_name) return true;
    return false;
  }, [data]);

  const handleOnLinkWrite = () => {
    navigate(PATH.WritePage);
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

  const items: MenuProps['items'] = useMemo(() => {
    const items = [
      {
        key: PATH.Register_HR,
        label: <Link to={PATH.Register_HR}>도움요청</Link>,
      },
      {
        key: PATH.Register_HS,
        label: <Link to={PATH.Register_HS}>같이하기</Link>,
      },
    ];
    if (isAgency)
      items.push({
        key: PATH.DONATION_BOARD_WRITE,
        label: <Link to={PATH.DONATION_BOARD_WRITE}>기부하기</Link>,
      });
    else
      items.push({
        key: '바로도움요청',
        label: (
          <Button type="link" onClick={handleOnShowQRModal}>
            바로도움요청
          </Button>
        ),
      });
    return items;
  }, [isAgency, handleOnShowQRModal]);

  useEffect(() => {
    setHeaderTitle('글쓰기');
  }, [setHeaderTitle]);

  return (
    <>
      <div style={{position: 'fixed', width: '100vw', height: '79vh', display: 'flex', flexDirection: 'column'}}>
        <Button css={cssBtnStyle1}><Link to={PATH.Register_HR}>도움요청</Link></Button>
        <Button css={cssBtnStyle1}><Link to={PATH.Register_HS}>같이하기</Link></Button>
        <Button onClick={handleOnShowQRModal} css={cssBtnStyle1}><Link to={PATH.Register_HR}>바로도움요청</Link></Button>
      </div>
      </>
  );
};

export default WritePage;
export function handleOnLinkWrite() {};