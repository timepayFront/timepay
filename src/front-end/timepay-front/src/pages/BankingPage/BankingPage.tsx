import { useState ,ChangeEvent} from 'react';
import { PATH } from '../../utils/paths';
import {
  cssSend,
  cssSendButton,
  cssSendAmount,
  cssSendWho,
} from './BankingPage.style';

const BankingPage = () => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [password, setPassword] = useState('');

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleRecipientChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRecipient(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSendMoney = () => {
    // 여기에서는 간단히 콘솔에 출력하는 동작만 시뮬레이션합니다.
    console.log(`Sending ${amount} to ${recipient}`);
    // 여기에서는 실제로는 서버와 통신하여 송금 트랜잭션을 처리해야 합니다.
  };
  
  
  return (
    <div css={cssSend}>
      <h2>송금하기</h2>
      <div css={cssSendAmount}>
        <label>
          얼마나 보낼까요? 
          <input type="number" className="inputAM" value={amount} onChange={handleAmountChange} />
        </label>
      </div>
      <div css={cssSendWho}>
        <label>
          누구에게 보낼까요? 
          <input type="text" className="inputName" value={recipient} onChange={handleRecipientChange} />
        </label>
      </div>
      <div>
        <label>
          비밀번호 입력 : 
          <input type="text" className="inputPW" value={password} onChange={handlePasswordChange} />
          {/*이부분은 만들어만 둔거*/ }
        </label>
      </div>
      <div css={cssSendButton}>
        <button onClick={handleSendMoney}>송금하기</button>
      </div>
    </div>
  );
};

export default BankingPage;
