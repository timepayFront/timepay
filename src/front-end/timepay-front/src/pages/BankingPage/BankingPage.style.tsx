import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssSendButton = css`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  .choice {
    width: 140px;
    height: 40px;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 1.3px;
    color: ${COMMON_COLOR.LIGHT_YELLOW};
    background-color: ${COMMON_COLOR.LIGHT_YELLOW};
    border: none;
  }
`;
export const cssSend = css`
  text-align: left;
  color: ${COMMON_COLOR.MAIN2};
  h3 {
    margin-bottom: 20px;
  }
  h6 {
    font-weight: 500;
    font-size: 17px;
    color: ${COMMON_COLOR.FONT3};
    line-height: 25px;
    margin-bottom: 30px;
  }
`;
export const cssSendAmount = css`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  width: 200px;
  .inputAM {
    margin-top: 5px;
    width: 200px;
    height: 30px;
    font-weight: 500;
    font-size: 17px;
    letter-spacing: 1.3px;
    color: ${COMMON_COLOR.BLACK};
    background-color: ${COMMON_COLOR.GRAY};
    border: none;
  }
`;
export const cssSendWho = css`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  width: 200px;
  .inputName {
    margin-top: 5px;
    width: 200px;
    height: 30px;
    font-weight: 300;
    font-size: 20px;
    letter-spacing: 1.3px;
    color: ${COMMON_COLOR.BLACK};
    background-color: ${COMMON_COLOR.GRAY};
    border: none;
  }
`;


