(async function () {
  const createModal = () => {
    const modal = document.createElement("div");
    modal.id = "custom-modal";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.width = "400px";
    modal.style.background = "white";
    modal.style.border = "1px solid #ccc";
    modal.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.2), 0 2px 10px rgba(0, 0, 0, 0.1)";
    modal.style.padding = "25px";
    modal.style.borderRadius = "16px";
    modal.style.zIndex = "10000";
    modal.style.maxHeight = "90vh";
    modal.style.overflow = "hidden";
    modal.style.minWidth = "400px";
    modal.style.minHeight = "300px";
    modal.style.maxWidth = "90vw";
    modal.style.cursor = "move";

    modal.innerHTML = `
      <button id="close-btn" style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 20px; cursor: pointer; color: #666; transition: all 0.2s ease; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background-color: #f8f9fa; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 10002;">✖</button>
      <div id="modal-content" style="height: calc(100% - 20px); overflow-y: auto; padding: 20px 35px 20px 20px;">
        <div style="margin-bottom: 25px; cursor: move;">
          <img src="https://crdrdispatch.github.io/GembaScript/Logo.svg" alt="Logo" style="height: 90px; display: block; margin: 0 auto; -webkit-transform: translateZ(0); transform: translateZ(0); pointer-events: none;">
        </div>
        <h2 style="font-family: Arial, sans-serif; margin-bottom: 25px; border-bottom: 2px solid #eee; padding-bottom: 15px; color: #2c3e50; font-size: 24px; text-align: center;">Gimme That GEMBA</h2>
        <div id="progress-section" style="margin-bottom: 30px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <h3 style="font-family: Arial, sans-serif; font-size: 16px; color: #2c3e50; margin: 0; font-weight: 600;">Progress</h3>
              <span id="progress-status" style="display: none; font-size: 12px; padding: 3px 10px; border-radius: 20px; background-color: #4CAF50; color: white; font-weight: 500; box-shadow: 0 2px 4px rgba(76, 175, 80, 0.2);">Complete</span>
            </div>
            <button id="toggle-progress" style="background: none; border: none; color: #666; cursor: pointer; font-size: 14px; padding: 5px 10px; border-radius: 5px; transition: background-color 0.2s ease;">Hide</button>
          </div>
          <div id="progress-details" style="font-family: Arial, sans-serif; text-align: left; margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 12px; border: 1px solid #edf2f7;">
            <p>Initializing...</p>
          </div>
        </div>
        <div id="da-selection-section" style="display: none; margin-bottom: 30px;">
          <h3 style="font-family: Arial, sans-serif; font-size: 16px; color: #2c3e50; margin-bottom: 12px; font-weight: 600;">These routes have multiple DAs. Please select the DA assigned to the route.</h3>
          <div id="da-dropdowns" style="max-height: 400px; overflow-y: auto; padding: 15px; background: #f8f9fa; border-radius: 12px; border: 1px solid #edf2f7;">
          </div>
          <div style="margin-top: 20px; text-align: right;">
            <button id="da-next-btn" style="padding: 12px 30px; background-color: #4CAF50; color: white; border: none; border-radius: 8px; cursor: pointer; font-family: Arial, sans-serif; font-weight: 500; font-size: 15px; box-shadow: 0 4px 6px rgba(76, 175, 80, 0.2); transition: all 0.2s ease;">Next</button>
          </div>
        </div>
        <div id="preview-section" style="display: none; margin-bottom: 30px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <button id="back-btn" style="padding: 8px 16px; background-color: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: Arial, sans-serif; font-weight: 500; font-size: 14px; box-shadow: 0 2px 4px rgba(108, 117, 125, 0.2); transition: all 0.2s ease; display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 18px;">←</span> Back
            </button>
            <h3 style="font-family: Arial, sans-serif; font-size: 16px; color: #2c3e50; margin: 0; font-weight: 600;">Route Details</h3>
            <div style="width: 80px;"></div>
          </div>
          <div id="route-details" style="max-height: 400px; overflow-y: auto; padding: 15px; background: #f8f9fa; border-radius: 12px; border: 1px solid #edf2f7; scrollbar-width: thin; scrollbar-color: #cbd5e0 #f8f9fa;">
          </div>
          <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
            <button id="preview-next-btn" style="padding: 12px 30px; background-color: #4CAF50; color: white; border: none; border-radius: 8px; cursor: pointer; font-family: Arial, sans-serif; font-weight: 500; font-size: 15px; box-shadow: 0 4px 6px rgba(76, 175, 80, 0.2); transition: all 0.2s ease;">Next</button>
          </div>
        </div>
        <div id="dsp-progress-section" style="display: none;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <button id="progress-back-btn" style="padding: 8px 16px; background-color: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: Arial, sans-serif; font-weight: 500; font-size: 14px; box-shadow: 0 2px 4px rgba(108, 117, 125, 0.2); transition: all 0.2s ease; display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 18px;">←</span> Back
            </button>
            <h3 style="font-family: Arial, sans-serif; font-size: 16px; color: #2c3e50; margin: 0; font-weight: 600;">DSP Total Progress</h3>
            <div style="width: 80px;"></div>
          </div>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px;">
            <div class="input-group">
              <label style="display: block; margin-bottom: 8px; color: #2c3e50; font-weight: 600; font-size: 14px;">In Progress:</label>
              <input type="number" id="in-progress-input" class="progress-input" style="width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 14px;" min="0">
            </div>
            <div class="input-group">
              <label style="display: block; margin-bottom: 8px; color: #2c3e50; font-weight: 600; font-size: 14px;">At Risk:</label>
              <input type="number" id="at-risk-input" class="progress-input" style="width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 14px;" min="0">
            </div>
            <div class="input-group">
              <label style="display: block; margin-bottom: 8px; color: #2c3e50; font-weight: 600; font-size: 14px;">Behind:</label>
              <input type="number" id="behind-input" class="progress-input" style="width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 14px;" min="0">
            </div>
            <div class="input-group">
              <label style="display: block; margin-bottom: 8px; color: #2c3e50; font-weight: 600; font-size: 14px;">Package Progress:</label>
              <input type="number" id="package-progress-input" class="progress-input" style="width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 14px;" min="0" max="100">
            </div>
          </div>
          <div style="text-align: center;">
            <button id="download-btn" style="padding: 12px 30px; background-color: #4CAF50; color: white; border: none; border-radius: 8px; cursor: pointer; font-family: Arial, sans-serif; font-weight: 500; font-size: 15px; box-shadow: 0 4px 6px rgba(76, 175, 80, 0.2); transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 8px;">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196667 15.0217 0.001333 14.5507 0 14V11H2V14H14V11H16V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16 14 16H2Z" fill="white"/>
              </svg>
              Download File
            </button>
          </div>
        </div>
      </div>
    `;

    // Add resize handle styles
    const resizeHandle = document.createElement('div');
    resizeHandle.style.position = 'absolute';
    resizeHandle.style.right = '0';
    resizeHandle.style.bottom = '0';
    resizeHandle.style.width = '20px';
    resizeHandle.style.height = '20px';
    resizeHandle.style.cursor = 'se-resize';
    resizeHandle.style.zIndex = '10002';
    resizeHandle.style.userSelect = 'none';
    resizeHandle.style.backgroundColor = '#f8f9fa';
    resizeHandle.style.display = 'flex';
    resizeHandle.style.alignItems = 'center';
    resizeHandle.style.justifyContent = 'center';
    resizeHandle.style.padding = '3px';

    // Create SVG for resize handle with diagonal lines
    const svgContent = `
      <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
        <style>
          .resize-line { stroke: #666; stroke-width: 1.5; }
        </style>
        <line x1="10" y1="14" x2="14" y2="10" class="resize-line" />
        <line x1="6" y1="14" x2="14" y2="6" class="resize-line" />
        <line x1="2" y1="14" x2="14" y2="2" class="resize-line" />
      </svg>
    `;
    resizeHandle.innerHTML = svgContent;

    modal.appendChild(resizeHandle);

    // Update resize handle position
    const updateResizeHandlePosition = () => {
        // No need to update position since it's absolute positioned
        // Just ensure the handle is visible
        resizeHandle.style.display = 'flex';
    };

    // Add resize functionality
    const resize = {
        isResizing: false,
        startX: 0,
        startY: 0,
        startWidth: 0,
        startHeight: 0
    };

    const onMouseDown = function(e) {
        resize.isResizing = true;
        resize.startX = e.clientX;
        resize.startY = e.clientY;
        resize.startWidth = modal.offsetWidth;
        resize.startHeight = modal.offsetHeight;
        e.stopPropagation();
        document.body.style.cursor = 'se-resize';
    };

    const onMouseMove = function(e) {
        if (!resize.isResizing) return;

        const deltaX = e.clientX - resize.startX;
        const deltaY = e.clientY - resize.startY;

        const newWidth = Math.max(400, Math.min(resize.startWidth + deltaX, window.innerWidth * 0.9));
        const newHeight = Math.max(300, Math.min(resize.startHeight + deltaY, window.innerHeight * 0.9));

        modal.style.width = newWidth + 'px';
        modal.style.height = newHeight + 'px';
    };

    const onMouseUp = function() {
        if (resize.isResizing) {
            resize.isResizing = false;
            document.body.style.cursor = 'default';
        }
    };

    resizeHandle.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // Add hover effects
    const closeBtn = modal.querySelector("#close-btn");
    closeBtn.addEventListener("mouseover", () => {
        closeBtn.style.backgroundColor = '#fee2e2';
        closeBtn.style.color = '#ef4444';
        closeBtn.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    });
    closeBtn.addEventListener("mouseout", () => {
        closeBtn.style.backgroundColor = '#f8f9fa';
        closeBtn.style.color = '#666';
        closeBtn.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    });

    const modalToggleBtn = modal.querySelector("#toggle-progress");
    const progressDetails = modal.querySelector("#progress-details");
    
    modalToggleBtn.addEventListener("mouseover", () => {
      modalToggleBtn.style.backgroundColor = "#f0f0f0";
    });
    modalToggleBtn.addEventListener("mouseout", () => {
      modalToggleBtn.style.backgroundColor = "transparent";
    });
    
    // Add toggle functionality
    modalToggleBtn.addEventListener("click", () => {
      if (progressDetails.style.display === "none") {
        progressDetails.style.display = "block";
        modalToggleBtn.textContent = "Hide";
      } else {
        progressDetails.style.display = "none";
        modalToggleBtn.textContent = "Show";
      }
    });

    const nextButtons = modal.querySelectorAll("#da-next-btn, #preview-next-btn");
    nextButtons.forEach(btn => {
      btn.addEventListener("mouseover", () => {
        btn.style.backgroundColor = "#45a049";
        btn.style.boxShadow = "0 6px 8px rgba(76, 175, 80, 0.3)";
      });
      
      btn.addEventListener("mouseout", () => {
        btn.style.backgroundColor = "#4CAF50";
        btn.style.boxShadow = "0 4px 6px rgba(76, 175, 80, 0.2)";
      });
    });

    const downloadBtn = modal.querySelector("#download-btn");
    downloadBtn.addEventListener("mouseover", () => {
      downloadBtn.style.backgroundColor = "#45a049";
      downloadBtn.style.boxShadow = "0 6px 8px rgba(76, 175, 80, 0.3)";
    });
    downloadBtn.addEventListener("mouseout", () => {
      downloadBtn.style.backgroundColor = "#4CAF50";
      downloadBtn.style.boxShadow = "0 4px 6px rgba(76, 175, 80, 0.2)";
    });

    document.body.appendChild(modal);

    // Make modal draggable
    let isDragging = false;
    let startX;
    let startY;
    let modalRect;

    const dragStart = (e) => {
      if (e.target.closest('button') || e.target.closest('select')) return;  

      isDragging = true;
      modalRect = modal.getBoundingClientRect();
      
      if (e.type === "touchstart") {
        startX = e.touches[0].clientX - modalRect.left;
        startY = e.touches[0].clientY - modalRect.top;
      } else {
        startX = e.clientX - modalRect.left;
        startY = e.clientY - modalRect.top;
      }
      
      modal.style.cursor = 'grabbing';
    };

    const dragEnd = () => {
      isDragging = false;
      modal.style.cursor = 'move';
    };

    const drag = (e) => {
      if (!isDragging) return;
      e.preventDefault();

      let x, y;
      if (e.type === "touchmove") {
        x = e.touches[0].clientX - startX;
        y = e.touches[0].clientY - startY;
      } else {
        x = e.clientX - startX;
        y = e.clientY - startY;
      }

      const modalWidth = modalRect.width;
      const modalHeight = modalRect.height;
      const maxX = window.innerWidth - modalWidth;
      const maxY = window.innerHeight - modalHeight;

      x = Math.max(0, Math.min(x, maxX));
      y = Math.max(0, Math.min(y, maxY));

      modal.style.left = x + 'px';
      modal.style.top = y + 'px';
      modal.style.transform = 'none';
      modal.style.webkitTransform = 'none';
      updateResizeHandlePosition();
    };

    modal.addEventListener("touchstart", dragStart, { passive: false });
    modal.addEventListener("touchend", dragEnd);
    modal.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("mousedown", (e) => {
      if (modal.contains(e.target)) dragStart(e);
    });
    document.addEventListener("mouseup", dragEnd);
    document.addEventListener("mousemove", drag);

    // Clean up event listeners when modal is closed
    modal.querySelector("#close-btn").addEventListener("click", () => {
      document.removeEventListener("mousedown", dragStart);
      document.removeEventListener("mouseup", dragEnd);
      document.removeEventListener("mousemove", drag);
      modal.remove();
    });

    return modal;
  };

  const updateProgress = (message, append = true, complete = false) => {
    const progressDetails = document.getElementById("progress-details");
    const progressStatus = document.getElementById("progress-status");
    const toggleBtn = document.getElementById("toggle-progress");

    if (progressDetails) {
      if (append) {
        progressDetails.innerHTML += `<p>${message}</p>`;
      } else {
        progressDetails.innerHTML = `<p>${message}</p>`;
      }
    }

    if (complete && progressStatus && toggleBtn) {
      progressStatus.style.display = "inline-block";
      progressDetails.style.display = "none";
      toggleBtn.textContent = "Show";
    }

    console.log(message);
  };

  const extractBehindProgress = (progressText) => {
    console.log("Extracting progress from text:", progressText);
    const match = progressText?.match(/(\d+)\s*BEHIND/i);
    const result = match ? `${match[1]} BEHIND` : null;
    console.log("Extracted progress:", result);
    return result;
  };

  const cleanAssociateNames = (names) => {
    console.log("Cleaning associate names:", names);
    const cleanedNames = names.replace(/\(Cornerstone Delivery Service\)/g, "").trim();
    console.log("Cleaned associate names:", cleanedNames);
    return cleanedNames;
  };

  const extractAssociates = (container, isV1) => {
    console.log("Extracting associates. Version:", isV1 ? "V1" : "V2");
    if (isV1) {
      const associateContainer = container.querySelector(".ml-lg-4.ml-2.mr-2.mr-lg-auto.normal-white-space");
      const tooltip = associateContainer?.nextElementSibling?.classList.contains("af-tooltip")
        ? Array.from(associateContainer.nextElementSibling.querySelectorAll("div")).map((el) =>
            cleanAssociateNames(el.textContent.trim())
          )
        : null;

      if (tooltip) {
        console.log("Extracted associates from tooltip (V1):", tooltip.join(", "));
        return tooltip.join(", ");
      }

      const associateInfo = cleanAssociateNames(associateContainer?.querySelector(".text-truncate")?.textContent.trim() || "No associate info");
      console.log("Extracted associates (V1):", associateInfo);
      return associateInfo;
    } else {
      const associates = Array.from(container.querySelectorAll(".css-1kttr4w"))
        .map((el) => cleanAssociateNames(el.textContent.trim()))
        .join(", ");
      console.log("Extracted associates (V2):", associates);
      return associates;
    }
  };

  const collectRoutes = async (selector, routes, maxScrolls = 20, scrollDelay = 100, isV1 = false) => {
    console.log("Starting route collection. Selector:", selector);
    for (let i = 0; i < maxScrolls; i++) {
      console.log(`Scroll iteration ${i + 1} of ${maxScrolls}`);
      const elements = document.querySelectorAll(selector);
      console.log(`Found ${elements.length} route elements`);

      elements.forEach((el, index) => {
        console.log(`Processing element ${index + 1} of ${elements.length}`);
        const routeCodeElem = isV1
          ? el.querySelector(".left-column.text-sm")?.firstElementChild
          : el.querySelector(".css-1nqzkik");
        const progressElem = isV1
          ? el.querySelector(".complete.h-100.d-flex.justify-content-center.align-items-center.progressStatusBar")
          : el.querySelector(".css-1xac89n.font-weight-bold");

        const routeCode = routeCodeElem?.textContent.trim() || routeCodeElem?.getAttribute("title");
        const associateInfo = extractAssociates(el, isV1);
        const progressRaw = progressElem?.textContent.trim();
        const progress = extractBehindProgress(progressRaw); // Extract only "X behind"

        console.log("Route Code:", routeCode);
        console.log("Associate Info:", associateInfo);
        console.log("Progress:", progress);

        if (routeCode) {
          const existingRouteIndex = routes.findIndex(route => route.routeCode === routeCode);
          if (existingRouteIndex === -1) {
            routes.push({ routeCode, associateInfo, progress });
            console.log("Added route:", { routeCode, associateInfo, progress });
          } else {
            console.log("Skipped duplicate route with code:", routeCode);
          }
        } else {
          console.log("Skipped route due to missing code.");
        }
      });

      elements[elements.length - 1]?.scrollIntoView({ behavior: "smooth", block: "end" });
      await new Promise((resolve) => setTimeout(resolve, scrollDelay));
    }

    updateProgress(`Collected ${routes.length} unique routes so far.`);
    console.log("Completed route collection. Total routes:", routes.length);
  };

  const modal = createModal();
  const downloadBtn = modal.querySelector("#download-btn");

  try {
    console.log("Script started");
    updateProgress("Script started...");

    const isV1 = document.querySelector(".css-hkr77h")?.checked;
    
    // Click specific elements based on version
    if (isV1) {
      updateProgress("Processing V1 interface...");
      const containerV1 = document.querySelector('.css-1bovypj');
      if (containerV1) {
        // Get the values container divs
        const firstChildDiv = containerV1.children[0];
        const secondChildDiv = containerV1.children[1];
        const valuesV1 = firstChildDiv.querySelectorAll('.cortex-summary-bar-data-value');
        
        // Extract progress counts
        let inProgressCount = 0;
        let atRiskCount = 0;
        let behindCount = 0;
        let packageProgress = 0;
        
        if (valuesV1.length >= 5) {
          // Get In Progress count (3rd value)
          inProgressCount = parseInt(valuesV1[2].querySelector('div span')?.textContent || '0');
          
          // Get At Risk count (4th value)
          atRiskCount = parseInt(valuesV1[3].querySelector('div span')?.textContent || '0');
          
          // Get Behind count (5th value)
          behindCount = parseInt(valuesV1[4].querySelector('div span')?.textContent || '0');
        }
        
        // Get Package Progress
        const packageProgressDiv = secondChildDiv.querySelectorAll('.mr-4.my-1')[1]?.querySelector('.cortex-summary-bar-data-value');
        if (packageProgressDiv) {
          const progressText = packageProgressDiv.textContent || '0%';
          packageProgress = Math.round(parseFloat(progressText.replace('%', '')));
        }
        
        // Store the values for later use
        window.dspProgress = {
          inProgress: inProgressCount,
          atRisk: atRiskCount,
          behind: behindCount,
          packageProgress: packageProgress
        };
        
        // Click the required element
        valuesV1[2].click();
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } else {
      updateProgress("Processing V2 interface...");
      
      // Get all containers with class css-11ofut8
      const containersV2 = document.querySelectorAll('.css-11ofut8');
      if (containersV2.length >= 4) {
        // Extract progress counts
        let inProgressCount = 0;
        let atRiskCount = 0;
        let behindCount = 0;
        let packageProgress = 0;
        
        // Get In Progress count from first container
        const inProgressDiv = containersV2[0].querySelectorAll('.css-11ibtj8')[1];
        if (inProgressDiv) {
          inProgressCount = parseInt(inProgressDiv.querySelector('p')?.textContent || '0');
        }
        
        // Get At Risk and Behind counts from third container
        const riskBehindDivs = containersV2[2].querySelectorAll('.css-11ibtj8');
        if (riskBehindDivs.length >= 3) {
          // At Risk is second div
          atRiskCount = parseInt(riskBehindDivs[1].querySelector('p')?.textContent || '0');
          // Behind is third div
          behindCount = parseInt(riskBehindDivs[2].querySelector('p')?.textContent || '0');
        }
        
        // Get Package Progress from fourth container - Following exact path
        if (containersV2[3]) {  
          const thirdChild = Array.from(containersV2[3].children).find((child, index) => 
            index === 2 && child.classList.contains('css-1avovsw')
          );
          
          if (thirdChild) {
            const firstChild = thirdChild.firstElementChild;
            if (firstChild) {
              const ql9057Div = firstChild.querySelector('.css-ql9057');
              if (ql9057Div) {
                const progressDiv = ql9057Div.querySelector('div');
                if (progressDiv) {
                  const progressText = progressDiv.querySelector('p')?.textContent || '0%';
                  packageProgress = parseInt(progressText.replace('%', '') || '0');
                }
              }
            }
          }
        }
        
        // Store the values for later use
        window.dspProgress = {
          inProgress: inProgressCount,
          atRisk: atRiskCount,
          behind: behindCount,
          packageProgress: packageProgress
        };
        
        // Click the required element (2nd css-11ibtj8 in first container)
        const clickTarget = containersV2[0].querySelectorAll('.css-11ibtj8')[1];
        if (clickTarget) {
          clickTarget.click();
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    }

    updateProgress("Collecting route information...");

    const routeSelector = isV1
      ? '[class^="af-link routes-list-item p-2 d-flex align-items-center w-100 route-"]'
      : ".css-1muusaa";
    const routes = [];

    await collectRoutes(routeSelector, routes, 20, 100, isV1);

    updateProgress("Scrolling back to the top...");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await new Promise((resolve) => setTimeout(resolve, 2000)); 

    updateProgress("Rechecking routes...");
    await collectRoutes(routeSelector, routes, 20, 100, isV1);

    updateProgress(`Final collection complete. Found ${routes.length} total routes.`);
    console.log("Final routes collected:", routes);

    const behindRoutes = routes.filter(route => {
      const progressText = extractBehindProgress(route.progress);
      return progressText && !progressText.startsWith('0 BEHIND');
    });
    console.log("Behind Routes:", behindRoutes);

    updateProgress(`Found ${behindRoutes.length} routes that are behind schedule.`, true, true);

    if (behindRoutes.length > 0) {
      const daSelectionSection = modal.querySelector("#da-selection-section");
      const daDropdowns = modal.querySelector("#da-dropdowns");
      
      daSelectionSection.style.display = "block";

      behindRoutes.forEach((route) => {
        const das = route.associateInfo.split(", ");
        if (das.length > 1) {
          const container = document.createElement("div");
          container.style.marginBottom = "15px";
          container.style.padding = "15px";
          container.style.background = "white";
          container.style.borderRadius = "8px";
          container.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
          container.style.border = "1px solid #edf2f7";
          
          const label = document.createElement("label");
          label.textContent = `${route.routeCode} (${route.progress}):`;
          label.style.display = "block";
          label.style.marginBottom = "8px";
          label.style.fontWeight = "600";
          label.style.color = "#2c3e50";
          
          const select = document.createElement("select");
          select.style.width = "100%";
          select.style.padding = "8px 12px";
          select.style.borderRadius = "6px";
          select.style.border = "1px solid #ddd";
          select.style.backgroundColor = "#f8f9fa";
          select.style.cursor = "pointer";
          select.style.color = "#2c3e50";
          select.style.fontSize = "14px";
          select.dataset.routeCode = route.routeCode;
          
          das.forEach((da) => {
            const option = document.createElement("option");
            option.value = da;
            option.textContent = da;
            select.appendChild(option);
          });
          
          container.appendChild(label);
          container.appendChild(select);
          daDropdowns.appendChild(container);
        }
      });

      const nextBtn = modal.querySelector("#da-next-btn");
      const previewSection = modal.querySelector("#preview-section");
      const routeDetails = modal.querySelector("#route-details");

      nextBtn.addEventListener("click", () => {
        daSelectionSection.style.display = "none";
        previewSection.style.display = "block";

        behindRoutes.forEach((route) => {
          const select = daDropdowns.querySelector(`select[data-route-code="${route.routeCode}"]`);
          const associateInfo = select ? select.value : route.associateInfo;

          const container = document.createElement("div");
          container.style.marginBottom = "20px";
          container.style.padding = "15px";
          container.style.background = "white";
          container.style.borderRadius = "12px";
          container.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
          container.style.border = "1px solid #edf2f7";
          container.style.overflow = "hidden";
          container.dataset.routeCode = route.routeCode;

          container.innerHTML = `
            <div style="padding: 15px; border-bottom: 1px solid #edf2f7; background: #f8fafc;">
              <h4 style="margin: 0; color: #2c3e50; font-size: 16px; display: flex; justify-content: space-between; align-items: center;">
                <span>${route.routeCode}: ${associateInfo}</span>
                <span style="font-size: 14px; padding: 4px 8px; background: #ebf5ff; color: #3182ce; border-radius: 6px;">${route.progress}</span>
              </h4>
            </div>
            <div style="padding: 15px;">
              <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 8px; color: #2c3e50; font-weight: 600; font-size: 14px;">Root Cause:</label>
                <div class="rc-checkboxes" style="display: flex; flex-direction: column; gap: 10px;">
                  <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 8px; border-radius: 6px; transition: background-color 0.2s; hover:background-color: #f7fafc;">
                    <input type="checkbox" class="rc-checkbox" value="Route is spread out" style="cursor: pointer; width: 16px; height: 16px;">
                    <span style="color: #2c3e50; font-size: 14px;">Route is spread out</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 8px; border-radius: 6px; transition: background-color 0.2s; hover:background-color: #f7fafc;">
                    <input type="checkbox" class="rc-checkbox" value="DA is working at a slow pace" style="cursor: pointer; width: 16px; height: 16px;">
                    <span style="color: #2c3e50; font-size: 14px;">DA is working at a slow pace</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 8px; border-radius: 6px; transition: background-color 0.2s; hover:background-color: #f7fafc;">
                    <input type="checkbox" class="rc-checkbox" value="DA is having connection issues" style="cursor: pointer; width: 16px; height: 16px;">
                    <span style="color: #2c3e50; font-size: 14px;">DA is having connection issues</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 8px; border-radius: 6px; transition: background-color 0.2s; hover:background-color: #f7fafc;">
                    <input type="checkbox" class="rc-checkbox" value="High Package Count" style="cursor: pointer; width: 16px; height: 16px;">
                    <span style="color: #2c3e50; font-size: 14px;">High Package Count</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 8px; border-radius: 6px; transition: background-color 0.2s; hover:background-color: #f7fafc;">
                    <input type="checkbox" class="rc-checkbox" value="High Stop Count" style="cursor: pointer; width: 16px; height: 16px;">
                    <span style="color: #2c3e50; font-size: 14px;">High Stop Count</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 8px; border-radius: 6px; transition: background-color 0.2s; hover:background-color: #f7fafc;">
                    <input type="checkbox" class="rc-checkbox other-checkbox" value="Other" style="cursor: pointer; width: 16px; height: 16px;">
                    <span style="color: #2c3e50; font-size: 14px;">Other</span>
                  </label>
                  <div class="other-input-container" style="display: none; margin-left: 32px;">
                    <input type="text" class="other-input" style="width: calc(100% - 16px); padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 14px; background: #f8fafc;" placeholder="Enter other root cause...">
                  </div>
                </div>
              </div>
              <div>
                <label style="display: block; margin-bottom: 8px; color: #2c3e50; font-weight: 600; font-size: 14px;">Point of Action:</label>
                <select class="poa-select" style="width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 14px; background-color: white; cursor: pointer; color: #2c3e50; appearance: none; background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%232c3e50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>'); background-repeat: no-repeat; background-position: right 12px center; background-size: 16px;">
                  <option value="">Select a point of action...</option>
                  <option value="Rescue Planned">Rescue Planned</option>
                  <option value="Rescue Sent">Rescue Sent</option>
                  <option value="Rescue on the way">Rescue on the way</option>
                  <option value="We're monitoring progress and will send a rescue if needed">We're monitoring progress and will send a rescue if needed</option>
                  <option value="Route Complete">Route Complete</option>
                  <option value="Other">Other</option>
                </select>
                <div class="poa-other-container" style="display: none; margin-top: 8px;">
                  <input type="text" class="poa-other-input" style="width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 14px; background: #f8fafc;" placeholder="Enter other point of action...">
                </div>
              </div>
            </div>
          `;

          const otherCheckbox = container.querySelector('.other-checkbox');
          const otherInputContainer = container.querySelector('.other-input-container');
          
          otherCheckbox.addEventListener('change', (e) => {
            otherInputContainer.style.display = e.target.checked ? 'block' : 'none';
          });

          const poaSelect = container.querySelector('.poa-select');
          const poaOtherContainer = container.querySelector('.poa-other-container');
          
          poaSelect.addEventListener('change', (e) => {
            poaOtherContainer.style.display = e.target.value === 'Other' ? 'block' : 'none';
          });

          routeDetails.appendChild(container);
        });

        const allDropdowns = daDropdowns.querySelectorAll('select');
        allDropdowns.forEach(select => {
          select.addEventListener('change', (e) => {
            const routeCode = e.target.dataset.routeCode;
            const container = routeDetails.querySelector(`div[data-route-code="${routeCode}"]`);
            if (container) {
              const h4 = container.querySelector('h4');
              const progress = h4.textContent.match(/\((.*?)\)/)[0]; 
              h4.textContent = `${routeCode}: ${e.target.value} ${progress}`;
            }
          });
        });
      });

      downloadBtn.onclick = () => {
        const now = new Date();
        const minutes = now.getMinutes();
        if (minutes >= 30) {
          now.setHours(now.getHours() + 1);
        }
        now.setMinutes(0);
        
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const year = now.getFullYear().toString().substr(-2);
        const hour = now.getHours();
        const roundedHour = hour >= 12 ? 
          `${hour === 12 ? 12 : hour - 12}PM` : 
          `${hour === 0 ? 12 : hour}AM`;
        
        const formattedDate = `${month}/${day}/${year}`;
        
        const header = `/md\n@\n## CRDR UPDATE - ${formattedDate} ${roundedHour}\n\n` +
                      `**IN PROGRESS: ${window.dspProgress.inProgress.toString().padStart(2, '0')}**\n` +
                      `**AT RISK: ${window.dspProgress.atRisk.toString().padStart(2, '0')}**\n` +
                      `**BEHIND: ${window.dspProgress.behind.toString().padStart(2, '0')}**\n` +
                      `**PACKAGE PROGRESS: ${window.dspProgress.packageProgress.toString().padStart(2, '0')}%**\n\n` +
                      `---\n\n`;

        const routeContent = behindRoutes.map((route) => {
          const select = daDropdowns.querySelector(`select[data-route-code="${route.routeCode}"]`);
          const associateInfo = select ? select.value : route.associateInfo;
          
          const containers = document.querySelectorAll('#route-details > div');
          const container = Array.from(containers).find(div => {
            const h4 = div.querySelector('h4 span');
            return h4 && h4.textContent.includes(route.routeCode);
          });
          
          if (!container) return `${route.routeCode}: ${associateInfo} (${route.progress})\n`;
          
          const checkedBoxes = container.querySelectorAll('input[type="checkbox"]:checked');
          const rootCauses = Array.from(checkedBoxes).map(checkbox => {
            if (checkbox.classList.contains('other-checkbox') && checkbox.checked) {
              const otherInput = container.querySelector('.other-input');
              return otherInput.value.trim() || 'Other (unspecified)';
            }
            return checkbox.value;
          }).filter(Boolean); 
          
          const rc = rootCauses.length > 0 ? rootCauses.join(', ') : 'N/A';
          
          const poaSelect = container.querySelector('.poa-select');
          let poa = poaSelect ? poaSelect.value : 'N/A';
          if (poa === 'Other') {
            const poaOtherInput = container.querySelector('.poa-other-input');
            poa = poaOtherInput && poaOtherInput.value.trim() || 'Other (unspecified)';
          }
          poa = poa || 'N/A';
          
          return `**${route.routeCode}** | ${associateInfo} | **${route.progress}**\nRC: ${rc}\nPOA: ${poa}\n`;
        }).join('\n');

        const fileContent = header + routeContent;

        const blob = new Blob([fileContent], { type: "text/plain" });
        const blobURL = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobURL;
        link.download = "behind_routes.txt";
        link.click();
        URL.revokeObjectURL(blobURL);
      };
    }

    const backBtn = modal.querySelector("#back-btn");
    backBtn.addEventListener("click", () => {
      const previewSection = modal.querySelector("#preview-section");
      const daSelectionSection = modal.querySelector("#da-selection-section");
      previewSection.style.display = "none";
      daSelectionSection.style.display = "block";
    });

    backBtn.addEventListener("mouseover", () => {
      backBtn.style.backgroundColor = "#5a6268";
      backBtn.style.boxShadow = "0 4px 6px rgba(108, 117, 125, 0.3)";
    });
    backBtn.addEventListener("mouseout", () => {
      backBtn.style.backgroundColor = "#6c757d";
      backBtn.style.boxShadow = "0 2px 4px rgba(108, 117, 125, 0.2)";
    });

    const previewNextBtn = modal.querySelector("#preview-next-btn");
    previewNextBtn.addEventListener("click", () => {
      modal.querySelector("#preview-section").style.display = "none";
      modal.querySelector("#dsp-progress-section").style.display = "block";
      
      if (window.dspProgress) {
        const inProgressInput = modal.querySelector('#in-progress-input');
        const atRiskInput = modal.querySelector('#at-risk-input');
        const behindInput = modal.querySelector('#behind-input');
        const packageProgressInput = modal.querySelector('#package-progress-input');
        
        if (inProgressInput) inProgressInput.value = window.dspProgress.inProgress;
        if (atRiskInput) atRiskInput.value = window.dspProgress.atRisk;
        if (behindInput) behindInput.value = window.dspProgress.behind;
        if (packageProgressInput) packageProgressInput.value = window.dspProgress.packageProgress;
      }
    });

    const progressBackBtn = modal.querySelector("#progress-back-btn");
    progressBackBtn.addEventListener("click", () => {
      modal.querySelector("#dsp-progress-section").style.display = "none";
      modal.querySelector("#preview-section").style.display = "block";
    });

    progressBackBtn.addEventListener("mouseover", () => {
      progressBackBtn.style.backgroundColor = "#5a6268";
      progressBackBtn.style.boxShadow = "0 4px 6px rgba(108, 117, 125, 0.3)";
    });

    progressBackBtn.addEventListener("mouseout", () => {
      progressBackBtn.style.backgroundColor = "#6c757d";
      progressBackBtn.style.boxShadow = "0 2px 4px rgba(108, 117, 125, 0.2)";
    });
  } catch (error) {
    console.error("Error during route data processing:", error);
    updateProgress(`Error: ${error.message}`);
  }
})();
