const brandLink = document.querySelector(".brand");
if (brandLink) brandLink.innerHTML = `<span>Creator</span><strong>OS</strong>`;

const shellLabels = { today: "今日", observe: "观察", language: "语言", library: "资料库" };
Object.entries(shellLabels).forEach(([page, label]) => {
  document.querySelectorAll(`.nav-list [data-page="${page}"], .mobile-nav [data-page="${page}"]`).forEach(item => {
    item.textContent = label;
  });
});

const sidebarNote = document.querySelector(".sidebar-note");
if (sidebarNote) sidebarNote.innerHTML = `<span>本地 MVP</span><small>偏好、收藏和笔记暂时保存在当前浏览器中。</small>`;
