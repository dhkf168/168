// 存储所有内容项数据 - 初始从本地存储加载或为空数组
let contentItems = JSON.parse(localStorage.getItem("contentSystemData")) || [];
let nextItemId = parseInt(localStorage.getItem("contentSystemNextItemId")) || 1;
let nextContentItemId =
  parseInt(localStorage.getItem("contentSystemNextContentItemId")) || 101;

// 当前选中的背景 - 从本地存储加载
let currentBackground = JSON.parse(
  localStorage.getItem("contentSystemBackground"),
) || {
  type: "none",
  src: "",
  isLocalFile: false,
};

// 透明度设置 - 从本地存储加载
let backgroundOpacity =
  parseInt(localStorage.getItem("contentSystemOpacity")) || 30;
let overlayOpacity =
  parseInt(localStorage.getItem("contentSystemOverlayOpacity")) || 30;

// 主题模式 - 从本地存储加载
let isLightMode = localStorage.getItem("contentSystemTheme") === "light";

// DOM元素
const navItemsContainer = document.getElementById("navItems");
const contentContainer = document.getElementById("contentContainer");
const emptyState = document.getElementById("emptyState");
const addMainTitleBtn = document.getElementById("addMainTitleBtn");
const addSubtitleBtn = document.getElementById("addSubtitleBtn");
const addContentBtn = document.getElementById("addContentBtn");
const backgroundSelectorBtn = document.getElementById("backgroundSelectorBtn");
const opacityControlBtn = document.getElementById("opacityControlBtn");
const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const formLabel = document.getElementById("formLabel");
const textareaContainer = document.getElementById("textareaContainer");
const addMoreBtn = document.getElementById("addMoreBtn");
const submitBtn = document.getElementById("submitBtn");
const closeModal = document.getElementById("closeModal");
const contentForm = document.getElementById("contentForm");
const copyNotification = document.getElementById("copyNotification");
const contextMenu = document.getElementById("contextMenu");
const editContextItem = document.getElementById("editContextItem");
const addContextItem = document.getElementById("addContextItem");
const deleteContextItem = document.getElementById("deleteContextItem");
const insertAfterContextItem = document.getElementById(
  "insertAfterContextItem",
);

// 背景相关元素
const backgroundModal = document.getElementById("backgroundModal");
const closeBackgroundModal = document.getElementById("closeBackgroundModal");
const backgroundTabs = document.querySelectorAll(".background-tab");
const backgroundOptions = document.getElementById("backgroundOptions");
const fileUploadArea = document.getElementById("fileUploadArea");
const backgroundFileInput = document.getElementById("backgroundFileInput");
const uploadPreview = document.getElementById("uploadPreview");
const customBackgroundInput = document.getElementById("customBackgroundInput");
const customPreview = document.getElementById("customPreview");
const applyBackgroundBtn = document.getElementById("applyBackgroundBtn");
const cancelBackgroundBtn = document.getElementById("cancelBackgroundBtn");
const backgroundMedia = document.getElementById("background-media");
const backgroundVideo = document.getElementById("background-video");
const backgroundOverlay = document.getElementById("background-overlay");

// 透明度相关元素
const opacityModal = document.getElementById("opacityModal");
const closeOpacityModal = document.getElementById("closeOpacityModal");
const opacitySlider = document.getElementById("opacitySlider");
const opacityValue = document.getElementById("opacityValue");
const opacityPresetBtns = document.querySelectorAll(".opacity-preset-btn");
const applyOpacityBtn = document.getElementById("applyOpacityBtn");
const cancelOpacityBtn = document.getElementById("cancelOpacityBtn");

// 导入导出相关元素
const importExportModal = document.getElementById("importExportModal");
const closeImportExportModal = document.getElementById(
  "closeImportExportModal",
);
const importExportTabs = document.querySelectorAll(".import-export-tab");
const exportDataPreview = document.getElementById("exportDataPreview");
const importFileArea = document.getElementById("importFileArea");
const importFileInput = document.getElementById("importFileInput");
const importPreview = document.getElementById("importPreview");
const exportActionBtn = document.getElementById("exportActionBtn");
const importActionBtn = document.getElementById("importActionBtn");
const cancelImportExportBtn = document.getElementById("cancelImportExportBtn");

// 自动隐藏相关元素
const autoHideTimeInput = document.getElementById("autoHideTimeInput");
const enableAutoHide = document.getElementById("enableAutoHide");

// 插入菜单项元素
const insertMainTitleAfterItem = document.getElementById(
  "insertMainTitleAfterItem",
);
const insertSubtitleAfterItem = document.getElementById(
  "insertSubtitleAfterItem",
);

// 状态变量
let currentItemType = "";
let currentEditItemId = null;
let currentHighlightedItem = null;
let currentEditCardItemId = null;
let currentContentCardId = null;
let contextMenuTarget = null;
let currentImportExportTab = "export";
let currentInsertAfterId = null;

let nextImageId =
  parseInt(localStorage.getItem("contentSystemNextImageId")) || 1001;

// 图片相关DOM元素
const addImagesBtn = document.getElementById("addImagesBtn");
const imageModal = document.getElementById("imageModal");
const imageModalTitle = document.getElementById("imageModalTitle");
const closeImageModal = document.getElementById("closeImageModal");
const imageForm = document.getElementById("imageForm");
const imageUploadArea = document.getElementById("imageUploadArea");
const imageFileInput = document.getElementById("imageFileInput");
const imagePreviewArea = document.getElementById("imagePreviewArea");
const imageUrlInput = document.getElementById("imageUrlInput");
const submitImageBtn = document.getElementById("submitImageBtn");
const insertImagesAfterItem = document.getElementById("insertImagesAfterItem");

// 图片查看器相关DOM元素
const imageViewerModal = document.getElementById("imageViewerModal");
const closeImageViewer = document.getElementById("closeImageViewer");
const viewerImage = document.getElementById("viewerImage");
const prevImageBtn = document.getElementById("prevImageBtn");
const nextImageBtn = document.getElementById("nextImageBtn");
const currentImageIndex = document.getElementById("currentImageIndex");
const totalImages = document.getElementById("totalImages");
const downloadImageBtn = document.getElementById("downloadImageBtn");
const copyImageUrlBtn = document.getElementById("copyImageUrlBtn");
const deleteImageBtn = document.getElementById("deleteImageBtn");

// 图片查看器状态
let currentViewingImages = [];
let currentViewingImageIndex = 0;
let currentViewingCardId = null;

// 自动隐藏相关变量
let autoHideEnabled = localStorage.getItem("contentSystemAutoHide") === "true";
let autoHideTime =
  parseInt(localStorage.getItem("contentSystemAutoHideTime")) || 20;
let hideTimeout = null;
let mouseInWindow = true;

// 保存数据到本地存储
function saveToLocalStorage() {
  localStorage.setItem("contentSystemData", JSON.stringify(contentItems));
  localStorage.setItem("contentSystemNextItemId", nextItemId.toString());
  localStorage.setItem(
    "contentSystemNextContentItemId",
    nextContentItemId.toString(),
  );
  localStorage.setItem(
    "contentSystemBackground",
    JSON.stringify(currentBackground),
  );
  localStorage.setItem("contentSystemOpacity", backgroundOpacity.toString());
  localStorage.setItem(
    "contentSystemOverlayOpacity",
    overlayOpacity.toString(),
  );
  localStorage.setItem("contentSystemTheme", isLightMode ? "light" : "dark");
  localStorage.setItem("contentSystemAutoHide", autoHideEnabled.toString());
  localStorage.setItem("contentSystemAutoHideTime", autoHideTime.toString());
  localStorage.setItem("contentSystemNextImageId", nextImageId.toString());
}

// 初始化页面
function initPage() {
  if (!navItemsContainer || !contentContainer || !emptyState) {
    console.error("必要的DOM元素未找到，等待页面加载");
    setTimeout(initPage, 100);
    return;
  }

  contentItems.sort((a, b) => a.order - b.order);

  renderNavItems();
  renderContent();

  if (contentItems.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }

  setBackground(
    currentBackground.type,
    currentBackground.src,
    currentBackground.isLocalFile,
  );
  setOpacity(backgroundOpacity, overlayOpacity);
  setTheme(isLightMode);
  saveToLocalStorage();
}

// 设置主题
function setTheme(isLight) {
  isLightMode = isLight;
  if (isLightMode) {
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.remove("light-mode");
  }
  saveToLocalStorage();
}

function toggleTheme() {
  setTheme(!isLightMode);
}

// 设置透明度
function setOpacity(bgOpacity, olOpacity) {
  backgroundOpacity = bgOpacity;
  overlayOpacity = olOpacity;

  if (backgroundMedia && backgroundMedia.style.display !== "none") {
    backgroundMedia.style.opacity = (backgroundOpacity / 100).toFixed(2);
  }

  if (backgroundVideo && backgroundVideo.style.display !== "none") {
    backgroundVideo.style.opacity = (backgroundOpacity / 100).toFixed(2);
  }

  if (backgroundOverlay) {
    if (isLightMode) {
      backgroundOverlay.style.background = `rgba(255, 255, 255, ${overlayOpacity / 100})`;
    } else {
      backgroundOverlay.style.background = `rgba(15, 15, 30, ${overlayOpacity / 100})`;
    }
  }

  if (opacitySlider) {
    opacitySlider.value = backgroundOpacity;
  }

  if (opacityValue) {
    opacityValue.textContent = `${backgroundOpacity}%`;
  }

  saveToLocalStorage();
}

// 渲染导航项
function renderNavItems() {
  navItemsContainer.innerHTML = "";

  const mainTitleItems = contentItems.filter(
    (item) => item.type === "main-title",
  );

  mainTitleItems.forEach((item) => {
    const navItem = document.createElement("div");
    navItem.className = "nav-item";
    navItem.dataset.id = item.id;
    navItem.title = item.text;

    navItem.innerHTML = `
            <div class="nav-item-title">${getPreviewText(item.text, 10)}</div>
        `;

    navItem.addEventListener("click", () => {
      document.querySelectorAll(".nav-item").forEach((item) => {
        item.classList.remove("active");
      });
      navItem.classList.add("active");
      scrollToItem(item.id);
    });

    navItemsContainer.appendChild(navItem);
  });
}

// 获取预览文本
function getPreviewText(text, maxLength) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

// 渲染内容区域
function renderContent() {
  contentContainer.innerHTML = "";

  if (contentItems.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  contentItems.forEach((item) => {
    if (item.type === "main-title") {
      renderMainTitle(item);
    } else if (item.type === "subtitle") {
      renderSubtitle(item);
    } else if (item.type === "content-card") {
      renderContentCard(item);
    } else if (item.type === "image-card") {
      renderImageCard(item);
    }
  });

  emptyState.style.display = "none";
}

function renderMainTitle(item) {
  const mainTitle = document.createElement("div");
  mainTitle.className = "main-title";
  mainTitle.id = `item-${item.id}`;
  mainTitle.dataset.id = item.id;
  mainTitle.dataset.type = item.type;
  mainTitle.textContent = item.text;

  mainTitle.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    contextMenuTarget = { type: "main-title", id: item.id };
    showContextMenu(e);
  });

  contentContainer.appendChild(mainTitle);
}

function renderSubtitle(item) {
  const subtitle = document.createElement("div");
  subtitle.className = "subtitle";
  subtitle.id = `item-${item.id}`;
  subtitle.dataset.id = item.id;
  subtitle.dataset.type = item.type;
  subtitle.textContent = item.text;

  subtitle.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    contextMenuTarget = { type: "subtitle", id: item.id };
    showContextMenu(e);
  });

  contentContainer.appendChild(subtitle);
}

function renderContentCard(item) {
  const contentCard = document.createElement("div");
  contentCard.className = "content-card";
  contentCard.id = `card-${item.id}`;
  contentCard.dataset.id = item.id;
  contentCard.dataset.type = "content-card";

  contentCard.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    contextMenuTarget = { type: "content-card", id: item.id };
    showContextMenu(e);
  });

  if (item.content && item.content.length > 0) {
    item.content.forEach((contentItem) => {
      const contentItemElement = document.createElement("div");
      contentItemElement.className = "content-item";
      contentItemElement.id = `content-item-${contentItem.id}`;
      contentItemElement.dataset.id = contentItem.id;
      contentItemElement.dataset.cardId = item.id;
      contentItemElement.dataset.type = "content-item";
      contentItemElement.innerHTML = contentItem.text.replace(/\n/g, "<br>");

      contentItemElement.addEventListener("click", () => {
        navigator.clipboard.writeText(contentItem.text).then(() => {
          showCopyNotification();
          if (currentHighlightedItem) {
            currentHighlightedItem.classList.remove("highlighted");
          }
          contentItemElement.classList.add("highlighted");
          currentHighlightedItem = contentItemElement;
        });
      });

      contentItemElement.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        contextMenuTarget = {
          type: "content-item",
          id: contentItem.id,
          cardId: item.id,
        };
        showContextMenu(e);
      });

      contentCard.appendChild(contentItemElement);
    });
  }

  contentContainer.appendChild(contentCard);
}

// 显示右键菜单
// 修改 showContextMenu() 函数中的条件判断
function showContextMenu(e) {
  contextMenu.style.left = `${e.clientX}px`;
  contextMenu.style.top = `${e.clientY}px`;

  if (contextMenuTarget) {
    editContextItem.style.display = "flex";
    addContextItem.style.display = "flex";
    deleteContextItem.style.display = "flex";

    if (
      contextMenuTarget.type === "content-card" ||
      contextMenuTarget.type === "main-title" ||
      contextMenuTarget.type === "subtitle" ||
      contextMenuTarget.type === "image-card" // 添加这行
    ) {
      insertAfterContextItem.style.display = "flex";
      insertMainTitleAfterItem.style.display = "flex";
      insertSubtitleAfterItem.style.display = "flex";
      insertImagesAfterItem.style.display = "flex";
      // 新增：编辑图片选项只在图片卡片上显示
      const editImagesItem = document.getElementById("editImagesItem");
      if (editImagesItem) {
        editImagesItem.style.display =
          contextMenuTarget.type === "image-card" ? "flex" : "none";
      }
    } else {
      insertAfterContextItem.style.display = "none";
      insertMainTitleAfterItem.style.display = "none";
      insertSubtitleAfterItem.style.display = "none";
      insertImagesAfterItem.style.display = "none";
      // 隐藏编辑图片选项
      const editImagesItem = document.getElementById("editImagesItem");
      if (editImagesItem) {
        editImagesItem.style.display = "none";
      }
    }
  }

  contextMenu.classList.add("active");
}

// 滚动到指定内容项
function scrollToItem(itemId) {
  const itemElement = document.getElementById(`item-${itemId}`);
  if (itemElement) {
    itemElement.scrollIntoView({ behavior: "smooth", block: "start" });

    const originalBackground = itemElement.style.background;
    if (isLightMode) {
      itemElement.style.background = "rgba(255, 64, 129, 0.3)";
    } else {
      itemElement.style.background = "rgba(255, 0, 204, 0.3)";
    }

    setTimeout(() => {
      itemElement.style.background = originalBackground;
    }, 1500);
  }
}

// 显示复制成功通知
function showCopyNotification(message = "复制成功！", type = "content-copied") {
  const notification = document.getElementById("copyNotification");
  const messageSpan = notification.querySelector("span");
  const icon = notification.querySelector("i");

  // 设置消息
  messageSpan.textContent = message;

  // 设置图标
  if (type === "image-copied") {
    icon.className = "fas fa-image";
  } else if (type === "image-deleted") {
    icon.className = "fas fa-trash-alt";
  } else if (type === "data-exported") {
    icon.className = "fas fa-file-export";
  } else {
    icon.className = "fas fa-check-circle";
  }

  // 设置样式类
  notification.className = "copy-notification show";
  notification.classList.add(type);

  // 显示通知
  notification.classList.add("show");

  // 3秒后隐藏
  setTimeout(() => {
    notification.classList.remove("show");
    // 延迟移除类型类，确保动画完成
    setTimeout(() => {
      notification.className = "copy-notification";
    }, 300);
  }, 3000);
}

// 打开新增模态框
function openAddModal(type) {
  currentItemType = type;
  currentEditItemId = null;
  currentEditCardItemId = null;
  currentContentCardId = null;
  currentInsertAfterId = null;

  textareaContainer.innerHTML = `
        <div class="form-group textarea-group">
            <label class="form-label" id="formLabel">内容</label>
            <textarea class="form-input content-textarea" rows="4" placeholder="请输入内容，换行将保留格式"></textarea>
        </div>
    `;

  let title = "";
  switch (type) {
    case "main-title":
      title = "新增大标题";
      formLabel.textContent = "大标题内容（将居中显示，并在左侧生成导航按钮）";
      break;
    case "subtitle":
      title = "新增小标题";
      formLabel.textContent = "小标题内容";
      break;
    case "content-card":
      title = "新增内容卡片";
      formLabel.textContent = "内容（支持多行文本，单击可复制）";
      break;
  }

  modalTitle.textContent = title;
  submitBtn.innerHTML = '<i class="fas fa-save"></i> 保存';
  modalOverlay.classList.add("active");

  setTimeout(() => {
    const firstTextarea = document.querySelector(".content-textarea");
    if (firstTextarea) firstTextarea.focus();
  }, 100);
}

// 打开编辑模态框
function openEditModal() {
  if (!contextMenuTarget) return;

  const { type, id, cardId } = contextMenuTarget;
  textareaContainer.innerHTML = "";

  if (type === "content-item") {
    const cardIndex = contentItems.findIndex((item) => item.id === cardId);
    if (cardIndex !== -1) {
      const contentItem = contentItems[cardIndex].content.find(
        (item) => item.id === id,
      );
      if (contentItem) {
        const textareaGroup = document.createElement("div");
        textareaGroup.className = "form-group textarea-group";
        textareaGroup.innerHTML = `
                    <label class="form-label">内容</label>
                    <textarea class="form-input content-textarea" rows="4">${contentItem.text}</textarea>
                `;
        textareaContainer.appendChild(textareaGroup);
      }
    }
    modalTitle.textContent = "编辑内容";
    currentItemType = "content-item";
    currentEditCardItemId = id;
    currentContentCardId = cardId;
    currentEditItemId = null;
  } else {
    const itemIndex = contentItems.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      const item = contentItems[itemIndex];

      if (type === "content-card") {
        modalTitle.textContent = "编辑内容卡片";
        currentItemType = "content-card";

        if (item.content && item.content.length > 0) {
          item.content.forEach((contentItem, index) => {
            const textareaGroup = document.createElement("div");
            textareaGroup.className = "form-group textarea-group";
            textareaGroup.innerHTML = `
                            <label class="form-label">内容 ${index + 1}</label>
                            <textarea class="form-input content-textarea" rows="4">${contentItem.text}</textarea>
                        `;
            textareaContainer.appendChild(textareaGroup);
          });
        } else {
          const textareaGroup = document.createElement("div");
          textareaGroup.className = "form-group textarea-group";
          textareaGroup.innerHTML = `
                        <label class="form-label">内容</label>
                        <textarea class="form-input content-textarea" rows="4" placeholder="请输入内容，换行将保留格式"></textarea>
                    `;
          textareaContainer.appendChild(textareaGroup);
        }
      } else {
        const textareaGroup = document.createElement("div");
        textareaGroup.className = "form-group textarea-group";

        if (type === "main-title") {
          modalTitle.textContent = "编辑大标题";
          textareaGroup.innerHTML = `
                        <label class="form-label">大标题内容</label>
                        <textarea class="form-input content-textarea" rows="4">${item.text}</textarea>
                    `;
        } else if (type === "subtitle") {
          modalTitle.textContent = "编辑小标题";
          textareaGroup.innerHTML = `
                        <label class="form-label">小标题内容</label>
                        <textarea class="form-input content-textarea" rows="4">${item.text}</textarea>
                    `;
        }

        textareaContainer.appendChild(textareaGroup);
        currentItemType = type;
      }

      currentEditItemId = id;
      currentEditCardItemId = null;
      currentContentCardId = null;
    }
  }

  submitBtn.innerHTML = '<i class="fas fa-save"></i> 更新';
  modalOverlay.classList.add("active");

  setTimeout(() => {
    const firstTextarea = document.querySelector(".content-textarea");
    if (firstTextarea) firstTextarea.focus();
  }, 100);
}

// 新增函数：打开插入卡片模态框
function openInsertAfterModal() {
  if (!contextMenuTarget) return;

  const { type, id } = contextMenuTarget;
  currentItemType = "content-card";
  currentInsertAfterId = id;

  textareaContainer.innerHTML = `
        <div class="form-group textarea-group">
            <label class="form-label">卡片内容（支持多行文本，单击可复制）</label>
            <textarea class="form-input content-textarea" rows="4" placeholder="请输入卡片内容，换行将保留格式"></textarea>
        </div>
    `;

  modalTitle.textContent = "插入内容卡片";
  formLabel.textContent = "卡片内容（支持多行文本，单击可复制）";
  submitBtn.innerHTML = '<i class="fas fa-save"></i> 插入卡片';
  modalOverlay.classList.add("active");

  setTimeout(() => {
    const firstTextarea = document.querySelector(".content-textarea");
    if (firstTextarea) firstTextarea.focus();
  }, 100);
}

// 新增函数：打开插入大标题模态框
function openInsertMainTitleAfterModal() {
  if (!contextMenuTarget) return;

  const { type, id } = contextMenuTarget;
  currentItemType = "main-title";
  currentInsertAfterId = id;

  textareaContainer.innerHTML = `
        <div class="form-group textarea-group">
            <label class="form-label">大标题内容</label>
            <textarea class="form-input content-textarea" rows="4" placeholder="请输入大标题内容"></textarea>
        </div>
    `;

  modalTitle.textContent = "插入大标题";
  formLabel.textContent = "大标题内容";
  submitBtn.innerHTML = '<i class="fas fa-save"></i> 插入大标题';
  modalOverlay.classList.add("active");

  setTimeout(() => {
    const firstTextarea = document.querySelector(".content-textarea");
    if (firstTextarea) firstTextarea.focus();
  }, 100);
}

// 新增函数：打开插入小标题模态框
function openInsertSubtitleAfterModal() {
  if (!contextMenuTarget) return;

  const { type, id } = contextMenuTarget;
  currentItemType = "subtitle";
  currentInsertAfterId = id;

  textareaContainer.innerHTML = `
        <div class="form-group textarea-group">
            <label class="form-label">小标题内容</label>
            <textarea class="form-input content-textarea" rows="4" placeholder="请输入小标题内容"></textarea>
        </div>
    `;

  modalTitle.textContent = "插入小标题";
  formLabel.textContent = "小标题内容";
  submitBtn.innerHTML = '<i class="fas fa-save"></i> 插入小标题';
  modalOverlay.classList.add("active");

  setTimeout(() => {
    const firstTextarea = document.querySelector(".content-textarea");
    if (firstTextarea) firstTextarea.focus();
  }, 100);
}

// 新增文本区域
function addNewTextarea() {
  const textareaGroup = document.createElement("div");
  textareaGroup.className = "form-group textarea-group";
  textareaGroup.innerHTML = `
        <label class="form-label">内容 ${textareaContainer.children.length + 1}</label>
        <textarea class="form-input content-textarea" rows="4" placeholder="请输入内容，换行将保留格式"></textarea>
    `;
  textareaContainer.appendChild(textareaGroup);
}

// 在指定项目后面插入新卡片
function insertContentAfter(targetId, newItem) {
  const targetIndex = contentItems.findIndex((item) => item.id === targetId);

  if (targetIndex !== -1) {
    contentItems.splice(targetIndex + 1, 0, newItem);
    contentItems.forEach((item, index) => {
      item.order = index + 1;
    });
  } else {
    contentItems.push(newItem);
  }
}

// 保存内容项
function saveContentItem(e) {
  e.preventDefault();

  const textareas = document.querySelectorAll(".content-textarea");
  const contents = Array.from(textareas)
    .map((ta) => ta.value.trim())
    .filter((text) => text !== "");

  if (contents.length === 0) {
    alert("请至少输入一个内容区域！");
    return;
  }

  const isInsertOperation =
    currentInsertAfterId &&
    (submitBtn.innerHTML.includes("插入卡片") ||
      submitBtn.innerHTML.includes("插入大标题") ||
      submitBtn.innerHTML.includes("插入小标题"));

  if (currentItemType === "content-item" && currentEditCardItemId) {
    const cardIndex = contentItems.findIndex(
      (item) => item.id === currentContentCardId,
    );

    if (cardIndex !== -1) {
      const contentItemIndex = contentItems[cardIndex].content.findIndex(
        (item) => item.id === currentEditCardItemId,
      );

      if (contentItemIndex !== -1) {
        contentItems[cardIndex].content[contentItemIndex].text = contents[0];
      }
    }
  } else if (currentEditItemId) {
    const itemIndex = contentItems.findIndex(
      (item) => item.id === currentEditItemId,
    );

    if (itemIndex !== -1) {
      if (currentItemType === "content-card") {
        contentItems[itemIndex].content = contents.map((text, index) => ({
          id: contentItems[itemIndex].content[index]?.id || nextContentItemId++,
          type: "content",
          text,
        }));
      } else {
        contentItems[itemIndex].text = contents[0];
      }
    }
  } else if (isInsertOperation) {
    let newItem;

    if (currentItemType === "content-card") {
      newItem = {
        id: nextItemId++,
        type: "content-card",
        content: contents.map((text) => ({
          id: nextContentItemId++,
          type: "content",
          text,
        })),
        order: 0,
        parentId: null,
      };
    } else if (currentItemType === "main-title") {
      newItem = {
        id: nextItemId++,
        type: "main-title",
        text: contents[0],
        order: 0,
        parentId: null,
      };
    } else if (currentItemType === "subtitle") {
      newItem = {
        id: nextItemId++,
        type: "subtitle",
        text: contents[0],
        order: 0,
        parentId: null,
      };
    }

    insertContentAfter(currentInsertAfterId, newItem);
    currentInsertAfterId = null;
  } else {
    let newItem;

    if (currentItemType === "content-card") {
      newItem = {
        id: nextItemId++,
        type: "content-card",
        content: contents.map((text) => ({
          id: nextContentItemId++,
          type: "content",
          text,
        })),
        order: contentItems.length + 1,
        parentId: null,
      };
    } else {
      newItem = {
        id: nextItemId++,
        type: currentItemType,
        text: contents[0],
        order: contentItems.length + 1,
        parentId: null,
      };
    }

    contentItems.push(newItem);
  }

  contentForm.reset();
  modalOverlay.classList.remove("active");
  initPage();

  if (isInsertOperation) {
    setTimeout(() => {
      const newItemId = nextItemId - 1;
      const newItemElement =
        currentItemType === "content-card"
          ? document.getElementById(`card-${newItemId}`)
          : document.getElementById(`item-${newItemId}`);

      if (!newItemElement) return;

      newItemElement.scrollIntoView({ behavior: "smooth", block: "start" });

      const originalBg = newItemElement.style.background;

      if (isLightMode) {
        if (currentItemType === "main-title") {
          newItemElement.style.background = "rgba(255, 64, 129, 0.3)";
        } else if (currentItemType === "subtitle") {
          newItemElement.style.background = "rgba(41, 121, 255, 0.3)";
        } else {
          newItemElement.style.background = "rgba(0, 200, 83, 0.3)";
        }
      } else {
        if (currentItemType === "main-title") {
          newItemElement.style.background = "rgba(255, 0, 204, 0.3)";
        } else if (currentItemType === "subtitle") {
          newItemElement.style.background = "rgba(51, 102, 255, 0.3)";
        } else {
          newItemElement.style.background = "rgba(0, 204, 102, 0.3)";
        }
      }

      setTimeout(() => {
        newItemElement.style.background = originalBg;
      }, 1500);

      if (currentItemType === "main-title") {
        renderNavItems();
        setTimeout(() => {
          document.querySelectorAll(".nav-item").forEach((item) => {
            item.classList.remove("active");
            if (parseInt(item.dataset.id) === newItemId) {
              item.classList.add("active");
            }
          });
        }, 100);
      }
    }, 300);
  }
}

// 删除内容项
function deleteContentItem() {
  if (!contextMenuTarget) return;

  if (!confirm("确定要删除这个内容吗？")) return;

  const { type, id, cardId } = contextMenuTarget;

  if (type === "content-item") {
    const cardIndex = contentItems.findIndex((item) => item.id === cardId);
    if (cardIndex !== -1) {
      contentItems[cardIndex].content = contentItems[cardIndex].content.filter(
        (item) => item.id !== id,
      );
    }
  } else {
    contentItems = contentItems.filter((item) => item.id !== id);
    contentItems.forEach((item, index) => {
      item.order = index + 1;
    });
  }

  initPage();
}

// 设置背景
function setBackground(type, src, isLocalFile = false) {
  if (!backgroundMedia || !backgroundVideo) {
    console.error("背景媒体元素未找到");
    return;
  }

  backgroundMedia.style.display = "none";
  backgroundVideo.style.display = "none";
  backgroundVideo.pause();

  if (type === "none") {
    currentBackground = { type: "none", src: "", isLocalFile: false };
    if (isLightMode) {
      document.body.style.background =
        "linear-gradient(135deg, #e3f2fd, #bbdefb, #90caf9)";
    } else {
      document.body.style.background =
        "linear-gradient(135deg, #0f0c29, #302b63, #24243e)";
    }
  } else if (type === "image") {
    currentBackground = {
      type: "image",
      src: src,
      isLocalFile: isLocalFile,
    };

    backgroundMedia.onload = function () {
      if (backgroundMedia) {
        backgroundMedia.style.display = "block";
        backgroundMedia.style.opacity = (backgroundOpacity / 100).toFixed(2);
        backgroundMedia.style.objectFit = "cover";
        backgroundMedia.style.objectPosition = "center";
      }
    };
    backgroundMedia.onerror = function () {
      console.error("背景图片加载失败:", src);
    };

    backgroundMedia.src = src;
    backgroundMedia.style.objectFit = "cover";
    backgroundMedia.style.objectPosition = "center";
  } else if (type === "video") {
    currentBackground = {
      type: "video",
      src: src,
      isLocalFile: isLocalFile,
    };

    backgroundVideo.onloadeddata = function () {
      if (backgroundVideo) {
        backgroundVideo.style.display = "block";
        backgroundVideo.style.opacity = (backgroundOpacity / 100).toFixed(2);
        backgroundVideo.style.objectFit = "cover";
        backgroundVideo.style.objectPosition = "center";
        backgroundVideo
          .play()
          .catch((e) => console.log("视频自动播放被阻止:", e));
      }
    };
    backgroundVideo.onerror = function () {
      console.error("背景视频加载失败:", src);
    };

    backgroundVideo.src = src;
    backgroundVideo.style.objectFit = "cover";
    backgroundVideo.style.objectPosition = "center";
    backgroundVideo.load();
  }

  saveToLocalStorage();
}

// 预览上传的文件
function previewUploadedFile(file) {
  const previewArea = uploadPreview;
  previewArea.innerHTML = "";

  if (!file) {
    previewArea.innerHTML = "<p>预览区域</p>";
    return;
  }

  const fileType = file.type;
  const isImage = fileType.startsWith("image/");
  const isVideo = fileType.startsWith("video/");

  if (!isImage && !isVideo) {
    previewArea.innerHTML = "<p>不支持的文件格式</p>";
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    if (isImage) {
      const img = document.createElement("img");
      img.src = e.target.result;
      previewArea.appendChild(img);
    } else if (isVideo) {
      const video = document.createElement("video");
      video.src = e.target.result;
      video.controls = true;
      video.muted = true;
      previewArea.appendChild(video);
    }
  };

  reader.readAsDataURL(file);
}

// 预览自定义链接
function previewCustomLink(url) {
  const previewArea = customPreview;
  previewArea.innerHTML = "";

  if (!url) {
    previewArea.innerHTML = "<p>预览区域</p>";
    return;
  }

  if (url.match(/\.(jpg|jpeg|png|gif|webp|bmp)$/i)) {
    const img = document.createElement("img");
    img.src = url;
    img.onerror = function () {
      previewArea.innerHTML = "<p>图片加载失败</p>";
    };
    previewArea.appendChild(img);
  } else if (url.match(/\.(mp4|webm|ogg)$/i)) {
    const video = document.createElement("video");
    video.src = url;
    video.controls = true;
    video.muted = true;
    video.onerror = function () {
      previewArea.innerHTML = "<p>视频加载失败</p>";
    };
    previewArea.appendChild(video);
  } else {
    previewArea.innerHTML = "<p>无法识别链接类型</p>";
  }
}

// 初始化背景选择功能
function initBackgroundSelector() {
  backgroundSelectorBtn.addEventListener("click", () => {
    document.querySelectorAll(".background-option").forEach((option) => {
      option.classList.remove("selected");
    });

    switchTab("background", "preset");

    const currentOption = document.querySelector(
      `.background-option[data-type="${currentBackground.type}"]`,
    );
    if (currentOption && currentBackground.type !== "none") {
      currentOption.classList.add("selected");
    } else {
      document
        .querySelector('.background-option[data-type="none"]')
        .classList.add("selected");
    }

    customBackgroundInput.value = "";
    customPreview.innerHTML = "<p>预览区域</p>";
    uploadPreview.innerHTML = "<p>预览区域</p>";
    backgroundModal.classList.add("active");
  });

  backgroundTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.dataset.tab;
      switchTab("background", tabId);
    });
  });

  document.querySelectorAll(".background-option").forEach((option) => {
    option.addEventListener("click", () => {
      document.querySelectorAll(".background-option").forEach((opt) => {
        opt.classList.remove("selected");
      });
      option.classList.add("selected");
    });
  });

  fileUploadArea.addEventListener("click", () => {
    backgroundFileInput.click();
  });

  // 文件拖放功能
  fileUploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    fileUploadArea.style.borderColor = "#ff9900";
    fileUploadArea.style.background = "rgba(255, 153, 0, 0.1)";
  });

  fileUploadArea.addEventListener("dragleave", () => {
    fileUploadArea.style.borderColor = "rgba(255, 255, 255, 0.1)";
    fileUploadArea.style.background = "rgba(255, 153, 0, 0.05)";
  });

  fileUploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    fileUploadArea.style.borderColor = "rgba(255, 255, 255, 0.1)";
    fileUploadArea.style.background = "rgba(255, 153, 0, 0.05)";

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        backgroundFileInput.files = files; // 原始代码的直接赋值
        previewUploadedFile(file);
      } else {
        alert("请选择图片或视频文件");
      }
    }
  });

  backgroundFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      previewUploadedFile(file);
    }
  });

  customBackgroundInput.addEventListener("input", () => {
    const url = customBackgroundInput.value.trim();
    if (url) {
      previewCustomLink(url);
    } else {
      customPreview.innerHTML = "<p>预览区域</p>";
    }
  });

  applyBackgroundBtn.addEventListener("click", () => {
    const activeTab = document.querySelector(".background-tab.active").dataset
      .tab;

    if (activeTab === "preset") {
      const selectedOption = document.querySelector(
        ".background-option.selected",
      );
      if (selectedOption) {
        const type = selectedOption.dataset.type;
        const src = selectedOption.dataset.src || "";
        setBackground(type, src, false);
        backgroundModal.classList.remove("active");
      }
    } else if (activeTab === "upload") {
      const file = backgroundFileInput.files[0];
      if (!file) {
        alert("请先选择一个文件");
        return;
      }

      const fileType = file.type;
      const isImage = fileType.startsWith("image/");
      const isVideo = fileType.startsWith("video/");

      if (!isImage && !isVideo) {
        alert("请选择图片或视频文件");
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        const type = isImage ? "image" : "video";
        setBackground(type, e.target.result, true);
        backgroundModal.classList.remove("active");
      };
      reader.readAsDataURL(file);
    } else if (activeTab === "custom") {
      const url = customBackgroundInput.value.trim();
      if (!url) {
        alert("请输入图片或视频链接");
        return;
      }

      if (url.match(/\.(jpg|jpeg|png|gif|webp|bmp|mp4|webm|ogg)$/i)) {
        const type = url.match(/\.(mp4|webm|ogg)$/i) ? "video" : "image";
        setBackground(type, url, false);
        backgroundModal.classList.remove("active");
      } else {
        alert(
          "请输入有效的图片或视频链接（支持jpg, png, gif, mp4, webm, ogg格式）",
        );
      }
    }
  });

  cancelBackgroundBtn.addEventListener("click", () => {
    backgroundModal.classList.remove("active");
  });

  closeBackgroundModal.addEventListener("click", () => {
    backgroundModal.classList.remove("active");
  });

  backgroundModal.addEventListener("click", (e) => {
    if (e.target === backgroundModal) {
      backgroundModal.classList.remove("active");
    }
  });
}

// 初始化透明度控制功能
function initOpacityControl() {
  opacityControlBtn.addEventListener("click", () => {
    opacitySlider.value = backgroundOpacity;
    opacityValue.textContent = `${backgroundOpacity}%`;
    opacityModal.classList.add("active");
  });

  opacitySlider.addEventListener("input", function () {
    const value = this.value;
    opacityValue.textContent = `${value}%`;
  });

  opacityPresetBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const value = this.getAttribute("data-value");
      opacitySlider.value = value;
      opacityValue.textContent = `${value}%`;
    });
  });

  applyOpacityBtn.addEventListener("click", () => {
    const newOpacity = parseInt(opacitySlider.value);
    setOpacity(newOpacity, newOpacity);
    saveAutoHideSettings();
    opacityModal.classList.remove("active");
  });

  cancelOpacityBtn.addEventListener("click", () => {
    opacityModal.classList.remove("active");
  });

  closeOpacityModal.addEventListener("click", () => {
    opacityModal.classList.remove("active");
  });

  opacityModal.addEventListener("click", (e) => {
    if (e.target === opacityModal) {
      opacityModal.classList.remove("active");
    }
  });
}

// 切换标签页
function switchTab(modalType, tabId) {
  if (modalType === "background") {
    document.querySelectorAll(".background-tab").forEach((tab) => {
      tab.classList.remove("active");
    });
    document.querySelectorAll(".background-tab-content").forEach((content) => {
      content.classList.remove("active");
    });

    document
      .querySelector(`.background-tab[data-tab="${tabId}"]`)
      .classList.add("active");
    document.getElementById(`${tabId}-tab`).classList.add("active");
  } else if (modalType === "import-export") {
    document.querySelectorAll(".import-export-tab").forEach((tab) => {
      tab.classList.remove("active");
    });
    document
      .querySelectorAll(".import-export-tab-content")
      .forEach((content) => {
        content.classList.remove("active");
      });

    document
      .querySelector(`.import-export-tab[data-tab="${tabId}"]`)
      .classList.add("active");
    document.getElementById(`${tabId}-tab`).classList.add("active");

    currentImportExportTab = tabId;

    if (tabId === "export") {
      exportActionBtn.textContent = "导出数据";
      exportActionBtn.style.display = "block";
      importActionBtn.style.display = "none";
    } else {
      exportActionBtn.style.display = "none";
      importActionBtn.textContent = "导入数据";
      importActionBtn.style.display = "block";
    }
  }
}

// 初始化导入导出功能
function initImportExport() {
  exportBtn.addEventListener("click", () => {
    switchTab("import-export", "export");
    updateExportPreview();
    importExportModal.classList.add("active");
  });

  importBtn.addEventListener("click", () => {
    switchTab("import-export", "import");
    importPreview.innerHTML = "<p>导入文件预览区域</p>";
    importExportModal.classList.add("active");
  });

  importExportTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.dataset.tab;
      switchTab("import-export", tabId);
    });
  });

  exportActionBtn.addEventListener("click", exportData);
  importActionBtn.addEventListener("click", importData);
  cancelImportExportBtn.addEventListener("click", () => {
    importExportModal.classList.remove("active");
  });

  closeImportExportModal.addEventListener("click", () => {
    importExportModal.classList.remove("active");
  });

  importFileArea.addEventListener("click", () => {
    importFileInput.click();
  });

  // 文件拖放功能
  importFileArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    importFileArea.style.borderColor = "#ff3366";
    importFileArea.style.background = "rgba(255, 51, 102, 0.1)";
  });

  importFileArea.addEventListener("dragleave", () => {
    importFileArea.style.borderColor = "rgba(255, 255, 255, 0.1)";
    importFileArea.style.background = "rgba(255, 51, 102, 0.05)";
  });

  importFileArea.addEventListener("drop", (e) => {
    e.preventDefault();
    importFileArea.style.borderColor = "rgba(255, 255, 255, 0.1)";
    importFileArea.style.background = "rgba(255, 51, 102, 0.05)";

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.name.endsWith(".json")) {
        importFileInput.files = files; // 原始代码的直接赋值
        previewImportFile(file);
      } else {
        alert("请选择JSON格式文件");
      }
    }
  });

  importFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      previewImportFile(file);
    }
  });

  importExportModal.addEventListener("click", (e) => {
    if (e.target === importExportModal) {
      importExportModal.classList.remove("active");
    }
  });
}

// 更新导出数据预览
function updateExportPreview() {
  const exportFormat = document.querySelector(
    'input[name="exportFormat"]:checked',
  ).value;

  if (exportFormat === "json") {
    const data = {
      contentItems: contentItems,
      nextItemId: nextItemId,
      nextContentItemId: nextContentItemId,
      currentBackground: currentBackground,
      backgroundOpacity: backgroundOpacity,
      overlayOpacity: overlayOpacity,
      isLightMode: isLightMode,
      exportTime: new Date().toISOString(),
      version: "1.0",
    };

    exportDataPreview.textContent = JSON.stringify(data, null, 2);
  } else {
    let text = "";
    contentItems.forEach((item) => {
      if (item.type === "main-title") {
        text += `【大标题】${item.text}\n\n`;
      } else if (item.type === "subtitle") {
        text += `【小标题】${item.text}\n\n`;
      } else if (item.type === "content-card") {
        text += `【内容卡片】\n`;
        if (item.content && item.content.length > 0) {
          item.content.forEach((contentItem) => {
            text += `  • ${contentItem.text}\n`;
          });
        }
        text += "\n";
      }
    });

    exportDataPreview.textContent = text;
  }
}

// 导出数据
function exportData() {
  const exportFormat = document.querySelector(
    'input[name="exportFormat"]:checked',
  ).value;

  if (exportFormat === "json") {
    const data = {
      contentItems: contentItems,
      nextItemId: nextItemId,
      nextContentItemId: nextContentItemId,
      currentBackground: currentBackground,
      backgroundOpacity: backgroundOpacity,
      overlayOpacity: overlayOpacity,
      isLightMode: isLightMode,
      exportTime: new Date().toISOString(),
      version: "1.0",
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `内容系统备份_${new Date().toISOString().slice(0, 10)}.json`;

    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);

    showCopyNotification();
    copyNotification.querySelector("span").textContent = "数据导出成功！";
  } else {
    let text = "";
    contentItems.forEach((item) => {
      if (item.type === "main-title") {
        text += `【大标题】${item.text}\n\n`;
      } else if (item.type === "subtitle") {
        text += `【小标题】${item.text}\n\n`;
      } else if (item.type === "content-card") {
        text += `【内容卡片】\n`;
        if (item.content && item.content.length > 0) {
          item.content.forEach((contentItem) => {
            text += `  • ${contentItem.text}\n`;
          });
        }
        text += "\n";
      }
    });

    const dataBlob = new Blob([text], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(dataBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `内容系统备份_${new Date().toISOString().slice(0, 10)}.txt`;

    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);

    showCopyNotification();
    copyNotification.querySelector("span").textContent = "数据导出成功！";
  }

  setTimeout(() => {
    importExportModal.classList.remove("active");
  }, 500);
}

// 预览导入文件
// 预览导入文件
function previewImportFile(file) {
  const previewArea = importPreview;
  previewArea.innerHTML = "";

  if (!file) {
    previewArea.innerHTML = "<p>预览区域</p>";
    return;
  }

  // 清除之前的数据
  previewArea.dataset.parsedData = "";

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      // 根据文件类型处理
      if (file.name.toLowerCase().endsWith(".json")) {
        // JSON文件处理
        const data = JSON.parse(e.target.result);

        if (!data.contentItems || !Array.isArray(data.contentItems)) {
          throw new Error("无效的JSON数据格式");
        }

        let previewText = "=== JSON文件预览 ===\n\n";
        data.contentItems.forEach((item) => {
          if (item.type === "main-title") {
            previewText += `• [大标题] ${item.text}\n`;
          } else if (item.type === "subtitle") {
            previewText += `  [小标题] ${item.text}\n`;
          } else if (item.type === "content-card") {
            previewText += `  [内容卡片] ${item.content?.length || 0} 条内容\n`;
          } else if (item.type === "image-card") {
            previewText += `  [图片卡片] ${item.images?.length || 0} 张图片\n`;
          }
        });

        previewText += `\n总计: ${data.contentItems.length} 个项目`;
        previewArea.textContent = previewText;

        // 保存数据用于导入
        previewArea.dataset.parsedData = JSON.stringify(data);
      } else if (
        file.name.toLowerCase().endsWith(".txt") ||
        file.name.toLowerCase().endsWith(".text")
      ) {
        // TXT文件处理
        const txtContent = e.target.result;

        // 使用新的解析器
        if (typeof parseTxtContent !== "undefined") {
          // 解析内容
          const parsedItems = parseTxtContent(txtContent);

          // 生成预览
          let previewText = "=== TXT文件智能解析 ===\n\n";

          // 解析规则说明
          previewText += "【解析规则】\n";
          previewText += "• ### 或 h3 → 大标题（生成左侧导航）\n";
          previewText += "• #### 或 h4/h5 → 小标题\n";
          previewText += "• ./path/image.jpg → 图片卡片\n";
          previewText += "• 连续文本（无空行）→ 同一卡片\n";
          previewText += "• 空行分隔 → 新卡片开始\n\n";

          // 统计信息
          const titles = parsedItems.filter(
            (item) => item.type === "main-title",
          ).length;
          const subtitles = parsedItems.filter(
            (item) => item.type === "subtitle",
          ).length;
          const images = parsedItems.filter(
            (item) => item.type === "image-card",
          ).length;
          const contentCards = parsedItems.filter(
            (item) => item.type === "content-card",
          ).length;

          previewText += "【统计信息】\n";
          previewText += `大标题: ${titles} 个\n`;
          previewText += `小标题: ${subtitles} 个\n`;
          previewText += `图片卡片: ${images} 个\n`;
          previewText += `内容卡片: ${contentCards} 个\n`;
          previewText += `总计项目: ${parsedItems.length} 个\n\n`;

          // 显示目录
          if (titles > 0) {
            previewText += "【目录结构】\n";
            parsedItems
              .filter((item) => item.type === "main-title")
              .forEach((item, index) => {
                previewText += `${index + 1}. ${item.text}\n`;
              });
            previewText += "\n";
          }

          // 显示内容示例
          if (parsedItems.length > 0) {
            previewText += "【内容示例】\n";
            const sampleCount = Math.min(3, parsedItems.length);
            for (let i = 0; i < sampleCount; i++) {
              const item = parsedItems[i];
              previewText += `${i + 1}. [${item.type}] `;

              if (item.type === "main-title") {
                previewText += `"${item.text}"\n`;
              } else if (item.type === "subtitle") {
                previewText += `"${item.text}"\n`;
              } else if (item.type === "content-card") {
                previewText += `包含 ${item.content?.length || 0} 条内容\n`;
                if (item.content && item.content.length > 0) {
                  previewText += `  示例: "${item.content[0].text.substring(0, 50)}${item.content[0].text.length > 50 ? "..." : ""}"\n`;
                }
              } else if (item.type === "image-card") {
                previewText += `图片: ${item.images?.[0]?.filename || "未命名"}\n`;
              }
            }

            if (parsedItems.length > sampleCount) {
              previewText += `... 还有 ${parsedItems.length - sampleCount} 个项目\n`;
            }
          }

          previewArea.textContent = previewText;

          // 保存解析数据
          previewArea.dataset.parsedData = JSON.stringify({
            contentItems: parsedItems,
            parsedFromTxt: true,
            originalFileType: "txt",
          });
        } else {
          // 基本TXT预览
          const lines = txtContent
            .split("\n")
            .filter((line) => line.trim().length > 0);
          previewArea.textContent = `TXT文件检测到 ${lines.length} 行非空文本\n\n请确保已加载智能解析功能`;
        }
      } else {
        previewArea.innerHTML = `<p style="color: #ff6666;">不支持的文件格式，请选择JSON或TXT文件</p>`;
      }
    } catch (error) {
      console.error("文件预览失败:", error);
      previewArea.innerHTML = `<p style="color: #ff6666;">文件解析失败: ${error.message}</p>`;
    }
  };

  reader.onerror = function () {
    previewArea.innerHTML = `<p style="color: #ff6666;">文件读取失败</p>`;
  };

  reader.readAsText(file, "UTF-8");
}

// 导入数据
// 导入数据
function importData() {
  const file = importFileInput.files[0];

  if (!file) {
    alert("请先选择一个文件");
    return;
  }

  const previewArea = importPreview;
  const parsedData = previewArea.dataset.parsedData;

  if (!parsedData) {
    alert("请先预览文件内容");
    return;
  }

  try {
    const data = JSON.parse(parsedData);

    // 检查是否从TXT解析而来
    const isFromTxt = data.parsedFromTxt || false;
    const itemsToImport = data.contentItems || data;

    if (!Array.isArray(itemsToImport) || itemsToImport.length === 0) {
      alert("没有找到可导入的内容");
      return;
    }

    let confirmMessage = `确定要导入 ${itemsToImport.length} 个内容项吗？`;

    if (isFromTxt) {
      const titles = itemsToImport.filter(
        (item) => item.type === "main-title",
      ).length;
      const subtitles = itemsToImport.filter(
        (item) => item.type === "subtitle",
      ).length;
      const images = itemsToImport.filter(
        (item) => item.type === "image-card",
      ).length;
      const contentCards = itemsToImport.filter(
        (item) => item.type === "content-card",
      ).length;

      confirmMessage = `确定要导入 ${itemsToImport.length} 个内容项吗？\n\nTXT解析结果：\n• ${titles} 个大标题\n• ${subtitles} 个小标题\n• ${images} 张图片\n• ${contentCards} 个内容卡片`;
    }

    if (!confirm(confirmMessage + "\n\n导入将替换当前所有内容！")) {
      return;
    }

    // 清空现有内容
    contentItems = [];

    // 导入数据
    if (isFromTxt) {
      // TXT解析的数据
      contentItems = itemsToImport;

      // 更新ID计数器
      if (itemsToImport.length > 0) {
        const maxId = Math.max(...itemsToImport.map((item) => item.id || 0));
        nextItemId = Math.max(nextItemId, maxId + 1);
      }

      // 更新内容项ID
      const allContentItems = itemsToImport
        .filter((item) => item.type === "content-card")
        .flatMap((item) => item.content || [])
        .map((item) => item.id)
        .filter((id) => !isNaN(id));

      if (allContentItems.length > 0) {
        const maxContentId = Math.max(...allContentItems);
        nextContentItemId = Math.max(nextContentItemId, maxContentId + 1);
      }

      // 更新图片ID
      const allImages = itemsToImport
        .filter((item) => item.type === "image-card")
        .flatMap((item) => item.images || [])
        .map((img) => img.id)
        .filter((id) => !isNaN(id));

      if (allImages.length > 0) {
        const maxImageId = Math.max(...allImages);
        nextImageId = Math.max(nextImageId, maxImageId + 1);
      }
    } else {
      // 标准JSON数据
      contentItems = data.contentItems || [];
      nextItemId = data.nextItemId || nextItemId;
      nextContentItemId = data.nextContentItemId || nextContentItemId;

      if (data.currentBackground) {
        currentBackground = data.currentBackground;
        setBackground(
          currentBackground.type,
          currentBackground.src,
          currentBackground.isLocalFile || false,
        );
      }

      if (data.backgroundOpacity) {
        setOpacity(
          data.backgroundOpacity,
          data.overlayOpacity || data.backgroundOpacity,
        );
      }

      if (typeof data.isLightMode !== "undefined") {
        setTheme(data.isLightMode);
      }
    }

    // 重新初始化页面
    initPage();
    saveToLocalStorage();

    // 显示成功通知
    showCopyNotification();
    copyNotification.querySelector("span").textContent =
      `成功导入 ${itemsToImport.length} 个内容项！`;

    // 关闭模态框
    setTimeout(() => {
      importExportModal.classList.remove("active");
    }, 500);
  } catch (error) {
    alert(`导入失败: ${error.message}`);
  }
}

// 自动隐藏功能
function initAutoHideSettings() {
  autoHideTimeInput.value = autoHideTime;
  enableAutoHide.checked = autoHideEnabled;

  if (autoHideEnabled) {
    startAutoHideTimer();
  } else {
    stopAutoHideTimer();
    showAllElements();
  }

  setupAutoHideListeners();
}

function setupAutoHideListeners() {
  if (autoHideTimeInput) {
    autoHideTimeInput.addEventListener("input", function () {
      const value = parseInt(this.value);
      if (value < 5) this.value = 5;
      if (value > 300) this.value = 300;
    });

    autoHideTimeInput.addEventListener("change", saveAutoHideSettings);
  }

  if (enableAutoHide) {
    enableAutoHide.addEventListener("change", saveAutoHideSettings);
  }
}

function startAutoHideTimer() {
  stopAutoHideTimer();

  if (autoHideEnabled && autoHideTime > 0) {
    hideTimeout = setTimeout(() => {
      if (!mouseInWindow) {
        hideContentElements();
      }
    }, autoHideTime * 1000);
  }
}

function stopAutoHideTimer() {
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
}

function hideContentElements() {
  const sidebar = document.querySelector(".sidebar");
  const contentArea = document.querySelector(".content-area");
  const mainContent = document.querySelector(".main-content");

  if (sidebar) sidebar.classList.add("hidden");
  if (contentArea) contentArea.classList.add("hidden");
  if (mainContent) mainContent.classList.add("hidden");
}

function showAllElements() {
  const sidebar = document.querySelector(".sidebar");
  const contentArea = document.querySelector(".content-area");
  const mainContent = document.querySelector(".main-content");

  if (sidebar) sidebar.classList.remove("hidden");
  if (contentArea) contentArea.classList.remove("hidden");
  if (mainContent) mainContent.classList.remove("hidden");
}

function resetAutoHideTimer() {
  if (autoHideEnabled) {
    showAllElements();
    startAutoHideTimer();
  }
}

function saveAutoHideSettings() {
  autoHideTime = parseInt(autoHideTimeInput.value) || 20;
  autoHideEnabled = enableAutoHide.checked;

  if (autoHideTime < 5) autoHideTime = 5;
  if (autoHideTime > 300) autoHideTime = 300;
  autoHideTimeInput.value = autoHideTime;

  if (autoHideEnabled) {
    startAutoHideTimer();
  } else {
    stopAutoHideTimer();
    showAllElements();
  }

  saveToLocalStorage();
}

// 事件监听
addMainTitleBtn.addEventListener("click", () => openAddModal("main-title"));
addSubtitleBtn.addEventListener("click", () => openAddModal("subtitle"));
addContentBtn.addEventListener("click", () => openAddModal("content-card"));
themeToggleBtn.addEventListener("click", toggleTheme);

closeModal.addEventListener("click", () => {
  modalOverlay.classList.remove("active");
  currentEditItemId = null;
  currentEditCardItemId = null;
  currentContentCardId = null;
  currentInsertAfterId = null;
  currentItemType = "";
});

addMoreBtn.addEventListener("click", addNewTextarea);
contentForm.addEventListener("submit", saveContentItem);

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("active");
    currentEditItemId = null;
    currentEditCardItemId = null;
    currentContentCardId = null;
    currentInsertAfterId = null;
    currentItemType = "";
  }
});

// 右键菜单功能
editContextItem.addEventListener("click", () => {
  openEditModal();
  contextMenu.classList.remove("active");
});

insertAfterContextItem.addEventListener("click", () => {
  openInsertAfterModal();
  contextMenu.classList.remove("active");
});

insertMainTitleAfterItem.addEventListener("click", () => {
  openInsertMainTitleAfterModal();
  contextMenu.classList.remove("active");
});

insertSubtitleAfterItem.addEventListener("click", () => {
  openInsertSubtitleAfterModal();
  contextMenu.classList.remove("active");
});

addContextItem.addEventListener("click", () => {
  if (contextMenuTarget && contextMenuTarget.type === "content-card") {
    currentItemType = "content-card";
    currentEditItemId = contextMenuTarget.id;
    openEditModal();
  } else {
    let type = "main-title";
    if (contextMenuTarget) {
      if (contextMenuTarget.type === "main-title") {
        type = "main-title";
      } else if (contextMenuTarget.type === "subtitle") {
        type = "subtitle";
      } else if (contextMenuTarget.type === "content-card") {
        type = "content-card";
      }
    }
    openAddModal(type);
  }
  contextMenu.classList.remove("active");
});

deleteContextItem.addEventListener("click", () => {
  deleteContentItem();
  contextMenu.classList.remove("active");
});

// 全局事件
document.addEventListener("click", () => {
  contextMenu.classList.remove("active");
  contextMenuTarget = null;
});

document.addEventListener("contextmenu", (e) => {
  if (
    e.target.closest(".content-item") ||
    e.target.closest(".main-title") ||
    e.target.closest(".subtitle") ||
    e.target.closest(".content-card")
  ) {
    e.preventDefault();
  }
});

// 自动隐藏事件
document.addEventListener("mousemove", () => {
  mouseInWindow = true;
  resetAutoHideTimer();
});

document.addEventListener("mouseenter", () => {
  mouseInWindow = true;
  resetAutoHideTimer();
});

document.addEventListener("mouseleave", (e) => {
  if (
    e.clientY <= 0 ||
    e.clientX <= 0 ||
    e.clientX >= window.innerWidth ||
    e.clientY >= window.innerHeight
  ) {
    mouseInWindow = false;
    resetAutoHideTimer();
  }
});

document.addEventListener("keydown", resetAutoHideTimer);
document.addEventListener("click", resetAutoHideTimer);

window.addEventListener("resize", () => {});
window.addEventListener("beforeunload", saveToLocalStorage);

// 主初始化函数
function initializeApp() {
  initBackgroundSelector();
  initOpacityControl();
  initImportExport();
  initPage();
  initAutoHideSettings();
  initImageFunctions();

  // 初始化TXT导入功能（如果存在）
  if (typeof initTxtImportFunctions === "function") {
    initTxtImportFunctions();
  }
}

// 页面加载完成后初始化
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM已加载完成，开始初始化应用...");
    initializeApp();

    const editImagesItem = document.getElementById("editImagesItem");
    if (editImagesItem) {
      editImagesItem.addEventListener("click", () => {
        if (contextMenuTarget && contextMenuTarget.type === "image-card") {
          // 调用图片编辑功能
          if (typeof openEditImageModal === "function") {
            openEditImageModal();
          }
        }
        contextMenu.classList.remove("active");
      });
    }
  });
} else {
  console.log("文档已经加载完成，立即初始化...");
  initializeApp();
}
