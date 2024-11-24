(async function () {
  const createModal = () => {
    // Create the overlay
    const overlay = document.createElement("div");
    overlay.id = "custom-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0, 0, 0, 0.7)";
    overlay.style.zIndex = "9999";
    document.body.appendChild(overlay);

    // Create the modal
    const modal = document.createElement("div");
    modal.id = "custom-modal";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.width = "400px";
    modal.style.background = "white";
    modal.style.border = "1px solid #ccc";
    modal.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3)";
    modal.style.padding = "20px";
    modal.style.borderRadius = "10px";
    modal.style.zIndex = "10000";
    modal.style.textAlign = "center";

    modal.innerHTML = `
      <div style="margin-bottom: 20px;">
        <img src="https://crdrdispatch.github.io/GembaScript/Logo.svg" alt="Logo" style="height: 50px; display: block; margin: 0 auto;">
      </div>
      <h2 style="font-family: Arial, sans-serif; margin-bottom: 20px;">Gimme That GEMBA</h2>
      <p id="modal-content" style="font-family: Arial, sans-serif; margin-bottom: 20px;">Processing route data...</p>
      <button id="download-btn" style="display: none; padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; font-family: Arial, sans-serif;">Download File</button>
      <button id="close-btn" style="margin-top: 10px; padding: 10px 20px; background-color: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer; font-family: Arial, sans-serif;">Close</button>
    `;

    document.body.appendChild(modal);

    // Close the modal and overlay on button click
    modal.querySelector("#close-btn").addEventListener("click", () => {
      modal.remove();
      overlay.remove();
    });

    return modal;
  };

  const modal = createModal();
  const downloadBtn = modal.querySelector("#download-btn");

  try {
    console.log("Script started");

    const isV1 = document.querySelector(".css-hkr77h")?.checked;
    console.log("Cortex Version:", isV1 ? "V1" : "V2");

    const waitForRoutes = (timeout = 10000, interval = 500) => {
      return new Promise((resolve, reject) => {
        let foundRoutes = false;
        let elapsed = 0;

        const intervalCheck = setInterval(() => {
          const parentContainer = document.querySelector(".routes-list.d-flex.flex-1.flex-column.border-y-list");
          console.log("Parent container:", parentContainer);

          if (parentContainer) {
            const routeContainers = Array.from(
              parentContainer.querySelectorAll('[class^="af-link routes-list-item p-2 d-flex align-items-center w-100 route-"]')
            );

            console.log(`Found ${routeContainers.length} valid route containers`, routeContainers);

            if (routeContainers.length > 0) {
              clearInterval(intervalCheck);
              foundRoutes = true;
              resolve(routeContainers);
            }
          }

          elapsed += interval;
          if (elapsed >= timeout) {
            clearInterval(intervalCheck);
            console.warn("Timeout reached. No route containers found.");
            reject("Timeout reached while waiting for routes.");
          }
        }, interval);
      });
    };

    const routeContainers = await waitForRoutes().catch((err) => {
      console.error(err);
      modal.querySelector("#modal-content").textContent = "Failed to load route data. Please try again later.";
      return [];
    });

    if (!routeContainers || routeContainers.length === 0) return;

    const results = [];
    routeContainers.forEach((container, index) => {
      console.log(`Processing container ${index + 1}`);

      // Route Code
      const routeCodeElem = container.querySelector(".left-column.text-sm div:first-child");
      const routeCode = routeCodeElem?.textContent.trim();

      // Associated Info
      const associateContainer = container.querySelector(".ml-lg-4.ml-2.mr-2.mr-lg-auto.normal-white-space");
      const tooltipElem = associateContainer?.nextElementSibling?.classList.contains("af-tooltip")
        ? associateContainer.nextElementSibling.querySelectorAll("div")
        : null;
      let associateNames = tooltipElem
        ? Array.from(tooltipElem).map((el) => el.textContent.trim()).join(", ")
        : associateContainer?.querySelector(".text-truncate")?.textContent.trim();

      // Remove "(Cornerstone Delivery Service)"
      if (associateNames) {
        associateNames = associateNames.replace(/\(Cornerstone Delivery Service\)/g, "").trim();
      }

      // Route Progress
      const progressElem = container.querySelector(".progress");
      let progressText = progressElem?.textContent.trim();

      // Extract number before "behind" and filter routes
      const behindMatch = progressText?.match(/(\d+)\s*behind/);
      progressText = behindMatch ? `${behindMatch[1]} behind` : null;

      console.log({
        routeCode,
        associateNames,
        progressText,
      });

      // Only include routes with "behind" progress info
      if (routeCode && progressText) {
        results.push(`${routeCode}: ${associateNames || "No associate info"} (${progressText})`);
      }
    });

    console.log("All Valid Routes Processed:", results);

    if (results.length > 0) {
      const fileContent = results.join("\n");
      const blob = new Blob([fileContent], { type: "text/plain" });
      const blobURL = URL.createObjectURL(blob);

      downloadBtn.style.display = "block";
      downloadBtn.textContent = `Download (${results.length} Routes)`;
      downloadBtn.onclick = () => {
        const link = document.createElement("a");
        link.href = blobURL;
        link.download = "route_data.txt";
        link.click();
        URL.revokeObjectURL(blobURL);
      };
    } else {
      modal.querySelector("#modal-content").textContent = "No relevant route data found.";
    }
  } catch (error) {
    console.error("Error during route data processing:", error);
    modal.querySelector("#modal-content").textContent = `Error: ${error.message}`;
  }
})();
