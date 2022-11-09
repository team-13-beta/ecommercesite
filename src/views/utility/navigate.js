export const navigate = (to, state = {}, isReplace = false) => {
  const historyChangeEvent = new CustomEvent("historychange", {
    detail: {
      to,
      isReplace,
      state,
    },
  });

  dispatchEvent(historyChangeEvent);
};

export const appendDetailMoveHandler = (detailId, data = [], title) => {
  const selectedData = data.find((element) => element.id == detailId);
  console.log(selectedData, detailId, data, "selectedData");
  if (selectedData) {
    navigate(`${location.pathname}/${detailId}`, {
      // 여기서 뒤로 계속 추가되는 값들 제거하기
      title,
      state: selectedData,
    });
  } else {
    alert("해당 요청을 불러올 수 없습니다.");
  }
};
