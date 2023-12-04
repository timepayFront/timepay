import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';
export const cssBox = css`
  .ant-btn {
    position: fixed;
    z-index: 200;
    background-color: ${COMMON_COLOR.AGENT_RED};
  }
`;

export const cssSearch = css`
  min-width: 54px;
  background-color: ${COMMON_COLOR.MAIN1};
  color: ${COMMON_COLOR.WHITE} !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 54px !important;
  border: none;
  float: right;
  right: -40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const cssHomePageStyle = (scaleValue: number) => css`
  display: flex;
  flex-direction: column;
  .title-search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: calc(30px * ${scaleValue});
    background-color: ${COMMON_COLOR.LOGO1};
    padding-top: 10px;
    padding-bottom: calc(36px * ${scaleValue});
    .title-search {
      display: flex;
      flex-direction: row;
      gap: calc(5px * ${scaleValue});
      .ant-btn {
        border-color: ${COMMON_COLOR.WHITE};
        color: ${COMMON_COLOR.WHITE};
        font-style: normal;
        font-weight: 700;
        font-size: calc(18px * ${scaleValue});
        height: calc(32px * ${scaleValue});
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .ant-input {
        width: 172px;
        font-size: calc(14px * ${scaleValue}) !important;
      }
    }
  }
  .category-search-container {
    padding-top: calc(45px * ${scaleValue});
    padding-bottom: calc(22px * ${scaleValue});
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: calc(20px * ${scaleValue});

    font-style: normal;
    font-weight: 700;
    font-size: calc(18px * ${scaleValue});
    line-height: calc(15px * ${scaleValue});
    color: ${COMMON_COLOR.FONT3};
  }
  .info-container { 
    font-style: normal;
    font-weight: 700;
    font-size: calc(14px * ${scaleValue});
    line-height: calc(20px * ${scaleValue});
    color: #c1c1c1;
    width: 290px;
    margin: auto;
    word-break: keep-all;
    padding-bottom: calc(20px * ${scaleValue});
    justify-content: center;
    margin-top: 30px;
  }
`;

export const cssCategoryListStyle = (scaleValue: number) => css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 290px;
  .ant-btn {
    width: 140px;
    height: calc(56px * ${scaleValue});
    font-style: normal;
    font-weight: 400;
    font-size: calc(15px * ${scaleValue});
    line-height: 20px;
    color: ${COMMON_COLOR.FONT2};
  }
`;

export const cssBtnStyle1 = css`
  flex: 1;
  font-size: 20px;
  width: 33vw;
  height: 30vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  span{
    font-size:25px
  }
  @media (max-width: 768px) {
    span{
      font-size:20px
    }
    font-size: 12px;
  }
`;

export const cssWriteContainer = css`
  display: flex;
  position: fixed;
  bottom: 0; /* 화면 하단에 위치하도록 설정 */
  left: 0;
  width: 100vw;
  justify-content: space-around;
  align-items: center;
  height: 50vh; /* 버튼 높이의 2배로 설정 */
`;


