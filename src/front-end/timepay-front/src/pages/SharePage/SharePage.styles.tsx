import { css } from '@emotion/react';
import { COMMON_COLOR } from '../../styles/constants/colors';

export const cssSharePageStyle = (scaleValue: number) => css`
  padding: 20px;
  .ant-spin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-style: normal;
    font-weight: 700;
    font-size: calc(18px * ${scaleValue});
    line-height: calc(15px * ${scaleValue});
    color: ${COMMON_COLOR.FONT3};
  }
`;
