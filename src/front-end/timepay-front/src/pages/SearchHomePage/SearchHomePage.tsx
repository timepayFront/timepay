import {
    cssBox,
    cssCategoryListStyle,
    cssHomePageStyle,
  } from './SearchHomePage.styles';
  import { ReactComponent as Logo } from '../../assets/images/icons/timepay-character-logo.svg';
  import { Button, Input, Modal, Spin } from 'antd';
  import { useGetCategory } from '../../api/hooks/category';
  import { useNavigate } from 'react-router-dom';
  import { useCallback, useState, useEffect } from 'react';
  import { PATH } from '../../utils/paths';
  import { useRecoilValue, useSetRecoilState } from 'recoil';
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
  import { headerTitleState } from '../../states/uiState';

  const SearchHomePage = () => {

    const setHeaderTitle = useSetRecoilState(headerTitleState);
    const navigate = useNavigate();
  
    const boardSearchValue = useRecoilValue(boardSearchState);
    const setBoardSearchState = useSetRecoilState(boardSearchState);
    const { scaleValue } = useFontSize();
  
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

    useEffect(() => {
      setHeaderTitle('검색');
    }, [setHeaderTitle]);

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
  
        <div className="title-search-container">
          <div className="title-search">
            <Input
              defaultValue={boardSearchValue.title}
              onChange={handleOnChange}
              onPressEnter={handleOnSearchTitle}
            />
            <Button type="ghost" onClick={handleOnSearchTitle}>
              검색
            </Button>
          </div>
        </div>
        <div className="category-search-container">
          {isLoading ? (
            <Spin size="large" />
          ) : (
            <>
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
        </div>
      </div>
    );    
    
  
  };
  
  export default SearchHomePage;