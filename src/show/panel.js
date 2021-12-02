import ShowPage from './showpage';

function Panel(csi) {
  this.csi = csi;
}

Panel.prototype = {
  init() {
    const showPage = new ShowPage(this.csi.report.bind(this.csi));

    document.addEventListener('keydown', (event) => {
      event = event || window.event;
      if (event.ctrlKey && parseInt(event.key, 10) === 6) {
        showPage.toggleShow();
      }
    });
  },
};

export default Panel;
