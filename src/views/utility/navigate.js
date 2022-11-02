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

export const appendDetailMoveHandler = ($element, data = [], title) => {
  console.log(data);
  $element.addEventListener("click", (e) => {
    e.preventDefault();
    const { target } = e;
    if (target.matches("[data-detail-id]")) {
      const { detailId } = target.dataset;
      console.log(data, detailId);
      const selectedData = data.find((element) => element.id === detailId);
      if (selectedData) {
        navigate(`${location.pathname}/${detailId}`, {
          // 여기서 뒤로 계속 추가되는 값들 제거하기
          title,
          state: selectedData,
        });
      } else {
        alert("해당 요청을 불러올 수 없습니다.");
      }
    }
  });
};
