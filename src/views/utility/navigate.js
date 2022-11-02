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

export const appendDetailMoveHandler = ($element) => {
  $element.addEventListener("click", (e) => {
    e.preventDefault();
    const { target } = e;
    if (target.matches("[data-detail-id]")) {
      const { detailId } = target.dataset;
      navigate(`${location.pathname}/${detailId}`, {
        title: detailId,
        state: "load",
      });
    }
  });
};
