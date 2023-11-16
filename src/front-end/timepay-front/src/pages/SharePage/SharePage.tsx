import { Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useGetUserCertificate } from '../../api/hooks/user';
import useFontSize from '../../hooks/useFontSize';
import { headerTitleState } from '../../states/uiState';
import { cssSharePageStyle } from './SharePage.styles';
import { QRCodeCanvas } from 'qrcode.react';

const SharePage = () => {
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  const { scaleValue } = useFontSize();

  const { data, isLoading } = useGetUserCertificate({
    pageIndex: 0,
    pageSize: 999,
  });

  useEffect(() => {
    setHeaderTitle('사이트 공유하기');
  }, [setHeaderTitle]);

  return (
    <div css={cssSharePageStyle(scaleValue)}>
      <div className='ant-spin-container'>
        {isLoading ? (
          <Spin />
        ) : (
          <div>
            <QRCodeCanvas
              className='border-primary border-4 rounded-xl '
              includeMargin
              fgColor="#393E46"
              size={400}
              value="https://timepay.cs.kookmin.ac.kr/app/"
            />
            <div>
            다른 사람들에게 QR 코드를 보여주고 사이트를 공유하세요!
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SharePage;
